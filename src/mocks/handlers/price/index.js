import { graphql } from 'msw';
import { clone } from 'fantom-vue3-components';
import { data } from './data.js';

export function priceData() {
    return clone(data);
}

export const priceQuery = graphql.query('GetPrice', (req, res, ctx) => {
    return res(ctx.data(priceData()));
});

export const priceHandlers = [priceQuery];
