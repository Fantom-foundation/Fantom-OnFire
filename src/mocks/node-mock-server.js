import { setupServer } from 'msw/node';
import { allHandlers } from './all-handlers.js';

export function setupNodeMockServer(handlers = allHandlers) {
    return setupServer(...handlers);
}
