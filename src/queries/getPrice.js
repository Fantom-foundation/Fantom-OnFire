import gql from 'graphql-tag';
import { gqlQuery } from '@/utils/gql.js';

/**
 * @returns {{result: <any>, onError: (fn: (param: ApolloError) => void) => {off: () => void}, data: UseResultReturn<unknown>, fetchMore: (options: (FetchMoreQueryOptions<null, any> & FetchMoreOptions<any, null>)) => (Promise<ApolloQueryResult<any>> | undefined), refetch: (variables?: null) => (Promise<ApolloQueryResult<any>> | undefined), loading: <boolean>, error: <ApolloError | null>, onResult: (fn: (param: ApolloQueryResult<any>) => void) => {off: () => void}}}
 */
export function getPrice(to = 'USD') {
    return gqlQuery({
        query: gql`
            query GetPrice($to: String!) {
                price(to: $to) {
                    price
                }
            }
        `,
        variables: {
            to,
        },
        defaultData: 1,
        pickFn: (data) => data.price.price,
    });
}
