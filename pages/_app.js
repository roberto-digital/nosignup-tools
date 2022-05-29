import "../styles/globals.css";
import { ToolsProvider } from "../contexts/ToolsContext";
import Layout from "../components/Layout";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

function MyApp({ Component, pageProps }) {
  return (
    <ToolsProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ToolsProvider>
  );
}

export default MyApp;
