import { NativeModules } from 'react-native';
import { Dictionary } from './Dictionary';

export interface LPInboxMessageJSON {
  messageId: string;
  title: string;
  subtitle: string;
  imageURL: string;
  data: Dictionary;
  deliveryTimestamp: number;
  expirationTimestamp: number;
  isRead: boolean;
}

export class LPInboxMessage {
  /**
   * The message identifier of the inbox message.
   */
  readonly messageId: LPInboxMessageJSON['messageId'];

  /**
   * The title of the inbox message.
   */
  readonly title: LPInboxMessageJSON['title'];

  /**
   * The subtitle of the inbox message.
   */
  readonly subtitle: LPInboxMessageJSON['subtitle'];

  /**
   * The image URL of the inbox message.
   * You can safely use this with prefetching enabled.
   * It will return the file URL path instead if the image is in cache.
   */
  readonly imageURL: LPInboxMessageJSON['imageURL'];

  /**
   * The data of the inbox message. Advanced use only.
   */
  readonly data: LPInboxMessageJSON['data'];

  /**
   * The delivery timestamp of the inbox message.
   */
  readonly deliveryTimestamp: Date;

  /**
   * The expiration timestamp of the inbox message.
   */
  readonly expirationTimestamp: Date;

  private _isRead: LPInboxMessageJSON['isRead'];

  /**
   * True if the inbox message is read.
   */
  get isRead() {
    return this._isRead;
  }

  /**
   * Constructs a new inbox message with a given id and contents.
   *
   * @param contents The contents of the message
   */
  constructor(contents: LPInboxMessageJSON) {
    this.messageId = contents.messageId;
    this.title = contents.title;
    this.subtitle = contents.subtitle;
    this.imageURL = contents.imageURL;
    this.data = contents.data;
    this.deliveryTimestamp = new Date(contents.deliveryTimestamp);
    this.expirationTimestamp = new Date(contents.expirationTimestamp);
    this._isRead = contents.isRead;
  }

  /**
   * Read the inbox message, marking it as read and invoking its open action.
   */
  read = (): Promise<null> => {
    return NativeModules.LPInboxMessage.readMessageId(this.messageId).then(() => {
      this._isRead = true;
    });
  }

  /**
   * Remove the inbox message from the inbox.
   */
  remove = (): Promise<null> => {
    return NativeModules.LPInboxMessage.removeMessageId(this.messageId);
  }
}