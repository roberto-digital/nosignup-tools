import NavSearchMenu from "../elements/NavSearchMenu";
import Footer from "../components/Footer";
import Head from "next/head";

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>No Signup Tools</title>
        <meta property="og:title" content="No Signup Tools" key="title" />
        <meta
          name="description"
          content="Nosignup.tools is a curated list of free web apps that don't require registration or login"
        />
      </Head>
      <NavSearchMenu />
      <main className="flex-1 lg:pl-12 py-6 px-6 lg:px-0 justify-center align-center">
        {children}
      </main>
      <Footer />
    </>
  );
}
