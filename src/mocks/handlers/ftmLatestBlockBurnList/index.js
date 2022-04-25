import { graphql } from 'msw';
import { data, data2 } from './data.js';

export function ftmLatestBlockBurnListData() {
    return data();
}

export function ftmLatestBlockBurnListData2() {
    return data2();
}

export const ftmLatestBlockBurnListQuery = graphql.query('GetFtmLatestBlockBurnList', (req, res, ctx) => {
    const data = ftmLatestBlockBurnListData();

    data.ftmLatestBlockBurnList = data.ftmLatestBlockBurnList.slice(
        0,
        req?.variables?.count || ftmLatestBlockBurnListData.length
    );

    return res(ctx.data(data));
});

export const ftmLatestBlockBurnListHandlers = [ftmLatestBlockBurnListQuery];
