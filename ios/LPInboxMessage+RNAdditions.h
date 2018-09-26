//
//  LPInboxMessage+RNAdditions.h
//  RNLeanplum
//
//  Created by Sky Eckstrom on 9/27/18.
//  Copyright © 2018 Branding Brand. All rights reserved.
//

#if __has_include(<Leanplum/Leanplum.h>)
#import <Leanplum/Leanplum.h>
#elif __has_include("Leanplum.h")
#import "Leanplum.h"
#else
#import "Leanplum/Leanplum.h"
#endif

@interface LPInboxMessage (RNAdditions)

- (NSDictionary *)JSONRepresentation;

@end
