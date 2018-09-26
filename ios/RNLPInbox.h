//
//  RNLPInbox.h
//  RNLeanplum
//
//  Created by Sky Eckstrom on 9/26/18.
//  Copyright © 2018 Branding Brand. All rights reserved.
//

#if __has_include(<React/RCTBridgeModule.h>)
#import <React/RCTBridgeModule.h>
#elif __has_include("RCTBridgeModule.h")
#import "RCTBridgeModule.h"
#else
#import "React/RCTBridgeModule.h"
#endif

@interface RNLPInbox : NSObject <RCTBridgeModule>

@end
