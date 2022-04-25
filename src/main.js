import { createApp } from 'vue';
import App from './App.vue';
import { registerSW } from 'virtual:pwa-register';
import { startBrowserMockServer } from './mocks/browser-mock-server.js';
// import { createPinia } from 'pinia';
// import { setStorageNamespace } from '@/utils/store.js';
import { appConfig, setEnv } from '@/app.config.js';

setEnv();

// PWA
registerSW({
    onOfflineReady() {},
});

export const app = createApp(App);

function startApp() {
    // app.use(createPinia());
    app.mount('#app');
}

console.log('mockingEnabled', appConfig.env.mockingEnabled);
if (appConfig.env.mockingEnabled) {
    startBrowserMockServer(() => {
        startApp();
    });
} else {
    startApp();
}
