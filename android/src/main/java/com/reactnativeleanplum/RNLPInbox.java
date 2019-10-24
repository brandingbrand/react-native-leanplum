package com.reactnativeleanplum;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeArray;
import com.facebook.react.bridge.WritableNativeMap;

import com.leanplum.Leanplum;
import com.leanplum.LeanplumInboxMessage;

import java.util.Iterator;
import java.util.List;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

public class RNLPInbox extends ReactContextBaseJavaModule {
    private static final String E_MESSAGE_NOT_FOUND_ERROR = "RNLPInboxMessageNotFound";
    private static final String E_MESSAGE_NOT_FOUND_REASON = "Could not find a message with the given id.";

    public RNLPInbox(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "LPInbox";
    }

    @ReactMethod
    public void count(Promise promise) {
        promise.resolve(Leanplum.getInbox().count());
    }

    @ReactMethod
    public void unreadCount(Promise promise) {
        promise.resolve(Leanplum.getInbox().unreadCount());
    }

    @ReactMethod
    public void messagesIds(Promise promise) {
        promise.resolve(Leanplum.getInbox().messagesIds());
    }

    @ReactMethod
    public void allMessages(Promise promise) {
        promise.resolve(listForMessages(Leanplum.getInbox().allMessages()));
    }

    @ReactMethod
    public void unreadMessages(Promise promise) {
        promise.resolve(listForMessages(Leanplum.getInbox().unreadMessages()));
    }

    @ReactMethod
    public void messageForId(String messageId, Promise promise) {
        LeanplumInboxMessage message = Leanplum.getInbox().messageForId(messageId);

        if (message != null) {
            promise.resolve(mapForMessage(message));
        } else {
            promise.reject(E_MESSAGE_NOT_FOUND_ERROR, E_MESSAGE_NOT_FOUND_REASON);
        }
    }
    
    @ReactMethod
    public void disableImagePrefetching() {
        Leanplum.getInbox().disableImagePrefetching();
    }

    private static WritableArray listForMessages(List<LeanplumInboxMessage> messages) {
        WritableArray list = new WritableNativeArray();

        for (LeanplumInboxMessage message : messages) {
            list.pushMap(mapForMessage(message));
        }

        return list;
    }

    private static WritableMap mapForMessage(LeanplumInboxMessage message) {
        WritableMap messageData = new WritableNativeMap();

        messageData.putString("messageId", message.getMessageId());
        messageData.putString("title", message.getTitle());
        messageData.putString("subtitle", message.getSubtitle());
        messageData.putString("imageURL", message.getImageUrl() == null ? "" : String.valueOf(message.getImageUrl()));

        try {
            messageData.putMap("data", jsonToReact(message.getData()));
        } catch (JSONException e) {
            // We can't convert the message data. Maybe we should exclude this message?
        }
        
        messageData.putDouble("deliveryTimestamp", (message.getDeliveryTimestamp() == null) ? 0 : message.getDeliveryTimestamp().getTime());
        messageData.putDouble("expirationTimestamp", (message.getExpirationTimestamp() == null) ? 0 : message.getExpirationTimestamp().getTime());
        messageData.putBoolean("isRead", message.isRead());

        return messageData;
    }

    private static WritableMap jsonToReact(JSONObject data) throws JSONException {
        WritableMap map = new WritableNativeMap();

        if (data == null) {
            return map;
        }
        
        Iterator iterator = data.keys();

        while(iterator.hasNext()) {
            String key = (String)iterator.next();
            Object value = data.get(key);

            if (value instanceof Float || value instanceof Double) {
                map.putDouble(key, data.getDouble(key));
            } else if (value instanceof Number) {
                map.putInt(key, data.getInt(key));
            } else if (value instanceof String) {
                map.putString(key, data.getString(key));
            } else if (value instanceof JSONObject) {
                map.putMap(key, jsonToReact(data.getJSONObject(key)));
            } else if (value instanceof JSONArray) {
                map.putArray(key, jsonToReact(data.getJSONArray(key)));
            } else if (value == JSONObject.NULL) {
                map.putNull(key);
            }
        }

        return map;
    }

    private static WritableArray jsonToReact(JSONArray data) throws JSONException {
        WritableArray array = new WritableNativeArray();

        for (int i = 0; i < data.length(); i++) {
            Object value = data.get(i);

            if (value instanceof Float || value instanceof Double) {
                array.pushDouble(data.getDouble(i));
            } else if (value instanceof Number) {
                array.pushInt(data.getInt(i));
            } else if (value instanceof String) {
                array.pushString(data.getString(i));
            } else if (value instanceof JSONObject) {
                array.pushMap(jsonToReact(data.getJSONObject(i)));
            } else if (value instanceof JSONArray) {
                array.pushArray(jsonToReact(data.getJSONArray(i)));
            } else if (value == JSONObject.NULL) {
                array.pushNull();
            }
        }

        return array;
    }
}
