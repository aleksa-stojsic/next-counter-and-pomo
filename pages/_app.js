/* eslint-disable @next/next/no-before-interactive-script-outside-document */
import '../styles/globals.css';
import Head from 'next/head';
import Script from 'next/script';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      <Script src='/theme.js' strategy='beforeInteractive' />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
