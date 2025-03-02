import { useState, useEffect } from 'react';
import { Menu, X, Briefcase } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/auth';
import { ThemeToggle } from './ThemeToggle';

const publicNavItems = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/#about' },
  { name: 'Services', href: '/#services' },
  { name: 'Projects', href: '/projects' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contact', href: '/#contact' },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const isAdminPage = location.pathname.startsWith('/admin');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    ...publicNavItems,
    ...(isAuthenticated ? [{ name: 'Admin', href: '/admin' }] : []),
  ];

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    if (href.startsWith('/#')) {
      const elementId = href.substring(2);
      if (location.pathname === '/') {
        // If we're already on the home page, just scroll
        const element = document.getElementById(elementId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        // If we're on another page, navigate to home and then scroll
        navigate('/', { state: { scrollTo: elementId } });
      }
    }
  };

  return (
    <nav className={`fixed top-0 z-50 w-full transition-all duration-200 ${
      isScrolled || isAdminPage ? 'bg-white dark:bg-gray-900 shadow-md' : 'bg-transparent'
    }`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Briefcase className={`h-8 w-8 ${isAdminPage || isScrolled ? 'text-blue-600 dark:text-blue-400' : 'text-white'}`} />
              <span className={`text-xl font-bold ${isAdminPage || isScrolled ? 'text-gray-900 dark:text-white' : 'text-white'}`}>
                Quaxis
              </span>
            </Link>
          </div>

          {!isAdminPage && (
            <>
              <div className="hidden md:flex md:items-center md:space-x-4">
                <div className="flex items-baseline space-x-4">
                  {navItems.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={(e) => {
                        if (item.href.startsWith('/#')) {
                          e.preventDefault();
                          handleNavClick(item.href);
                        }
                      }}
                      className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                        isScrolled
                          ? 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                          : 'text-white/90 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
                <ThemeToggle />
              </div>

              <div className="md:hidden flex items-center space-x-2">
                <ThemeToggle />
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className={`inline-flex items-center justify-center rounded-md p-2 ${
                    isScrolled
                      ? 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                      : 'text-white hover:bg-white/10'
                  }`}
                >
                  {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
              </div>
            </>
          )}
          
          {isAdminPage && (
            <div className="flex items-center">
              <ThemeToggle />
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {isOpen && !isAdminPage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden"
          >
            <div className="space-y-1 px-2 pb-3 pt-2 backdrop-blur-md bg-white/90 dark:bg-gray-900/90">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={(e) => {
                    if (item.href.startsWith('/#')) {
                      e.preventDefault();
                      handleNavClick(item.href);
                    }
                  }}
                  className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}