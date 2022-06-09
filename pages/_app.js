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
          data-name="BMC-Widget"
          data-cfasync="false"
          src="https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js"
          data-id="cpleiser"
          data-description="Support me on Buy me a coffee!"
          data-message=""
          data-color="#FFDD00"
          data-position="Right"
          data-x_margin="18"
          data-y_margin="18"
        />
        <Script src="https://tally.so/widgets/embed.js" />
      </ToolsProvider>
    </PlausibleProvider>
  );
}

export default MyApp;
