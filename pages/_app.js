import "../styles/globals.css";
import { ToolsProvider } from "../contexts/ToolsContext";

function MyApp({ Component, pageProps }) {
  return (
    <ToolsProvider>
      <Component {...pageProps} />
    </ToolsProvider>
  );
}

export default MyApp;
