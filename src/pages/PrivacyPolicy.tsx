import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { PrivacyPolicy } from "@/components/privacypolicy";

export function PrivacyPage() {
  const location = useLocation();

  useEffect(() => {
    // Check if there's a hash in the URL
    if (location.hash) {
      const id = location.hash.substring(1);
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, [location]);

  return (
    <main>
      <PrivacyPolicy />
    </main>
  );
}
