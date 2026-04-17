import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
    appId: 'com.alwaysb3th3light.fuckembark',
    appName: 'FuckEmbark',
    webDir: 'build',
    bundledWebRuntime: false,
    android: {
        path: 'android'
    }
};

export default config;