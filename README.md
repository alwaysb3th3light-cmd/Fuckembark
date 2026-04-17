<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# FuckEmbark - AI Studio App (Android Only)

This is an Android-only AI application powered by Google Gemini AI. The app can be downloaded and installed directly on Android devices.

View your app in AI Studio: https://ai.studio/apps/9ae80401-a21d-40a7-9f64-a694d9f8a09f

## 📱 Android APK Download

**Latest Release:** [Download APK](https://github.com/alwaysb3th3light-cmd/Fuckembark/releases)

### Installation Steps:
1. Download the APK file to your Android device
2. Open file manager and navigate to Downloads
3. Tap the APK file to install
4. Grant permissions when prompted
5. Launch the app!

## 🚀 Build Your Own APK

### Prerequisites
- Node.js (v16+)
- Java JDK (v17+)
- Android Studio
- npm

### Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set your API key:**
   ```bash
   cp .env.example .env.local
   # Edit .env.local and add your GEMINI_API_KEY
   ```

3. **Build Debug APK:**
   ```bash
   npm run android:build:debug
   ```

4. **Build Release APK:**
   ```bash
   npm run android:build
   ```

APK files will be in:
- Debug: `android/app/build/outputs/apk/debug/app-debug.apk`
- Release: `android/app/build/outputs/apk/release/app-release-unsigned.apk`

### Automated Builds

GitHub Actions automatically builds APKs when you push tags:

```bash
git tag v1.0.0
git push origin v1.0.0
# APKs are built and uploaded to Releases automatically
```

## 📖 Documentation

- [Android Setup Guide](./ANDROID_SETUP.md) - Detailed build instructions
- [Run Locally](./ANDROID_SETUP.md#local-development) - Web development mode

## 🔧 Development

For web development mode:
```bash
npm run dev
# Opens at http://localhost:3000
```

Build for web:
```bash
npm run build
npm run preview
```

## 🤖 Tech Stack

- **React 19** - UI Framework
- **Vite** - Build tool
- **Capacitor** - Android wrapper
- **Google Gemini AI** - AI engine
- **Tailwind CSS** - Styling
- **TypeScript** - Type safety

## ⚙️ Android-Only Configuration

- App ID: `com.alwaysb3th3light.fuckembark`
- Target: Android only (no web/desktop version)
- Built with: Capacitor 6.1.0

## 📝 Environment Variables

Create `.env.local`:
```
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

## 📄 License

See LICENSE file for details

---

**Built for Android | Google Gemini Powered** 🚀