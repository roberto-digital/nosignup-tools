import NavSearchMenu from "../elements/NavSearchMenu";
import Footer from "../components/Footer";
import NewsletterForm from "./NewsletterForm";

export default function Layout({ children }) {
  return (
    <>
      <NavSearchMenu />
      <main className="flex-1 lg:pl-12 py-6 px-6 lg:px-0 justify-center align-center">
        {children}
      </main>

      <NewsletterForm />
      <Footer />
    </>
  );
}
