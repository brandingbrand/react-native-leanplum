//
//  RNLPInboxMessage.m
//  RNLeanplum
//
//  Created by Sky Eckstrom on 9/28/18.
//  Copyright © 2018 Branding Brand. All rights reserved.
//

#import "RNLPInboxMessage.h"
#import "LPInboxMessage+RNAdditions.h"

#if __has_include(<Leanplum/Leanplum.h>)
#import <Leanplum/Leanplum.h>
#elif __has_include("Leanplum.h")
#import "Leanplum.h"
#else
#import "Leanplum/Leanplum.h"
#endif

static NSString * const kRNLPInboxMessageNotFoundErrorCode = @"RNLPInboxMessageNotFound";
static NSString * const kRNLPInboxMessageNotFoundErrorReason = @"Could not find a message with the given id.";

@implementation RNLPInboxMessage
RCT_EXPORT_MODULE(LPInboxMessage);

RCT_EXPORT_METHOD(readMessageId:(NSString *)messageId resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
    LPInboxMessage *message = [[Leanplum inbox] messageForId:messageId];
    
    if (message) {
        [message read];

        return resolve([NSNull null]);
    }

    return reject(kRNLPInboxMessageNotFoundErrorCode, kRNLPInboxMessageNotFoundErrorReason, nil);

}

RCT_EXPORT_METHOD(removeMessageId:(NSString *)messageId resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
    LPInboxMessage *message = [[Leanplum inbox] messageForId:messageId];
    
    if (message) {
        [message remove];

        return resolve([NSNull null]);
    }

    return reject(kRNLPInboxMessageNotFoundErrorCode, kRNLPInboxMessageNotFoundErrorReason, nil);
}

@end
