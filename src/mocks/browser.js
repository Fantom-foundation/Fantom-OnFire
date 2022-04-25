import { setupWorker } from 'msw';
import { allHandlers } from './all-handlers.js';

export const worker = setupWorker(...allHandlers);
