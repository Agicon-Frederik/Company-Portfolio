import { useState, useEffect } from "react";
import { DoorOpen } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const publicNavItems = [
  { name: "Home", href: "/#home" },
  { name: "Credo", href: "/#about" },
  { name: "Diensten", href: "/#services" },
  { name: "Contact", href: "/#contact" },
  { name: "Gratis Audit", href: "https://tally.so/r/wQXkyp" },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [...publicNavItems];

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    if (href.startsWith("/#")) {
      const elementId = href.substring(2);
      if (location.pathname === "/") {
        const element = document.getElementById(elementId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        navigate("/", { state: { scrollTo: elementId } });
      }
    }
  };

  return (
    <nav
      className={`fixed top-0 z-50 w-full transition-all duration-200 ${
        isScrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <DoorOpen
                className={`h-8 w-8 ${
                  isScrolled ? "text-green-600" : "text-white"
                }`}
              />
              <span
                className={`text-3xl font-bold ${
                  isScrolled ? "text-gray-900" : "text-green-600"
                }`}
              >
                Frederik Vantroys
              </span>
            </Link>
          </div>

          <div className="flex md:hidden justify-end p-4">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-3xl focus:outline-none"
            >
              ☰
            </button>
          </div>

          {isOpen && (
            <div className="flex flex-col md:hidden px-4 space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={(e) => {
                    if (item.href.startsWith("/#")) {
                      e.preventDefault();
                      handleNavClick(item.href);
                    }
                    setIsOpen(false);
                  }}
                  className={`text-xl font-bold transition-colors border-b-2 border-transparent hover:border-current ${
                    isScrolled ? "text-white" : "text-white"
                  } ${
                    location.pathname === item.href ||
                    location.hash === item.href
                      ? "border-current"
                      : ""
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          )}

          <div className="hidden md:flex md:items-center md:space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={(e) => {
                  if (item.href.startsWith("/#")) {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }
                }}
                className={`text-3xl font-extrabold transition-colors border-b-2 border-transparent hover:border-current ${
                  isScrolled ? "text-green-600" : "text-green-900"
                } ${
                  location.pathname === item.href || location.hash === item.href
                    ? "border-current"
                    : ""
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
