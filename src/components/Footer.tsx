import { Instagram, Linkedin } from "lucide-react";
import logo from "../images/logo.png";

const socialLinks = [
  { icon: Instagram, href: "#instagram", id: "instagram" },
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/in/frevant/",
    id: "linkedin",
  },
];

const quickLinks = [
  { name: "Credo", href: "/#about" },
  { name: "Diensten", href: "/#services" },
  { name: "Contact", href: "/#contact" },
];

export function Footer() {
  return (
    <footer className="bg-gray-50 text-green-900">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-4">
          <div className="col-span-2">
            <img src={logo} alt="Logo" />
          </div>

          <div>
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-green-900 transition-colors hover:text-green-600"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold">Follow Us</h3>
            <div className="mt-4 flex space-x-4">
              {socialLinks.map(({ icon: Icon, href, id }) => (
                <a
                  key={id}
                  href={href}
                  className="text-gray-400 transition-colors hover:text-white"
                >
                  <Icon className="h-6 w-6" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-800 pt-8 text-center">
          <p className="text-white-400">
            © {new Date().getFullYear()} Agicon. All rights reserved.
          </p>
          <a href="/privacybeleid">Privacybeleid</a>
        </div>
      </div>
    </footer>
  );
}
