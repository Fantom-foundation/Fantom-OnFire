export const appConfig = {
    // app name - used in titles
    name: 'Fantom On Fire',
    // app code
    code: 'fantomonfire',
    // apollo client settings
    apollo: {
        // Fantom api
        fantom: {
            // list of providers. if one of them is unavailable, another is randomly picked
            providers: [
                {
                    http: 'https://xapi-nodea.fantom.network/',
                    // for subscriptions
                    ws: '',
                },
                {
                    http: 'https://xapi-nodeb.fantom.network/',
                    // for subscriptions
                    ws: '',
                },
                {
                    http: 'https://xapi-nodec.fantom.network/',
                    // for subscriptions
                    ws: '',
                },
                {
                    http: 'https://xapi-noded.fantom.network/',
                    // for subscriptions
                    ws: '',
                },
                {
                    http: 'https://xapi-nodee.fantom.network/',
                    // for subscriptions
                    ws: '',
                },
                {
                    http: 'https://xapi-nodef.fantom.network/',
                    // for subscriptions
                    ws: '',
                },
            ],
            // index into providers array of default provider or 'random' - takes index randomly
            defaultProviderIndex: 'random',
        },
    },
    // pwa settings
    pwa: {
        // name used in pwa manifest
        name: 'Fantom On Fire',
        categories: ['finance'],
        mainColor: '#ffffff',
        description: 'Burned FTM Fees',
        assetsVersion: '1',
    },
    // this object is set by calling `setEnv` function
    env: {
        mockingEnabled: false,
    },
};

/**
 * Call this function in `main.js`
 */
export function setEnv() {
    appConfig.env.mockingEnabled = !!import.meta.env.VITE_MOCK_LOCAL_SERVER;
}
