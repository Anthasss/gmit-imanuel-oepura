import "@/styles/globals.css";
import Navigation from "@/components/layout/navigation";
import Footer from "@/components/layout/footer"; 
import { AuthProvider } from "@/context/AuthContext";

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Navigation>
        <Component {...pageProps} />
        <Footer />
      </Navigation>
    </AuthProvider>
  );
}
