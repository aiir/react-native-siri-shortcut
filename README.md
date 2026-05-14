# react-native-siri-shortcut (fork)

A React Native library for integrating iOS Siri Shortcuts into your app. It lets you donate shortcuts based on user activity, suggest shortcuts proactively, present the system Add to Siri sheet, and handle shortcut activations — both when the app is already running and on cold launch. iOS only; all calls are no-ops on Android.

This is a fork of [Gustash/react-native-siri-shortcut](https://github.com/Gustash/react-native-siri-shortcut).

## Why forked

The upstream package does not support React Native's New Architecture (TurboModules / Fabric). This fork adds dual-architecture support so the package works with both Old and New Architecture without breaking existing behaviour. It also removes `RCTBridge+UIScene` files that cause build errors with modern React Native versions.

Changes over upstream:

- TurboModule codegen spec (`src/NativeRNSiriShortcuts.ts`)
- Fabric native component spec (`src/RNSSAddToSiriButtonNativeComponent.ts`)
- `codegenConfig` added to `package.json`
- Podspec updated to use `install_modules_dependencies` and bumped iOS minimum to 13.0
- `RNSSSiriShortcuts.m` → `.mm` with `getTurboModule:` behind `RCT_NEW_ARCH_ENABLED`
- `RNSSAddToSiriButtonViewManager.m` → `.mm` for legacy interop compatibility
- `RCTBridge+UIScene` files removed

## Installation

Install directly from this repository:

```sh
npm install https://github.com/aiir/react-native-siri-shortcut
```

Then run `pod install` in your `ios/` directory.

## Usage

See the [upstream documentation](https://gustash.github.io/react-native-siri-shortcut) for the full API reference. The public API is unchanged from upstream.

## Example project

```sh
cd example && npm install
cd example/ios && pod install
# Open example/ios in Xcode and build/run
```
