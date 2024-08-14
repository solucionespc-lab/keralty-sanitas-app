import { ReactElement } from 'react';
import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  HttpLink,
  from,
} from '@apollo/client';

import offline from './Offline';
import errorLink from './Errores';

interface ServerProps {
  children: ReactElement | ReactElement[];
  token: string;
}

const Servidor = ({ children, token }: ServerProps) => {
  const link = new HttpLink({
    uri: import.meta.env.VITE_URI,
  });

  const authLink = new ApolloLink((operation, forward) => {
    operation.setContext({
      headers: {
        authorization: `Bearer ${token}`,
        'X-Firebase-AppCheck': '',
      },
    });

    return forward(operation);
  });

  const cliente = new ApolloClient({
    link: from([link, authLink, errorLink]),
    cache: offline,
    connectToDevTools: import.meta.env.DEV,
    defaultOptions: {
      watchQuery: {
        nextFetchPolicy(currentFetchPolicy) {
          if (
            currentFetchPolicy === 'network-only' ||
            currentFetchPolicy === 'cache-and-network'
          ) {
            // Demote the network policies (except "no-cache") to "cache-first"
            // after the first request.
            return 'cache-first';
          }
          // Leave all other fetch policies unchanged.
          return currentFetchPolicy;
        },
      },
    },
  });

  return <ApolloProvider client={cliente}>{children}</ApolloProvider>;
};

export default Servidor;
