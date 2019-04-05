package com.reactnativeleanplum;

import android.app.Application;
import android.content.pm.PackageManager;
import android.os.Bundle;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.ReadableMapKeySetIterator;
import com.facebook.react.bridge.ReadableType;

import com.leanplum.callbacks.StartCallback;
import com.leanplum.callbacks.VariablesChangedCallback;
import com.leanplum.Leanplum;
import com.leanplum.LeanplumActivityHelper;

import java.util.HashMap;

public class RNLeanplum extends ReactContextBaseJavaModule {
    private Application application;
    private String application_id;
    private String dev_key;
    private String prod_key;
    public RNLeanplum(ReactApplicationContext reactContext, Application app) {
        super(reactContext);

        Leanplum.setApplicationContext(app);
        LeanplumActivityHelper.enableLifecycleCallbacks(app);
        application = app;
        try {

            application_id = getReactApplicationContext().getApplicationInfo().metaData.getString("com.reactnativeleanplum.APP_ID","");
            dev_key = getReactApplicationContext().getApplicationInfo().metaData.getString("com.reactnativeleanplum.DEV_KEY","");
            prod_key = getReactApplicationContext().getApplicationInfo().metaData.getString("com.reactnativeleanplum.PROD_KEY","");

            // Insert your API keys here.
            if (BuildConfig.DEBUG) {
              Leanplum.setAppIdForDevelopmentMode(application_id, dev_key);
              Leanplum.enableTestMode();
            } else {
              Leanplum.setAppIdForProductionMode(application_id, prod_key);
            }
            Leanplum.start(app);
        } catch(Exception e){

        }
    }

    @Override
    public String getName() {
        return "Leanplum";
    }

    @ReactMethod
    public void setApiConnectionSettings(String hostName, String servletName, boolean ssl) {
        Leanplum.setApiConnectionSettings(hostName, servletName, ssl);
    }

    @ReactMethod
    public void setNetworkTimeout(int seconds, int downloadSeconds) {
        Leanplum.setNetworkTimeout(seconds, downloadSeconds);
    }
    
    @ReactMethod
    public void setCanDownloadContentMidSessionInProductionMode(boolean enabled) {
        Leanplum.setCanDownloadContentMidSessionInProductionMode(enabled);
    }
    
    @ReactMethod
    public void setFileHashingEnabledInDevelopmentMode(boolean enabled) {
        Leanplum.setFileHashingEnabledInDevelopmentMode(enabled);
    }
    
    
    @ReactMethod
    public void setAppIdForDevelopmentMode(String appId, String accessKey) {
        Leanplum.setAppIdForDevelopmentMode(appId, accessKey);
    }
    
    @ReactMethod
    public void setAppIdForProductionMode(String appId, String accessKey) {
        Leanplum.setAppIdForProductionMode(appId, accessKey);
    }
    
    @ReactMethod
    public void setDeviceId(String deviceId) {
        Leanplum.setDeviceId(deviceId);
    }
    
    @ReactMethod
    public void start(String userId, ReadableMap attributes, final Promise promise) {
        Leanplum.start(application, userId, attributes != null ? attributes.toHashMap() : null, new StartCallback() {
            @Override
            public void onResponse(boolean success) {
                promise.resolve(success);
            }
        });
    }
    
    @ReactMethod
    public void hasStarted(Promise promise) {
        promise.resolve(Leanplum.hasStarted());
    }

    @ReactMethod
    public void hasStartedAndRegisteredAsDeveloper(Promise promise) {
        promise.resolve(Leanplum.hasStartedAndRegisteredAsDeveloper());
    }
    
    @ReactMethod
    public void onStartResponse(final Callback callback) {
        Leanplum.addStartResponseHandler(new StartCallback() {
            @Override
            public void onResponse(boolean success) {
                callback.invoke(success);
            }
        });
    }
    
    @ReactMethod
    public void onVariablesChanged(final Callback callback) {
        Leanplum.addVariablesChangedHandler(new VariablesChangedCallback() {
            @Override
            public void variablesChanged() {
                callback.invoke();
            } 
        });
    }
    
    @ReactMethod
    public void onVariablesChangedAndNoDownloadsPending(final Callback callback) {
        Leanplum.addVariablesChangedAndNoDownloadsPendingHandler(new VariablesChangedCallback() {
            @Override
            public void variablesChanged() {
                callback.invoke();
            } 
        });
    }
    
    @ReactMethod
    public void onceVariablesChangedAndNoDownloadsPending(final Callback callback) {
        Leanplum.addOnceVariablesChangedAndNoDownloadsPendingHandler(new VariablesChangedCallback() {
            @Override
            public void variablesChanged() {
                callback.invoke();
            } 
        });
    }
    
    @ReactMethod
    public void setUserId(String userId) {
        Leanplum.setUserId(userId);
    }
    
    @ReactMethod
    public void setUserAttributes(String userId, ReadableMap attributes) {
        Leanplum.setUserAttributes(userId, attributes != null ? attributes.toHashMap() : null);
    }
    
    @ReactMethod
    public void setTrafficSourceInfo(ReadableMap info) {
        ReadableMapKeySetIterator iterator = info.keySetIterator();
        HashMap<String, String> map = new HashMap<String, String>();

        while (iterator.hasNextKey()) {
            String key = iterator.nextKey();

            if (info.getType(key) == ReadableType.String) {
                map.put(key, info.getString(key));
            }
        }

        Leanplum.setTrafficSourceInfo(map);
    }
    
    @ReactMethod
    public void advanceTo(String state, String info, ReadableMap params) {
        Leanplum.advanceTo(state, info, params != null ? params.toHashMap() : null);
    }
    
    @ReactMethod
    public void pauseState() {
        Leanplum.pauseState();
    }
    
    @ReactMethod
    public void resumeState() {
        Leanplum.resumeState();
    }
    
    @ReactMethod
    public void trackAllAppScreens() {
        Leanplum.trackAllAppScreens();
    }
    
    @ReactMethod
    public void trackPurchase(String event, double value, String currencyCode, ReadableMap params) {
        Leanplum.trackPurchase(event, value, currencyCode, params != null ? params.toHashMap() : null);
    }

    
    @ReactMethod
    public void track(String event, double value, String info, ReadableMap params) {
        Leanplum.track(event, value, info, params != null ? params.toHashMap() : null);
    }
    
    @ReactMethod
    public void variants(Promise promise) {
        promise.resolve(Leanplum.variants());
    }
    
    @ReactMethod
    public void forceContentUpdate(final Callback callback) {
        Leanplum.forceContentUpdate(new VariablesChangedCallback() {
            @Override
            public void variablesChanged() {
                callback.invoke();
            } 
        });
    }
    
    @ReactMethod
    public void enableTestMode() {
        Leanplum.enableTestMode();
    }
    
    @ReactMethod
    public void setTestModeEnabled(boolean isTestModeEnabled) {
        Leanplum.setIsTestModeEnabled(isTestModeEnabled);
    }
    
    @ReactMethod
    public void deviceId(Promise promise) {
        promise.resolve(Leanplum.getDeviceId());
    }
    
    @ReactMethod
    public void userId(Promise promise) {
        promise.resolve(Leanplum.getUserId());
    }
}
