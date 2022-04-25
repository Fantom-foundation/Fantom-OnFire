import { graphql } from 'msw';
// import { clone } from 'fantom-vue3-components';
import { data } from './data.js';

export function ftmBurnedTotalData() {
    return data();
}

export const ftmBurnedTotalQuery = graphql.query('GetFtmBurnedTotal', (req, res, ctx) => {
    return res(ctx.data(ftmBurnedTotalData()));
});

export const ftmBurnedTotalHandlers = [ftmBurnedTotalQuery];
