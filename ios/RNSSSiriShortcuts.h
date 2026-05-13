//
//  RNSSSiriShortcuts.h
//  RNSSSiriShortcuts
//
//  Created by Gustavo Parreira on 27/03/2020.
//  Copyright © 2020 Facebook. All rights reserved.
//

#ifndef RNSSSiriShortcuts_h
#define RNSSSiriShortcuts_h

#if defined(__IPHONE_OS_VERSION_MAX_ALLOWED) && (__IPHONE_OS_VERSION_MAX_ALLOWED >= 12000) /* __IPHONE_12_0 */
#import <UIKit/UIUserActivity.h>
#endif

#import <React/RCTEventEmitter.h>

#ifdef RCT_NEW_ARCH_ENABLED
#import <RNSiriShortcutsSpec/RNSiriShortcutsSpec.h>
#endif

NS_ASSUME_NONNULL_BEGIN

#ifdef RCT_NEW_ARCH_ENABLED
@interface RNSSSiriShortcuts : RCTEventEmitter <NativeRNSiriShortcutsSpec>
#else
@interface RNSSSiriShortcuts : RCTEventEmitter
#endif

+ (BOOL)application:(nonnull UIApplication *)application
    continueUserActivity:(nonnull NSUserActivity *)userActivity
      restorationHandler:
        #if defined(__IPHONE_OS_VERSION_MAX_ALLOWED) && (__IPHONE_OS_VERSION_MAX_ALLOWED >= 12000) /* __IPHONE_12_0 */
            (nonnull void (^)(NSArray<id<UIUserActivityRestoring>> *_Nullable))restorationHandler;
        #else
            (nonnull void (^)(NSArray *_Nullable))restorationHandler;
        #endif

+ (BOOL)scene:(nonnull UIScene *)scene
continueUserActivity:(nonnull NSUserActivity *)userActivity API_AVAILABLE(ios(13.0));

@end

NS_ASSUME_NONNULL_END

#endif /* RNSSSiriShortcuts_h */
