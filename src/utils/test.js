import { beforeAll, afterAll, afterEach } from 'vitest';
import { setupNodeMockServer } from '@/mocks/node-mock-server.js';

/**
 * Get element by test id
 *
 * @param {string} id
 * @param {VueWrapper} wrapper
 * @return {*}
 */
export function getElemByTestId(id, wrapper) {
    return wrapper.find(`[data-testid="${id}"]`);
}

/**
 * Get elements by test code
 *
 * @param {string} code
 * @param {VueWrapper} wrapper
 * @return {*}
 */
export function getElemsByTestCode(code, wrapper) {
    return wrapper.findAll(`[data-testcode="${code}"]`);
}

/**
 * @param {VueWrapper} foptiongroup
 * @param {number} optionIndex
 * @return {Promise<*|undefined>}
 */
export async function checkFOptionGroupOption(foptiongroup, optionIndex = 0) {
    const inputs = foptiongroup.findAll('input');

    return inputs && inputs.length > 0 ? foptiongroup.findAll('input')[optionIndex].trigger('change') : undefined;
}

/*
export function withSetup({ composable = null, setupApollo = false } = {}) {
    let composableResult = {};

    const app = createApp({
        setup() {
            if (typeof composable === 'function') {
                composableResult = composable();

                if (setupApollo) {
                    setupApolloProviders();
                }
            }
            // suppress missing template warning
            return () => {};
        },
    });

    app.mount(document.createElement('div'));

    return { composableResult, app };
}
*/

export function getIntegrationTestWrapperMountOptions(component, options = {}) {
    const componentName = Object.keys(component)[0];

    return {
        global: { components: component },
        ...options,
        props: {
            component: componentName,
            ...(options.props || {}),
        },
    };
}

export function setupTestServer(handlers) {
    const server = setupNodeMockServer(handlers);

    function waitForRequest({ operationName = '', method = 'post', wait = 20 }) {
        return new Promise((resolve, reject) => {
            const serverEvents = server.events;
            let requestId = '';
            let response = null;

            function onRequestStart(req) {
                if (req.method.toLowerCase() === method.toLowerCase() && req.body.operationName === operationName) {
                    requestId = req.id;
                }
            }

            function onRequestMatch(req) {
                if (req.id === requestId) {
                    removeListeners();
                    setTimeout(() => {
                        resolve({ request: req, response });
                    }, wait);
                }
            }

            function onResponseMocked(res, reqId) {
                if (requestId === reqId) {
                    response = res;
                }
            }

            function onRequestUnhandled(req) {
                if (req.id === requestId) {
                    removeListeners();
                    reject(new Error(`The ${req.method} ${req.url.href} request was unhandled.`));
                }
            }

            function removeListeners() {
                serverEvents.removeListener('request:start', onRequestStart);
                serverEvents.removeListener('request:match', onRequestMatch);
                serverEvents.removeListener('request:mocked', onResponseMocked);
                serverEvents.removeListener('request:unhandled', onRequestUnhandled);
            }

            serverEvents.on('request:start', onRequestStart);
            serverEvents.on('request:match', onRequestMatch);
            serverEvents.on('response:mocked', onResponseMocked);
            serverEvents.on('request:unhandled', onRequestUnhandled);
        });
    }

    beforeAll(() => {
        server.listen({ onUnhandledRequest: 'error' });
    });
    afterAll(() => server.close());
    afterEach(() => server.resetHandlers());

    return {
        server,
        waitForRequest,
    };
}
