import "@/styles/globals.css";
import Navigation from "@/components/Layout/navigation";
import Footer from "@/components/Layout/footer"; 

export default function App({ Component, pageProps }) {
  return (
    <Navigation>
      <Component {...pageProps} />
      <Footer />
    </Navigation>
  );
}
