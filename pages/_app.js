import Script from "next/script";

import "../styles/globals.css";
import PlausibleProvider from "next-plausible";
import { ToolsProvider } from "../contexts/ToolsContext";
import Layout from "../components/Layout";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

function MyApp({ Component, pageProps }) {
  return (
    <PlausibleProvider domain="nosignup.tools">
      <ToolsProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
        <Script
          src="https://zink.tips/zwc.js?rid=6295f658be9816218b32a427&c=purple"
          strategy="lazyOnload"
        />
      </ToolsProvider>
    </PlausibleProvider>
  );
}

export default MyApp;
