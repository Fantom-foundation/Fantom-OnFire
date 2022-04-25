/**
 * Install service worker for requests mocking
 *
 * @param {function} [fn] Function called after worker has been started
 * @returns {Promise<void>}
 */
export async function startBrowserMockServer(fn) {
    const { worker } = await import('./browser.js');

    worker.start();

    // SANDBOX
    /*worker.start({
        serviceWorker: {
            url: '/fantom-on-fire/mockServiceWorker.js',
        },
    });*/

    if (typeof fn === 'function') {
        fn();
    }
}
