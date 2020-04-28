import { NativeModules, Platform } from 'react-native';
import { Dictionary } from '@brandingbrand/fsfoundation';
import { LPInbox } from './LPInbox';

export type LeanplumAttributes = Dictionary<boolean | number | string>;

export interface LeanplumTrafficSourceInfo {
  publisherId?: string;
  publisherName?: string;
  publisherSubPublisher?: string;
  publisherSubSite?: string;
  publisherSubCampaign?: string;
  publisherSubAdGroup?: string;
  publisherSubAd?: string;
};

export interface LeanplumVariant {
  id: string;
};

export const Leanplum = {
  /**
   * Optional. Sets the API server. The API path is of the form http[s]://hostname/servletName
   * @param hostName The name of the API host, such as api.leanplum.com
   * @param servletName The name of the API servlet, such as api
   * @param ssl Whether to use SSL
   */
  setApiConnectionSettings: (hostName: string, servletName: string, usingSsl: boolean): void => {
    return NativeModules.Leanplum.setApiConnectionSettings(hostName, servletName, usingSsl);
  },

  /**
   * Optional. Adjusts the network timeouts.
   * The default timeout is 10 seconds for requests, and 15 seconds for file downloads.
   */
  setNetworkTimeout: (seconds: number, downloadSeconds: number): void => {
    return NativeModules.Leanplum.setNetworkTimeout(seconds, downloadSeconds);
  },

  /**
   * iOS Only.
   * Sets whether to show the network activity indicator in the status bar when making requests.
   * Default: YES.
   */
  setNetworkActivityIndicatorEnabled: (enabled: boolean): void => {
    return NativeModules.Leanplum.setNetworkActivityIndicatorEnabled(enabled);
  },

  /**
   * Advanced: Whether new variables can be downloaded mid-session. By default, this is disabled.
   * Currently, if this is enabled, new variables can only be downloaded if a push notification is sent
   * while the app is running, and the notification's metadata hasn't be downloaded yet.
   */
  setCanDownloadContentMidSessionInProductionMode: (enabled: boolean): void => {
    return NativeModules.Leanplum.setCanDownloadContentMidSessionInProductionMode(enabled);
  },

  /**
   * Modifies the file hashing setting in development mode.
   * By default, Leanplum will hash file variables to determine if they're modified and need
   * to be uploaded to the server if we're running in the simulator.
   * Setting this to NO will reduce startup latency in development mode, but it's possible
   * that Leanplum will not always have the most up-to-date versions of your resources.
   */
  setFileHashingEnabledInDevelopmentMode: (enabled: boolean): void => {
    return NativeModules.Leanplum.setFileHashingEnabledInDevelopmentMode(enabled);
  },

  /**
   * iOS Only.
   * Sets whether to enable verbose logging in development mode. Default: NO.
   */
  setVerboseLoggingInDevelopmentMode: (enabled: boolean): void => {
    return NativeModules.Leanplum.setVerboseLoggingInDevelopmentMode(enabled);
  },

  /**
   * iOS Only.
   * Sets a custom event name for in-app purchase tracking. Default: Purchase.
   */
  setInAppPurchaseEventName: (event: string): void => {
    return NativeModules.Leanplum.setInAppPurchaseEventName(event);
  },

  /**
   * Must call either this or {@link setAppIdForProductionMode}
   * before issuing any calls to the API, including start.
   * @param appId Your app ID.
   * @param accessKey Your development key.
   */
  setAppIdForDevelopmentMode: (appId: string, accessKey: string): void => {
    return NativeModules.Leanplum.setAppIdForDevelopmentMode(appId, accessKey);
  },

  /**
   * Must call either this or {@link setAppIdForDevelopmentMode}
   * before issuing any calls to the API, including start.
   * @param appId Your app ID.
   * @param accessKey Your production key.
   */
  setAppIdForProductionMode: (appId: string, accessKey: string): void => {
    return NativeModules.Leanplum.setAppIdForProductionMode(appId, accessKey);
  },

  /**
   * Sets a custom device ID. For example, you may want to pass the advertising ID to do attribution.
   * By default, the device ID is the identifier for vendor.
   */
  setDeviceId: (deviceId: string): void => {
    return NativeModules.Leanplum.setDeviceId(deviceId);
  },

  /**
   * iOS Only.
   * By default, Leanplum reports the version of your app using CFBundleVersion, which
   * can be used for reporting and targeting on the Leanplum dashboard.
   * If you wish to use CFBundleShortVersionString or any other string as the version,
   * you can call this before your call to Leanplum.start()
   */
  setAppVersion: (appVersion: string): void => {
    return NativeModules.Leanplum.setAppVersion(appVersion);
  },

  /**
   * Call this when your application starts.
   * This will initiate a call to Leanplum's servers to get the values
   * of the variables used in your app.
   */
  start: (userId?: string, attributes?: LeanplumAttributes): Promise<boolean> => {
    return NativeModules.Leanplum.start(userId, attributes);
  },

  /**
   * Returns whether or not Leanplum has finished starting.
   */
  hasStarted: (): Promise<boolean> => {
    return NativeModules.Leanplum.hasStarted();
  },

  /**
   * Returns whether or not Leanplum has finished starting and the device is registered
   * as a developer.
   */
  hasStartedAndRegisteredAsDeveloper: (): Promise<boolean> => {
    return NativeModules.Leanplum.hasStartedAndRegisteredAsDeveloper();
  },

  /**
   * Function to call when the start call finishes, and variables are returned
   * back from the server. Calling this multiple times will call each function
   * in succession.
   */
  onStartResponse: (callback: (success: boolean) => void): void => {
    return NativeModules.Leanplum.onStartResponse(callback);
  },

  /**
   * Function to call when the variables receive new values from the server.
   * This will be called on start, and also later on if the user is in an experiment
   * that can update in realtime.
   */
  onVariablesChanged: (callback: () => void): void => {
    return NativeModules.Leanplum.onVariablesChanged(callback);
  },

  /**
   * iOS Only.
   * Function to call when the interface receive new values from the server.
   * This will be called on start, and also later on if the user is in an experiment
   * that can update in realtime.
   */
  onInterfaceChanged: (callback: () => void): void => {
    return NativeModules.Leanplum.onInterfaceChanged(callback);
  },

  /**
   * Function to call when no more file downloads are pending (either when
   * no files needed to be downloaded or all downloads have been completed).
   */
  onVariablesChangedAndNoDownloadsPending: (callback: () => void): void => {
    return NativeModules.Leanplum.onceVariablesChangedAndNoDownloadsPending(callback);
  },

  /**
   * Function to call ONCE when no more file downloads are pending (either when
   * no files needed to be downloaded or all downloads have been completed).
   */
  onceVariablesChangedAndNoDownloadsPending: (callback: () => void): void => {
    return NativeModules.Leanplum.onceVariablesChangedAndNoDownloadsPending(callback);
  },

  /**
   * Updates a user ID after session start.
   */
  setUserId: (userId: string): void => {
    return NativeModules.Leanplum.setUserId(userId);
  },

  /**
   * Updates a user ID after session start with a dictionary of user attributes.
   */
  setUserAttributes: (userId: string, attributes: LeanplumAttributes): void => {
    return NativeModules.Leanplum.setUserAttributes(userId, attributes);
  },

  /**
   * If you do not want to send GPS/Cell location to Leanplum, then call 
   * disableLocationCollection before start().
   */
  disableLocationCollection: () => {
    return NativeModules.Leanplum.disableLocationCollection();
  },

  /**
   * Our SDK allows you to set user location by calling setDeviceLocation with two arguments (see below)
   * after calling start. You should call disableLocationCollection before setting the location.
   * @param type will be omitted on iOS, on Android it should be CELL (default) or GPS.
   */
  setDeviceLocation: (latitude: number, longitude: number, type: string) => {
    if (Platform.OS === 'android') {
      return NativeModules.Leanplum.setDeviceLocation(latitude, longitude, type);
    } else {
      return NativeModules.Leanplum.setDeviceLocationWithLatitude(latitude, longitude);
    }
  },

  /**
   * Sets the traffic source info for the current user.
   * Keys in info must be one of: publisherId, publisherName, publisherSubPublisher,
   * publisherSubSite, publisherSubCampaign, publisherSubAdGroup, publisherSubAd.
   */
  setTrafficSourceInfo: (info: LeanplumTrafficSourceInfo): void => {
    return NativeModules.Leanplum.setTrafficSourceInfo(info);
  },

  /**
   * Advances to a particular state in your application. The string can be
   * any value of your choosing, and will show up in the dashboard.
   * A state is a section of your app that the user is currently in.
   * You can specify up to 200 types of parameters per app across all events and state.
   * The parameter keys must be strings, and values either strings or numbers.
   * @param state The name of the state. (nullable)
   * @param info Anything else you want to log with the state. For example, if the state
   * is watchVideo, info could be the video ID.
   * @param params A dictionary with custom parameters.
   */
  advanceTo: (state: string, info?: string, params?: LeanplumAttributes): void => {
    return NativeModules.Leanplum.advanceTo(state, info, params);
  },

  /**
   * Pauses the current state.
   * You can use this if your game has a "pause" mode. You shouldn't call it
   * when someone switches out of your app because that's done automatically.
   */
  pauseState: (): void => {
    return NativeModules.Leanplum.pauseState();
  },

  /**
   * Resumes the current state.
   */
  resumeState: (): void => {
    return NativeModules.Leanplum.resumeState();
  },

  /**
   * Automatically tracks all of the screens in the app as states.
   * You should not use this in conjunction with advanceTo as the user can only be in
   * 1 state at a time. This method requires LeanplumUIEditor module.
   */
  trackAllAppScreens: (): void => {
    return NativeModules.Leanplum.trackAllAppScreens();
  },

  /**
   * Manually track purchase event with currency code in your application. It is advised to use
   * trackInAppPurchases to automatically track IAPs.
   */
  trackPurchase: (event: string, value?: number, currencyCode?: string, params?: LeanplumAttributes): void => {
    return NativeModules.Leanplum.trackPurchase(event, value || 0, currencyCode, params);
  },

  /**
   * iOS Only.
   * Automatically tracks InApp purchase and does server side receipt validation.
   */
  trackInAppPurchases: (): void => {
    return NativeModules.Leanplum.trackInAppPurchases();
  },

  /**
   * Logs a particular event in your application. The string can be
   * any value of your choosing, and will show up in the dashboard.
   * To track a purchase, use trackPurchase().
   */
  track: (event: string, value?: number, info?: string, params?: LeanplumAttributes): void => {
    return NativeModules.Leanplum.track(event, value || 0, info, params);
  },

  /**
   * Gets a list of variants that are currently active for this user.
   * Each variant is a dictionary containing an id.
   */
  variants: (): Promise<Dictionary<LeanplumVariant>[]> => {
    return NativeModules.Leanplum.variants();
  },

  /**
   * Forces content to update from the server. If variables have changed, the
   * appropriate callbacks will fire. Use sparingly as if the app is updated,
   * you'll have to deal with potentially inconsistent state or user experience.
   * The provided callback will always fire regardless
   * of whether the variables have changed.
   */
  forceContentUpdate: (callback: () => void): void => {
    return NativeModules.Leanplum.forceContentUpdate(callback);
  },

  /**
   * This should be your first statement in a unit test. This prevents
   * Leanplum from communicating with the server.
   */
  enableTestMode: (): void => {
    return NativeModules.Leanplum.enableTestMode();
  },

  /**
   * Used to enable or disable test mode. Test mode prevents Leanplum from
   * communicating with the server. This is useful for unit tests.
   */
  setTestModeEnabled: (isTestModeEnabled: boolean) => {
    return NativeModules.Leanplum.setTestModeEnabled();
  },

  /**
   * iOS Only.
   * Customize push setup. If this API should be called before [Leanplum start]. If this API is not
   * used the default push setup from the docs will be used for "Push Ask to Ask" and
   * "Register For Push".
   */
  setPushSetup: (callback: () => void): void => {
    return NativeModules.Leanplum.setPushSetup(callback);
  },

  /**
   * iOS Only.
   * Returns YES if the app existed on the device more than a day previous to a version built with
   * Leanplum was installed.
   */
  isPreLeanplumInstall: (): Promise<boolean> => {
    return NativeModules.Leanplum.isPreLeanplumInstall();
  },

  /**
   * Returns the deviceId in the current Leanplum session. This should only be called after
   * Leanplum.start().
   */
  deviceId: (): Promise<string> => {
    return NativeModules.Leanplum.deviceId();
  },

  /**
   * Returns the userId in the current Leanplum session. This should only be called after
   * [Leanplum start].
   */
  userId: (): Promise<string> => {
    return NativeModules.Leanplum.userId();
  },

  /**
   * Returns an instance to the singleton LPInbox object.
   */
  inbox: () => {
      return LPInbox;
  }
};