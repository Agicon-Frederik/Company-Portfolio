import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import { Navigation } from './components/Navigation';
import { HomePage } from './pages/Home';
import { BlogPage } from './pages/Blog';
import { BlogPostPage } from './pages/BlogPost';
import { ProjectsPage } from './pages/Projects';
import { AdminPage } from './pages/Admin';
import { AdminLoginPage } from './pages/AdminLogin';
import { Footer } from './components/Footer';
import { AdminRoute } from './components/Admin/AdminRoute';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToHashElement() {
  const location = useLocation();

  useEffect(() => {
    // If we have a state with scrollTo, scroll to that element
    if (location.state && location.state.scrollTo) {
      const element = document.getElementById(location.state.scrollTo);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location]);

  return null;
}

export default function App() {
  return (
    <Router>
      <div className="flex min-h-screen flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <Navigation />
        <ScrollToHashElement />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<BlogPostPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/admin/login" element={<AdminLoginPage />} />
            <Route path="/admin/*" element={
              <AdminRoute>
                <AdminPage />
              </AdminRoute>
            } />
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
  );
}