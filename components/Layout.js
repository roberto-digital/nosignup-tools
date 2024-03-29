import NavSearchMenu from "../elements/NavSearchMenu";
import Footer from "../components/Footer";

export default function Layout({ children }) {
  return (
    <>
      <NavSearchMenu />
      <main className="container mx-auto flex-1 lg:pl-12 py-6 px-6 lg:px-0 justify-center align-center">
        {children}
      </main>
      <script
        async
        type="text/javascript"
        src="//cdn.carbonads.com/carbon.js?serve=CEAIV23N&placement=wwwnosignuptools"
        id="_carbonads_js"
      ></script>
      <Footer />
    </>
  );
}
