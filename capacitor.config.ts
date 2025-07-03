import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.BrainsCx.app',
  appName: 'BrainsCx',
  webDir: 'dist/code',
  server: {
    androidScheme: 'https',
  },
};

export default config;
