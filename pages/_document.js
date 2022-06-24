import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
  return (
    <Html>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;700;900&display=swap"
          rel="stylesheet"
        />
        <meta
          name="google-site-verification"
          content="2TMhWdzAQnM28WJEhoGRCh3daVck9lhUSIYbiCAdvq0"
        />
        <Script
          async
          src="//cdn.carbonads.com/carbon.js?serve=CEAIV23N&placement=wwwnosignuptools"
          id="_carbonads_js"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
