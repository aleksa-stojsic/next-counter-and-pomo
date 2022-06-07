import Document, { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const originalRenderPage = ctx.renderPage;

    // Run the React rendering logic synchronously
    ctx.renderPage = () =>
      originalRenderPage({
        // Useful for wrapping the whole react tree
        enhanceApp: (App) => App,
        // Useful for wrapping in a per-page basis
        enhanceComponent: (Component) => Component
      });

    // Run the parent `getInitialProps`, it now includes the custom `renderPage`
    const initialProps = await Document.getInitialProps(ctx);

    return initialProps;
  }

  render() {
    return (
      <Html lang='en-US'>
        <Head>
          <meta charSet='utf-8' />
        </Head>
        <body>
          <Main />
          <NextScript />
          <Script
            id='theme'
            strategy='beforeInteractive'
            dangerouslySetInnerHTML={{
              __html: `(function initTheme() {
                var theme = localStorage.getItem('theme') || 'light';
                if (theme === 'dark') {
                  document.querySelector('html').setAttribute('data-theme', 'dark');
                }
              })();`
            }}
          />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
