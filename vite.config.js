import { fileURLToPath, URL } from 'url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { VitePWA } from 'vite-plugin-pwa';
import { appConfig } from './src/app.config.js';

const plugins = [vue()];

// PWA
plugins.push(
    VitePWA({
        selfDestroying: true,
        includeAssets: [
            'favicon-16x16.png',
            'favicon-32x32.png',
            'favicon.ico',
            'robots.txt',
            'apple-touch-icon.png',
            'fire2.gif',
        ],
        manifest: {
            name: appConfig.pwa.name,
            short_name: appConfig.pwa.name,
            theme_color: appConfig.pwa.mainColor,
            background_color: appConfig.pwa.mainColor,
            description: appConfig.pwa.description,
            categories: appConfig.pwa.categories,
            display: 'standalone',
            icons: [
                {
                    src: './pwa-192x192.png',
                    sizes: '192x192',
                    type: 'image/png',
                },
                {
                    src: './pwa-512x512.png',
                    sizes: '512x512',
                    type: 'image/png',
                },
            ],
        },
        registerType: 'autoUpdate',
    })
);

// https://vitejs.dev/config/
export default defineConfig({
    // base: './', // SANDBOX
    plugins,
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
            '~fantom-vue3-components': 'fantom-vue3-components',
        },
    },
    test: {
        // include: ['**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}']
        include: ['src/**/*.spec.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
        deps: {
            inline: ['fantom-vue3-components'],
        },
        setupFiles: [
            fileURLToPath(
                new URL('node_modules/fantom-vue3-components/src/plugins/vue-test-plugins/install.js', import.meta.url)
            ),
        ],
        // globals: true,
    },
});
