# React Native Leanplum

[![npm version](https://badge.fury.io/js/%40brandingbrand%2Freact-native-leanplum.svg)](https://badge.fury.io/js/%40brandingbrand%2Freact-native-leanplum)

# Supported React Native Versions

This library was updated to support React Native autolinking in version 5.0; therefore it is not recommended to upgrade to version 5 unless you are running React Native 0.60 or above.

|React Native|React Native Leanplum|
|------------|---------------------|
| 0.60.0+|>= 5.0.0|
| 0.40.0 - 0.59.x|<= 4.0.0|

# Install

```sh
yarn add @brandingbrand/react-native-leanplum
```

# Usage

> You may need `https://github.com/brandingbrand/react-native-push-notification-leanplum` too

## JS
```js
import Leanplum from '@brandingbrand/react-native-leanplum';
...
const leanPlumKeys = {
  appId: '',
  development: '',
  production: '',
}
...
const start = async () => {
  if (__DEV__) {
    Leanplum.setAppIdForDevelopmentMode(
      leanPlumKeys.appId,
      leanPlumKeys.development,
    );
  } else {
    Leanplum.setAppIdForProductionMode(
      leanPlumKeys.appId,
      leanPlumKeys.production,
    );
  }

  const started = await Leanplum.hasStarted();
  if (!started) Leanplum.start();
};
```

### Leanplum API

  - `setApiConnectionSettings`: <br>
  _Optional_<br>
  Sets the API server. The API path is of the form http[s]://hostname/servletName<br>
  **@param** hostName The name of the API host, such as api.leanplum.com<br>
  **@param** servletName The name of the API servlet, such as api<br>
  **@param** ssl Whether to use SSL

  - `setNetworkTimeout`: <br>
  _Optional_<br>
  Adjusts the network timeouts.
  The default timeout is 10 seconds for requests, and 15 seconds for file downloads.

  - `setNetworkActivityIndicatorEnabled`: <br>
  _iOS Only_<br>
  Sets whether to show the network activity indicator in the status bar when making requests.
  Default: YES.

  - `setCanDownloadContentMidSessionInProductionMode`: <br>
  _Advanced_<br>
  Whether new variables can be downloaded mid-session. By default, this is disabled.
  Currently, if this is enabled, new variables can only be downloaded if a push notification is sent
  while the app is running, and the notification's metadata hasn't be downloaded yet.

  - `setFileHashingEnabledInDevelopmentMode`: <br>
  Modifies the file hashing setting in development mode.
  By default, Leanplum will hash file variables to determine if they're modified and need
  to be uploaded to the server if we're running in the simulator.
  Setting this to NO will reduce startup latency in development mode, but it's possible
  that Leanplum will not always have the most up-to-date versions of your resources.

  - `setVerboseLoggingInDevelopmentMode`: <br>
  _iOS Only_<br>
  Sets whether to enable verbose logging in development mode. Default: NO.

  - `setInAppPurchaseEventName`: <br>
  _iOS Only_<br>
  Sets a custom event name for in-app purchase tracking. Default: Purchase.

  - `setAppIdForDevelopmentMode`: <br>
  Must call either this or {@link setAppIdForProductionMode}
  before issuing any calls to the API, including start.<br>
  **@param** appId Your app ID.<br>
  **@param** accessKey Your development key.

  - `setAppIdForProductionMode`: <br>
  Must call either this or {@link setAppIdForDevelopmentMode}
  before issuing any calls to the API, including start.<br>
  **@param** appId Your app ID.<br>
  **@param** accessKey Your production key.

  - `setDeviceId`: <br>
  Sets a custom device ID. For example, you may want to pass the advertising ID to do attribution.
  By default, the device ID is the identifier for vendor.

  - `setAppVersion`: <br>
  _iOS Only_<br>
  By default, Leanplum reports the version of your app using CFBundleVersion, which
  can be used for reporting and targeting on the Leanplum dashboard.
  If you wish to use CFBundleShortVersionString or any other string as the version,
  you can call this before your call to Leanplum.start()

  - `start`: <br>
  Call this when your application starts.
  This will initiate a call to Leanplum's servers to get the values
  of the variables used in your app.

  - `hasStarted`: <br>
  Returns whether or not Leanplum has finished starting.

  - `hasStartedAndRegisteredAsDeveloper`: <br>
  Returns whether or not Leanplum has finished starting and the device is registered
  as a developer.

  - `onStartResponse`: <br>
  Function to call when the start call finishes, and variables are returned
  back from the server. Calling this multiple times will call each function
  in succession.

  - `onVariablesChanged`: <br>
  Function to call when the variables receive new values from the server.
  This will be called on start, and also later on if the user is in an experiment
  that can update in realtime.

  - `onInterfaceChanged`: <br>
  _iOS Only_<br>
  Function to call when the interface receive new values from the server.
  This will be called on start, and also later on if the user is in an experiment
  that can update in realtime.

  - `onVariablesChangedAndNoDownloadsPending`: <br>
  Function to call when no more file downloads are pending (either when
  no files needed to be downloaded or all downloads have been completed).

  - `onceVariablesChangedAndNoDownloadsPending`: <br>
  Function to call ONCE when no more file downloads are pending (either when
  no files needed to be downloaded or all downloads have been completed).

  - `setUserId`: <br>
  Updates a user ID after session start.

  - `setUserAttributes`: <br>
  Updates a user ID after session start with a dictionary of user attributes.

  - `setTrafficSourceInfo`: <br>
  Sets the traffic source info for the current user.
  Keys in info must be one of: 
    - `publisherId`
    - `publisherName`
    - `publisherSubPublishe`
    - `publisherSubSite`
    - `publisherSubCampaign`
    - `publisherSubAdGroup`
    - `publisherSubAd`

  - `advanceTo`: <br>
  Advances to a particular state in your application. The string can be
  any value of your choosing, and will show up in the dashboard.
  A state is a section of your app that the user is currently in.
  You can specify up to 200 types of parameters per app across all events and state.
  The parameter keys must be strings, and values either strings or numbers.<br>
  **@param** state The name of the state. (nullable)<br>
  **@param** info Anything else you want to log with the state. For example, if the state
  is watchVideo, info could be the video ID.<br>
  **@param** params A dictionary with custom parameters.

  - `pauseState`: <br>
  Pauses the current state.
  You can use this if your game has a "pause" mode. You shouldn't call it
  when someone switches out of your app because that's done automatically.

  - `resumeState`: <br>
  Resumes the current state.

  - `trackAllAppScreens`: <br>
  Automatically tracks all of the screens in the app as states.
  You should not use this in conjunction with advanceTo as the user can only be in
  1 state at a time. This method requires LeanplumUIEditor module.

  - `trackPurchase`: <br>
  Manually track purchase event with currency code in your application. It is advised to use
  trackInAppPurchases to automatically track IAPs.

  - `trackInAppPurchases`: <br>
  _iOS Only_<br>
  Automatically tracks InApp purchase and does server side receipt validation.

  - `track`: <br>
  Logs a particular event in your application. The string can be
  any value of your choosing, and will show up in the dashboard.
  To track a purchase, use trackPurchase().

  - `variants`: <br>
  Gets a list of variants that are currently active for this user.
  Each variant is a dictionary containing an id.

  - `forceContentUpdate`: <br>
  Forces content to update from the server. If variables have changed, the
  appropriate callbacks will fire. Use sparingly as if the app is updated,
  you'll have to deal with potentially inconsistent state or user experience.
  The provided callback will always fire regardless
  of whether the variables have changed.

  - `enableTestMode`: <br>
  This should be your first statement in a unit test. This prevents
  Leanplum from communicating with the server.

  - `setTestModeEnabled`: <br>
  Used to enable or disable test mode. Test mode prevents Leanplum from
  communicating with the server. This is useful for unit tests.

  - `setPushSetup`: <br>
  _iOS Only_<br>
  Customize push setup. If this API should be called before [Leanplum start]. If this API is not
  used the default push setup from the docs will be used for "Push Ask to Ask" and
  "Register For Push".

  - `isPreLeanplumInstall`: <br>
  _iOS Only_<br>
  Returns YES if the app existed on the device more than a day previous to a version built with
  Leanplum was installed.

  - `deviceId`: <br>
  Returns the deviceId in the current Leanplum session. This should only be called after
  Leanplum.start().

  - `userId`: <br>
  Returns the userId in the current Leanplum session. This should only be called after
  [Leanplum start].

  - `inbox`: <br>
  Returns an instance to the singleton LPInbox object.

### LPInbox

### LPInboxMessage
