import { useMutation, useQuery, useResult } from '@vue/apollo-composable';

export function gqlQuery({
    query,
    variables = null,
    defaultData = null,
    pickFn = null,
    fetchPolicy = 'network-only',
    clientId = 'default',
    options = {},
}) {
    const { result, loading, error, refetch, fetchMore, onResult, onError } = useQuery(query, variables || null, {
        fetchPolicy,
        clientId,
        ...options,
    });

    const data = useResult(result, defaultData, pickFn);

    return {
        data,
        result,
        loading,
        error,
        refetch,
        fetchMore,
        onResult,
        onError,
    };
}

export function gqlMutaion({
    mutation,
    variables = null,
    fetchPolicy = 'network-only',
    clientId = 'default',
    options = {},
}) {
    const { mutate, loading, error, called, onDone, onError } = useMutation(mutation, {
        fetchPolicy,
        clientId,
        variables,
        ...options,
    });

    return {
        mutate,
        loading,
        error,
        called,
        onDone,
        onError,
    };
}
