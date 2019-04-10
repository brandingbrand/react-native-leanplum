//
//  RNLeanplum.h
//  RNLeanplum
//
//  Created by Bassel Dagher on 8/18/17.
//  Copyright © 2017-2018 Branding Brand. All rights reserved.
//

#if __has_include(<React/RCTBridgeModule.h>)
#import <React/RCTBridgeModule.h>
#elif __has_include("RCTBridgeModule.h")
#import "RCTBridgeModule.h"
#else
#import "React/RCTBridgeModule.h"
#endif

@interface RNLeanplum : NSObject <RCTBridgeModule>

+ (BOOL)launch;
@end
