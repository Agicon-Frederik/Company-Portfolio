import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { Toaster } from "sonner";
import { Navigation } from "./components/Navigation";
import { HomePage } from "./pages/Home";
import { Footer } from "./components/Footer";
import { useEffect } from "react";
import { PrivacyPage } from "./pages/PrivacyPolicy";
import CookieConsent from "react-cookie-consent";

function ScrollToHashElement() {
  const location = useLocation();

  useEffect(() => {
    // If we have a state with scrollTo, scroll to that element
    if (location.state && location.state.scrollTo) {
      const element = document.getElementById(location.state.scrollTo);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, [location]);

  return null;
}

export default function App() {
  return (
    <>
      <CookieConsent
        location="bottom"
        buttonText="Akkoord"
        cookieName="cookieConsent"
        style={{ background: "#2B373B" }}
        buttonStyle={{ color: "#fff", background: "#22c55e", fontSize: "13px" }}
        expires={150}
      >
        Deze website gebruikt cookies om de gebruikerservaring te verbeteren.{" "}
        <a href="/privacy" className="underline text-green-400 ml-1">
          Lees meer
        </a>
      </CookieConsent>
      <Router>
        <div className="flex min-h-screen flex-col bg-white dark:bg-green-900 text-gray-900 dark:text-gray-100">
          <Navigation />
          <ScrollToHashElement />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/privacybeleid" element={<PrivacyPage />} />

              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Routes>
            <Route path="/admin/*" element={null} />
            <Route path="*" element={<Footer />} />
          </Routes>
          <Toaster position="top-right" />
        </div>
      </Router>
    </>
  );
}
