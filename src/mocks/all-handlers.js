import { ftmLatestBlockBurnListHandlers } from './handlers/ftmLatestBlockBurnList/index.js';
import { ftmBurnedTotalHandlers } from '@/mocks/handlers/ftmBurnedTotal/index.js';
import { priceHandlers } from '@/mocks/handlers/price/index.js';

export const allHandlers = [...ftmLatestBlockBurnListHandlers, ...ftmBurnedTotalHandlers, ...priceHandlers];
