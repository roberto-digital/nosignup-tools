import "../styles/globals.css";
import { ToolsProvider } from "../contexts/ToolsContext";
import Layout from "../components/Layout";

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
