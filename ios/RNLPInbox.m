//
//  RNLPInbox.m
//  RNLeanplum
//
//  Created by Sky Eckstrom on 9/26/18.
//  Copyright © 2018 Branding Brand. All rights reserved.
//

#import "RNLPInbox.h"
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

@implementation RNLPInbox
RCT_EXPORT_MODULE(LPInbox);

RCT_REMAP_METHOD(count,
                 countWithResolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
    return resolve(@([[Leanplum inbox] count]));
}

RCT_REMAP_METHOD(unreadCount,
                 unreadCountWithResolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
    return resolve(@([[Leanplum inbox] unreadCount]));
}

RCT_REMAP_METHOD(messagesIds,
                 messagesIdsWithResolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
    return resolve([[Leanplum inbox] messagesIds]);
}

RCT_REMAP_METHOD(allMessages,
                 allMessagesWithResolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
    NSArray *messages = [[Leanplum inbox] allMessages];
    NSMutableArray *jsonMessages = [[NSMutableArray alloc] initWithCapacity:messages.count];

    for (LPInboxMessage *message in messages) {
        [jsonMessages addObject:[message JSONRepresentation]];
    }

    return resolve([jsonMessages copy]);
}

RCT_REMAP_METHOD(unreadMessages,
                 unreadMessagesWithResolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
    NSArray *messages = [[Leanplum inbox] unreadMessages];
    NSMutableArray *jsonMessages = [[NSMutableArray alloc] initWithCapacity:messages.count];

    for (LPInboxMessage *message in messages) {
        [jsonMessages addObject:[message JSONRepresentation]];
    }

    return resolve([jsonMessages copy]);
}

RCT_EXPORT_METHOD(messageForId:(NSString *)messageId resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
    LPInboxMessage *message = [[Leanplum inbox] messageForId:messageId];

    if (message) {
        return resolve([message JSONRepresentation]);
    }

    return reject(kRNLPInboxMessageNotFoundErrorCode, kRNLPInboxMessageNotFoundErrorReason, nil);
}

RCT_EXPORT_METHOD(disableImagePrefetching) {
    return [[Leanplum inbox] disableImagePrefetching];
}

@end
