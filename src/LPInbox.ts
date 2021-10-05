// @ts-ignore react-native is a peer dependency
import { NativeModules } from 'react-native';
import { LPInboxMessage, LPInboxMessageJSON } from './LPInboxMessage';

export const LPInbox = {
  /**
   * Returns the number of all inbox messages on the device.
   */
  count: (): Promise<number> => {
    return NativeModules.LPInbox.count();
  },

  /**
   * Returns the number of the unread inbox messages on the device.
   */
  unreadCount: (): Promise<number> => {
    return NativeModules.LPInbox.unreadCount();
  },

  /**
   * Returns the identifiers of all inbox messages on the device sorted in ascending
   * chronological order, i.e. the id of the oldest message is the first one, and the most
   * recent one is the last one in the array.
   */
  messagesIds: (): Promise<string[]> => {
    return NativeModules.LPInbox.messagesIds();
  },

  /**
   * Returns an array containing all of the inbox messages (as LPInboxMessage objects)
   * on the device, sorted in ascending chronological order, i.e. the oldest message is the 
   * first one, and the most recent one is the last one in the array.
   */
  allMessages: (): Promise<LPInboxMessage[]> => {
    return NativeModules.LPInbox.allMessages().then((messages: LPInboxMessageJSON[]) => {
      return messages.map(json => new LPInboxMessage(json));
    })
  },

  /**
   * Returns an array containing all of the unread inbox messages on the device, sorted
   * in ascending chronological order, i.e. the oldest message is the first one, and the
   * most recent one is the last one in the array.
   */
  unreadMessages: (): Promise<LPInboxMessage[]> => {
    return NativeModules.LPInbox.unreadMessages().then((messages: LPInboxMessageJSON[]) => {
      return messages.map(json => new LPInboxMessage(json));
    })
  },

  /**
   * Returns the inbox messages associated with the given messageId identifier.
   */
  messageForId: (messageId: string): Promise<LPInboxMessage> => {
    return NativeModules.LPInbox.messageForId(messageId)
      .then((json: LPInboxMessageJSON) => new LPInboxMessage(json));
  },

  /**
   * Call this method if you don't want Inbox images to be prefetched.
   * Useful if you only want to deal with image URL.
   */
  disableImagePrefetching: (): void => {
    return NativeModules.LPInbox.disableImagePrefetching();
  }
};