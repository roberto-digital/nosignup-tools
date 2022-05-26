import "../styles/globals.css";
import { ToolsProvider } from "../contexts/ToolsContext";
import Layout from "../components/layout";

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
