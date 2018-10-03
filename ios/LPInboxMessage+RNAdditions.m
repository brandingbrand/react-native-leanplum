//
//  LPInboxMessage+RNAdditions.m
//  RNLeanplum
//
//  Created by Sky Eckstrom on 9/28/18.
//  Copyright © 2018 Branding Brand. All rights reserved.
//

#import "LPInboxMessage+RNAdditions.h"

#define VALUE_OR_NULL(value) value ?: [NSNull null]
#define DATE_OR_NULL(date) date ? @([@(date.timeIntervalSince1970) doubleValue] * 1000) : [NSNull null]

@implementation LPInboxMessage (RNAdditions)

static NSString * const kMessageIdKey = @"messageId";
static NSString * const kTitleKey = @"title";
static NSString * const kSubtitleKey = @"subtitle";
static NSString * const kImageURLKey = @"imageURL";
static NSString * const kDataKey = @"data";
static NSString * const kDeliveryTimestampKey = @"deliveryTimestamp";
static NSString * const kExpirationTimestampKey = @"expirationTimestamp";
static NSString * const kIsReadKey = @"isRead";

- (NSDictionary *)JSONRepresentation {
    return @{
        kMessageIdKey: VALUE_OR_NULL([self messageId]),
        kTitleKey: VALUE_OR_NULL([self title]),
        kSubtitleKey: VALUE_OR_NULL([self subtitle]),
        kImageURLKey: VALUE_OR_NULL([[self imageURL] absoluteString]),
        kDataKey: VALUE_OR_NULL([self data]),
        kDeliveryTimestampKey: DATE_OR_NULL([self deliveryTimestamp]),
        kExpirationTimestampKey: DATE_OR_NULL([self expirationTimestamp]),
        kIsReadKey: @([self isRead])
    };
}

@end
