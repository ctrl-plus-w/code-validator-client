// eslint-disable-next-line import/no-extraneous-dependencies
import '@style/globals.css';

import type { ReactElement } from 'react';
import type { AppProps } from 'next/app';
import type { NextPage } from 'next';

const MyApp: NextPage<AppProps> = ({ Component, pageProps }): ReactElement => {
  return <Component {...pageProps} />;
};

export default MyApp;
