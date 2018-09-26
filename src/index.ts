import { NativeModules } from 'react-native';
const LPBridge = NativeModules.RNLeanplum || {};

export default class RNLeanplum {
  appId: string;
  key: string;

  constructor(appId: string, key: string) {
    this.appId = appId;
    this.key = key;
  }

  start(): void {
    LPBridge.start && LPBridge.start();
  }
  setAppIdDevelopmentKey(): void {
    LPBridge.setAppIdDevelopmentKey && LPBridge.setAppIdDevelopmentKey(this.appId, this.key);
  }
  setAppIdProductionKey(): void {
    LPBridge.setAppIdProductionKey && LPBridge.setAppIdProductionKey(this.appId, this.key);
  }
  setDeviceId(deviceId: string): void {
    LPBridge.setDeviceId && LPBridge.setDeviceId(deviceId);
  }

  setUserId(userId: string): void {
    LPBridge.setUserId && LPBridge.setUserId(userId);
  }

  // States
  trackAllAppScreens(): void {
    LPBridge.trackAllAppScreens && LPBridge.trackAllAppScreens();
  }
  pauseState(): void {
    LPBridge.pauseState && LPBridge.pauseState();
  }
  resumeState(): void {
    LPBridge.resumeState && LPBridge.resumeState();
  }
  advanceTo(level: string, info?: string, parameters?: {}): void {
    if (info && parameters) {
      LPBridge.advanceToLevelInfoParameters &&
        LPBridge.advanceToLevelInfoParameters(level, info, parameters);
    } else if (info) {
      LPBridge.advanceToLevelInfo && LPBridge.advanceToLevelInfo(level, info);
    } else if (parameters) {
      LPBridge.advanceToLevelParameters &&
        LPBridge.advanceToLevelParameters(level, parameters);
    } else {
      LPBridge.advanceToLevel && LPBridge.advanceToLevel(level);
    }
  }
  // Events
  trackInAppPurchases(): void {
    LPBridge.trackInAppPurchases && LPBridge.trackInAppPurchases();
  }

  track(event: string, value?: number, info?: string, parameters?: {}): void {
    if (event && value && info && parameters) {
      LPBridge.trackEventValueInfoParameters &&
        LPBridge.trackEventValueInfoParameters(event, value, info, parameters);
    } else if (event && value && parameters) {
      LPBridge.trackEventValueParameters &&
        LPBridge.trackEventValueParameters(event, value, parameters);
    } else if (event && value && info) {
      LPBridge.trackEventValueInfo &&
        LPBridge.trackEventValueInfo(event, value, info);
    } else if (event && parameters) {
      LPBridge.trackEventParameters &&
        LPBridge.trackEventParameters(event, parameters);
    } else if (event && info) {
      LPBridge.trackEventInfo && LPBridge.trackEventInfo(event, info);
    } else if (event && value) {
      LPBridge.trackEventValue && LPBridge.trackEventValue(event, value);
    } else {
      LPBridge.trackEvent && LPBridge.trackEvent(event);
    }
  }

  inboxMessages(): Promise<any> {
    if (LPBridge.inboxMessages) {
      return LPBridge.inboxMessages();
    } else {
      return Promise.resolve(null);
    }
  }

  readMessage(id: string): void {
    if (LPBridge.readMessage) {
      LPBridge.readMessage(id);
    }
  }
}
