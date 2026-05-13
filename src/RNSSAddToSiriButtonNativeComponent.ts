import type {HostComponent, ViewProps} from 'react-native';
import type {
  BubblingEventHandler,
  Int32,
} from 'react-native/Libraries/Types/CodegenTypes';
import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';

// Fabric codegen requires all prop types to be statically known, so
// userInfo cannot be typed as an arbitrary object here. Pass data via
// donateShortcut() separately if you need userInfo on the button's shortcut.
type ButtonShortcutOptions = {
  activityType: string;
  title?: string;
  persistentIdentifier?: string;
  isEligibleForPrediction?: boolean;
  suggestedInvocationPhrase?: string;
};

type OnPressEvent = {};

export interface NativeProps extends ViewProps {
  shortcut: ButtonShortcutOptions;
  buttonStyle?: Int32;
  onPress?: BubblingEventHandler<OnPressEvent>;
}

export default codegenNativeComponent<NativeProps>(
  'RNSSAddToSiriButton',
) as HostComponent<NativeProps>;
