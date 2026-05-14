# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A React Native library (iOS-only) for integrating Siri Shortcuts via `NSUserActivity`. It exposes a native module (`RNSiriShortcuts`) and a native view component (`RNSSAddToSiriButton`). All JS calls on non-iOS or below the minimum iOS version are silently no-ops via the `safeCall` wrapper in `index.js`.

## Running the example app

```sh
cd example && yarn install
cd example/ios && pod install
# Then open example/ios in Xcode and build/run on a device or simulator
```

There are no automated tests. Validation is done manually via the example app.

## Architecture

### JS layer (`/` root)

- **`index.js`** — Public API. Wraps every native call in `safeCall(fn, minVersion)` which returns a no-op if not on iOS or below `minVersion`. Exports `SiriShortcutsEvent` (a `NativeEventEmitter`) and `addShortcutListener` for receiving shortcut activations at runtime.
- **`AddToSiriButton.ios.js`** — iOS implementation of the `AddToSiriButton` React component. Uses `requireNativeComponent("RNSSAddToSiriButton")` and reads `ComponentWidth`/`ComponentHeight`/`AvailableStyles` constants from `UIManager`.
- **`AddToSiriButton.js`** — Stub that returns `null` on non-iOS platforms.
- **`index.d.ts`** — TypeScript declarations for the public API.

### New Architecture codegen specs (`src/`)

- **`NativeRNSiriShortcuts.ts`** — TurboModule spec used by codegen to generate the native interface (`RNSiriShortcutsSpec`).
- **`RNSSAddToSiriButtonNativeComponent.ts`** — Fabric native component spec used by codegen. Note: `ButtonShortcutOptions` intentionally omits `userInfo` because Fabric requires statically-typed props; pass `userInfo` via `donateShortcut()` separately.

### Native layer (`ios/`)

- **`RNSSSiriShortcuts.mm`** — Main native module. Implements `donateShortcut`, `suggestShortcuts`, `presentShortcut`, `getShortcuts`, `clearAllShortcuts`, `clearShortcutsWithIdentifiers`, `getInitialShortcut`. Also acts as `INUIAddVoiceShortcutViewControllerDelegate` and `INUIEditVoiceShortcutViewControllerDelegate` to handle the system sheet callbacks. Emits `SiriShortcutListener` events via `NSNotificationCenter`.
- **`RNSSAddToSiriButton.{h,m}`** — `UIView` subclass wrapping `INUIAddVoiceShortcutButton`.
- **`RNSSAddToSiriButtonViewManager.mm`** — `RCTViewManager` registering `RNSSAddToSiriButton`. Exports `ComponentWidth`, `ComponentHeight`, and `AvailableStyles` constants.
- **`RCTConvert+NSUserActivity.{h,m}`** — Converts a JS options dict into `NSUserActivity`. The `contentType`/`description` fields are stored in a `CSSearchableItemAttributeSet`.
- **`RCTConvert+INShortcut.{h,m}`** — Converts to `INShortcut` (wraps the `NSUserActivity`).
- **`RCTConvert+INUIAddVoiceShortcutButtonStyle.{h,m}`** — Converts the integer button style to `INUIAddVoiceShortcutButtonStyle`.

### New Architecture support

The native files use `#ifdef RCT_NEW_ARCH_ENABLED` guards. When enabled, `RNSSSiriShortcuts` conforms to `RCTTurboModule` and returns `NativeRNSiriShortcutsSpecJSI`. The `codegenConfig` in `package.json` points codegen at `src/` with name `RNSiriShortcutsSpec`.

### Shortcut activation flow

1. App is opened from a shortcut → `application:continueUserActivity:` or `scene:continueUserActivity:` fires on `RNSSSiriShortcuts` (class methods).
2. These post an `NSNotificationCenter` notification named `shortcutReceived`.
3. The instance observer picks it up and emits `SiriShortcutListener` if listeners are active.
4. For cold-start launches, `getInitialShortcut()` reads from `bridge.launchOptions` and checks against `NSUserActivityTypes` in `Info.plist`.
