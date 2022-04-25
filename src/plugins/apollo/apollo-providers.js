import { ApolloClient, ApolloLink, InMemoryCache } from '@apollo/client/core';
import { appConfig } from '@/app.config.js';
import { FApolloClient } from './FApolloClient.js';
import { provide } from 'vue';
import { ApolloClients } from '@vue/apollo-composable';

export const fantomFApolloClient = new FApolloClient({
    apolloProviders: appConfig.apollo.fantom.providers,
    defaultProviderIndex: appConfig.apollo.fantom.defaultProviderIndex,
});

const fantomApolloClient = new ApolloClient({
    link: ApolloLink.from([
        fantomFApolloClient.getNetErrorLink(),
        fantomFApolloClient.getRetryLink(),
        fantomFApolloClient.getErrorLink(),
        fantomFApolloClient.getHttpLink(),
    ]),
    cache: new InMemoryCache(),
    connectToDevTools: true,
});

export const apolloProvide = {
    ApolloClients: {
        default: fantomApolloClient,
    },
};

export function setupApolloProviders() {
    provide(ApolloClients, {
        default: fantomApolloClient,
    });
}
