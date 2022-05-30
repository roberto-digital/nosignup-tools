import NavSearchMenu from "../elements/NavSearchMenu";
import Footer from "../components/Footer";
import NewsletterForm from "./NewsletterForm";
import Head from "next/head";

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>No Signup Tools</title>
        <meta property="og:title" content="No Signup Tools" key="title" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        ></meta>

        <meta
          name="description"
          content="Nosignup.tools is a curated list of free web apps that don't require registration or login"
        />

        <meta property="og:url" content="https://www.nosignup.tools/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="No Signup Tools" />
        <meta
          property="og:description"
          content="Nosignup.tools is a curated list of free web apps that don't require registration or login"
        />
        <meta
          property="og:image"
          content="./public/images/nosignup_tools.jpeg"
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="nosignup.tools" />
        <meta property="twitter:url" content="https://www.nosignup.tools/" />
        <meta name="twitter:title" content="No Signup Tools" />
        <meta
          name="twitter:description"
          content="Nosignup.tools is a curated list of free web apps that don't require registration or login"
        />
        <meta
          name="twitter:image"
          content="./public/images/nosignup_tools.jpeg"
        />
      </Head>
      <NavSearchMenu />
      <main className="flex-1 lg:pl-12 py-6 px-6 lg:px-0 justify-center align-center">
        {children}
      </main>

      <NewsletterForm />
      <Footer />
    </>
  );
}
