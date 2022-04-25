import gql from 'graphql-tag';
import { gqlQuery } from '@/utils/gql.js';

/**
 * @param {number} count
 * @returns {{result: <any>, onError: (fn: (param: ApolloError) => void) => {off: () => void}, data: UseResultReturn<unknown>, fetchMore: (options: (FetchMoreQueryOptions<null, any> & FetchMoreOptions<any, null>)) => (Promise<ApolloQueryResult<any>> | undefined), refetch: (variables?: null) => (Promise<ApolloQueryResult<any>> | undefined), loading: <boolean>, error: <ApolloError | null>, onResult: (fn: (param: ApolloQueryResult<any>) => void) => {off: () => void}}}
 */
export function getFtmLatestBlockBurnList(count = 10) {
    return gqlQuery({
        query: gql`
            query GetFtmLatestBlockBurnList($count: Int = 25) {
                ftmLatestBlockBurnList(count: $count) {
                    blockNumber
                    timestamp
                    amount
                }
            }
        `,
        variables: {
            count,
        },
        defaultData: [],
    });
}
