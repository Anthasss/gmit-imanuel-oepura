import "@/styles/globals.css";
import Navigation from "@/components/layout/navigation";
import Footer from "@/components/layout/footer"; 

export default function App({ Component, pageProps }) {
  return (
    <Navigation>
      <Component {...pageProps} />
      <Footer />
    </Navigation>
  );
}
