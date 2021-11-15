// eslint-disable-next-line import/no-extraneous-dependencies
import '@style/globals.css';

import { ApolloProvider } from '@apollo/client';

import type { ReactElement } from 'react';
import type { AppProps } from 'next/app';
import type { NextPage } from 'next';

import client from '@graphql/index';

const MyApp: NextPage<AppProps> = ({ Component, pageProps }): ReactElement => {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
};

export default MyApp;
