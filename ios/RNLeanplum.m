//
//  RNLeanplum.m
//  RNLeanplum
//
//  Created by Bassel Dagher on 8/18/17.
//  Copyright © 2017 Branding Brand. All rights reserved.
//

#import "RNLeanplum.h"

#if __has_include(<Leanplum/Leanplum.h>)
#import <Leanplum/Leanplum.h>
#elif __has_include("Leanplum.h")
#import "Leanplum.h"
#else
#import "Leanplum/Leanplum.h"
#endif

@interface LPInbox (RNAdditions)

- (NSArray *)inbox_messages;

@end

@interface LPInboxMessage (RNAdditions)

- (NSDictionary *)message_jsonDictionary;

@end

@implementation RNLeanplum
    RCT_EXPORT_MODULE();

    RCT_EXPORT_METHOD(start) {
        [Leanplum start];
    }

    RCT_EXPORT_METHOD(setDeviceId:(nonnull NSString *)deviceId) {
        [Leanplum setDeviceId:deviceId];
    }

    RCT_EXPORT_METHOD(setUserId:(nonnull NSString *)userId) {
        [Leanplum setUserId:userId];
    }

    RCT_REMAP_METHOD(setAppIdDevelopmentKey, setAppId:(nonnull NSString *)appId developmentKey:(nonnull NSString *)key) {
        [Leanplum setAppId:appId withDevelopmentKey:(NSString *)key];
    }

    RCT_REMAP_METHOD(setAppIdProductionKey, setAppId:(nonnull NSString *)appId productionKey:(nonnull NSString *)key) {
        [Leanplum setAppId:appId withProductionKey:key];
    }

    // States

    RCT_EXPORT_METHOD(trackAllAppScreens) {
        [Leanplum trackAllAppScreens];
    }

    RCT_EXPORT_METHOD(pauseState) {
        [Leanplum pauseState];
    }

    RCT_EXPORT_METHOD(resumeState) {
        [Leanplum resumeState];
    }

    RCT_EXPORT_METHOD(advanceToLevel:(NSString *)level) {
        [Leanplum advanceTo:level];
    }

    RCT_REMAP_METHOD(advanceToLevelInfo, advanceToLevel:(nonnull NSString *)level info:(nonnull NSString *)info) {
        [Leanplum advanceTo:level withInfo:info];
    }

    RCT_REMAP_METHOD(advanceToLevelParameters, advanceToLevel:(nonnull NSString *)level parameters:(nonnull NSDictionary *)parameters) {
        [Leanplum advanceTo:level withParameters:parameters];
    }

    RCT_REMAP_METHOD(advanceToLevelInfoParameters, advanceToLevel:(nonnull NSString *)level info:(nonnull NSString *)info parameters:(nonnull NSDictionary *)parameters) {
        [Leanplum advanceTo:level withInfo:info andParameters:parameters];
    }

    // Events

    RCT_EXPORT_METHOD(trackInAppPurchases) {
        [Leanplum trackInAppPurchases];
    }

    RCT_EXPORT_METHOD(trackEvent:(nonnull NSString *)event) {
        [Leanplum track:event];
    }

    RCT_REMAP_METHOD(trackEventValue, trackEvent:(nonnull NSString *)event value:(double)value) {
        [Leanplum track:event withValue:value];
    }

    RCT_REMAP_METHOD(trackEventInfo, trackEvent:(nonnull NSString *)event info:(nonnull NSString *)info) {
        [Leanplum track:(NSString *)event withInfo:info];
    }

    RCT_REMAP_METHOD(trackEventParameters, trackEvent:(nonnull NSString *)event parameters:(nonnull NSDictionary *)parameters) {
        [Leanplum track:event withParameters:parameters];
    }

    RCT_REMAP_METHOD(trackEventValueInfo, trackEvent:(nonnull NSString *)event value:(double)value info:(nonnull NSString *)info) {
        [Leanplum track:event withValue:value andInfo:info];
    }

    RCT_REMAP_METHOD(trackEventValueParameters, trackEvent:(nonnull NSString *)event value:(double)value parameters:(nonnull NSDictionary *)parameters) {
        [Leanplum track:event withValue:value andParameters:parameters];
    }

    RCT_REMAP_METHOD(trackEventValueInfoParameters, trackEvent:(nonnull NSString *)event value:(double)value info:(nonnull NSString *)info parameters:(nonnull NSDictionary *)parameters) {
        [Leanplum track:event withValue:value andInfo:info andParameters:parameters];
    }


    // Inbox
    RCT_EXPORT_METHOD(readMessage:(NSString *)messageId) {
        if (messageId.length > 0) {
            LPInboxMessage *message = [[Leanplum inbox] messageForId:messageId];
            [message read];
        }
    }

    RCT_REMAP_METHOD(inboxMessages,
                     fetchInboxMessagesWithResolver:(RCTPromiseResolveBlock)resolve
                     rejecter:(RCTPromiseRejectBlock)reject)
    {
        if ([[Leanplum inbox] allMessages]) {
            resolve([[Leanplum inbox] inbox_messages]);
        } else {
            NSError *error;
            reject(@"no_messages", @"There were no messages", error);
        }
    }

@end

@implementation LPInbox (RNAdditions)

- (NSArray *)inbox_messages {
    NSMutableArray *messages = [[NSMutableArray alloc] init];

    for (LPInboxMessage *message in [self allMessages]) {
        [messages addObject:[message message_jsonDictionary]];
    }

    return [messages copy];
}

@end

@implementation LPInboxMessage (RNAdditions)

static NSString * const kMessageIdKey = @"messageId";
static NSString * const kTitleKey = @"title";
static NSString * const kSubtitleKey = @"subtitle";
static NSString * const kImageFilePathKey = @"imageFilePath";
static NSString * const kImageURLKey = @"imageURL";
static NSString * const kDataKey = @"data";
static NSString * const kDeliveryTimestampKey = @"deliveryTimestamp";
static NSString * const kExpirationTimestampKey = @"expirationTimestamp";
static NSString * const kIsReadKey = @"isRead";

- (id)valueOrNull:(id)value {
    return value ?: [NSNull null];
}

- (id)dateOrNull:(NSDate *)date {
    if (date) {
        return @([@(date.timeIntervalSince1970) doubleValue] * 1000);
    }

    return [NSNull null];
}

- (NSDictionary *)message_jsonDictionary {
    NSString *imageURLStr = @"";

    if ([self imageURL]) {
        imageURLStr = [NSString stringWithFormat:@"%@", [self imageURL]];

        if (imageURLStr.length > 0) {
            NSArray *imageStrArr = [imageURLStr componentsSeparatedByString:@"https:/"];

            if (imageStrArr.count > 0) {
                imageURLStr = [NSString stringWithFormat:@"https://%@", imageStrArr.lastObject];
            }
        }
    }

    return @{
             kMessageIdKey: [self valueOrNull:[self messageId]],
             kTitleKey: [self valueOrNull:[self title]],
             kSubtitleKey: [self valueOrNull:[self subtitle]],
             kImageFilePathKey: [self valueOrNull:[self imageFilePath]],
             kImageURLKey: imageURLStr,
             kDataKey: [self valueOrNull:[self data]],
             kDeliveryTimestampKey: [self dateOrNull:[self deliveryTimestamp]],
             kExpirationTimestampKey: [self dateOrNull:[self expirationTimestamp]],
             kIsReadKey: @([self isRead])
             };
}

@end
