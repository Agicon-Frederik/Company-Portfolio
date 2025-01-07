import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import { Navigation } from './components/Navigation';
import { HomePage } from './pages/Home';
import { BlogPage } from './pages/Blog';
import { ProjectsPage } from './pages/Projects';
import { AdminPage } from './pages/Admin';
import { AdminLoginPage } from './pages/AdminLogin';
import { AdminRoute } from './components/Admin/AdminRoute';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/admin" element={
            <AdminRoute>
              <AdminPage />
            </AdminRoute>
          } />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
       
        <Toaster position="top-right" />
      </div>
    </Router>
  );
}