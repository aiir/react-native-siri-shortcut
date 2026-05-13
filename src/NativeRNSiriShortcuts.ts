import type {TurboModule} from 'react-native/Libraries/TurboModule/RCTExport';
import {TurboModuleRegistry} from 'react-native';

export type ShortcutOptions = {
  activityType: string;
  title?: string;
  requiredUserInfoKeys?: string[];
  userInfo?: Object;
  needsSave?: boolean;
  keywords?: string[];
  persistentIdentifier?: string;
  isEligibleForHandoff?: boolean;
  isEligibleForSearch?: boolean;
  isEligibleForPublicIndexing?: boolean;
  expirationDate?: number;
  webpageURL?: string;
  isEligibleForPrediction?: boolean;
  suggestedInvocationPhrase?: string;
  contentType?: string;
  description?: string;
};

export type ShortcutInfo = {
  activityType: string;
  userInfo: Object | null;
};

export type ShortcutData = {
  identifier: string;
  phrase: string;
  options: ShortcutOptions | null;
};

type PresentShortcutCallbackData = {
  status: string;
  phrase: string | null;
};

export interface Spec extends TurboModule {
  getInitialShortcut(): Promise<ShortcutInfo | null>;
  clearAllShortcuts(): Promise<void>;
  clearShortcutsWithIdentifiers(identifiers: string[]): Promise<void>;
  donateShortcut(options: ShortcutOptions): void;
  suggestShortcuts(options: ShortcutOptions[]): void;
  presentShortcut(
    options: ShortcutOptions,
    callback: (data: PresentShortcutCallbackData) => void,
  ): void;
  getShortcuts(): Promise<ShortcutData[]>;
  // Required for RCTEventEmitter TurboModule support
  addListener(eventName: string): void;
  removeListeners(count: number): void;
}

export default TurboModuleRegistry.get<Spec>('RNSiriShortcuts');
