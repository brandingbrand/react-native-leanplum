package com.reactnativeleanplum;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;


import android.app.Application;

import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeArray;
import com.facebook.react.bridge.WritableNativeMap;
import com.leanplum.ActionContext;
import com.leanplum.Leanplum;
import com.leanplum.LeanplumActivityHelper;
import com.leanplum.LeanplumInbox;
import com.leanplum.LeanplumInboxMessage;
import com.leanplum.LeanplumPushService;
import com.leanplum.NewsfeedMessage;

import org.json.JSONObject;

import java.lang.reflect.Field;
import java.util.List;

public class RNLeanplum extends ReactContextBaseJavaModule {

    private Application application;

    public RNLeanplum(ReactApplicationContext reactContext, Application app) {
        super(reactContext);
        application = app;
    }

    @Override
    public String getName() {
        return "RNLeanplum";
    }

    @ReactMethod
    public void setAppIdDevelopmentKey(String id, String key) {
        Leanplum.setAppIdForDevelopmentMode(id,  key);
    }

    @ReactMethod
    public void setAppIdProductionKey(String id, String key) {
        Leanplum.setAppIdForProductionMode(id, key);
    }

    @ReactMethod
    public void setUserId(String userId) {
        Leanplum.setUserId(userId);
    }

    @ReactMethod
    public void readMessage(String messageId) {
        LeanplumInbox inbox = Leanplum.getInbox();

        if (inbox != null) {
            LeanplumInboxMessage message = inbox.messageForId(messageId);
            if (message != null) {
                message.read();
            }
        }
    }

    @ReactMethod
    public void start() {
        Leanplum.setApplicationContext(application);
        LeanplumActivityHelper.enableLifecycleCallbacks(application);
        LeanplumPushService.setGcmSenderId(LeanplumPushService.LEANPLUM_SENDER_ID);
        LeanplumInbox.disableImagePrefetching();
        Leanplum.start(application);
    }

    @ReactMethod
    public void inboxMessages(Promise promise) {
        promise.resolve(generateJSONDictionary());
    }

    // Convert android data value into json dictionary
    public WritableArray generateJSONDictionary () {
        LeanplumInbox inbox = Leanplum.getInbox();

        WritableArray msgs = new WritableNativeArray();
        List all = inbox.allMessages();
        List<LeanplumInboxMessage> messages = (List<LeanplumInboxMessage>) all;


        for (LeanplumInboxMessage message : messages) {
            String dataString = null;

            // super hacky: getting private property from a instance
            // Android SDK 2.2.3 getData always returns null
            try {
                Field field = NewsfeedMessage.class.getDeclaredField("e");
                field.setAccessible(true);
                ActionContext context = (ActionContext) field.get(message);
                dataString = context.stringNamed("Data");
            } catch (NoSuchFieldException e) {} catch (IllegalAccessException e) {}

            WritableMap messageData = new WritableNativeMap();
            messageData.putString("messageId", message.getMessageId());
            messageData.putString("title", message.getTitle());
            messageData.putString("subtitle", message.getSubtitle());
            messageData.putString("imageURL", message.getImageUrl() == null ? "" : String.valueOf(message.getImageUrl()));
            messageData.putMap("data", converDataStringToMap(dataString));
            messageData.putDouble("deliveryTimestamp", (message.getDeliveryTimestamp() == null) ? 0 : message.getDeliveryTimestamp().getTime());
            messageData.putDouble("expirationTimestamp", (message.getExpirationTimestamp() == null) ? 0 : message.getExpirationTimestamp().getTime());
            messageData.putBoolean("isRead", message.isRead());

            msgs.pushMap(messageData);
        }

        return msgs;
    }

    static WritableMap converDataStringToMap(String dataString) {
        if (dataString == null) {
            return null;
        }
        WritableMap map = new WritableNativeMap();
        String[] dataArr = dataString.replace("{", "").replace("}", "").split(", ");
        for (int i = 0; i < dataArr.length; i++) {
            String[] dataItem = dataArr[i].split("=");
            map.putString(dataItem[0], dataItem[1]);
        }
        return map;
    }
}
