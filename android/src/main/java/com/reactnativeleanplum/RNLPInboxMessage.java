package com.reactnativeleanplum;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import android.app.Application;

import com.leanplum.Leanplum;
import com.leanplum.LeanplumInbox;
import com.leanplum.LeanplumInboxMessage;

public class RNLPInboxMessage extends ReactContextBaseJavaModule {
    private static final String E_MESSAGE_NOT_FOUND_ERROR = "RNLPInboxMessageNotFound";
    private static final String E_MESSAGE_NOT_FOUND_REASON = "Could not find a message with the given id.";

    public RNLPInboxMessage(ReactApplicationContext reactContext, Application app) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "LPInboxMessage";
    }

    @ReactMethod
    public void readMessageId(String messageId, Promise promise) {
        LeanplumInboxMessage message = Leanplum.getInbox().messageForId(messageId);

        if (message != null) {
            message.read();

            promise.resolve(null);
        } else {
            promise.reject(E_MESSAGE_NOT_FOUND_ERROR, E_MESSAGE_NOT_FOUND_REASON);
        }
    }

    @ReactMethod
    public void removeMessageId(String messageId, Promise promise) {
        LeanplumInboxMessage message = Leanplum.getInbox().messageForId(messageId);

        if (message != null) {
            message.remove();

            promise.resolve(null);
        } else {
            promise.reject(E_MESSAGE_NOT_FOUND_ERROR, E_MESSAGE_NOT_FOUND_REASON);
        }
    }
}
