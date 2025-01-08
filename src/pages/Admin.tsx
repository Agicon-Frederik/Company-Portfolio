import { useState } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { signOut } from '@/lib/auth';
import { AdminBlogList } from '@/components/Admin/AdminBlogList';
import { AdminProjectList } from '@/components/Admin/AdminProjectList';
import { Button } from '@/components/ui/Button';

export function AdminPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSignOut = async () => {
    try {
      setLoading(true);
      await signOut();
      navigate('/admin/login');
    } catch (error) {
      console.error('Failed to sign out:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <Button onClick={handleSignOut} isLoading={loading} variant="outline">
            Sign Out
          </Button>
        </div>

        <div className="mb-8">
          <nav className="flex space-x-4">
            <Link
              to="/admin"
              className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
              end
            >
              Overview
            </Link>
            <Link
              to="/admin/blogs"
              className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
            >
              Blogs
            </Link>
            <Link
              to="/admin/projects"
              className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
            >
              Projects
            </Link>
          </nav>
        </div>

        <Routes>
          <Route index element={<AdminOverview />} />
          <Route path="blogs/*" element={<AdminBlogList />} />
          <Route path="projects/*" element={<AdminProjectList />} />
        </Routes>
      </div>
    </div>
  );
}

function AdminOverview() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <div className="rounded-lg bg-white p-6 shadow-lg">
        <h3 className="text-lg font-medium text-gray-900">Total Blogs</h3>
        <p className="mt-2 text-3xl font-bold text-blue-600">3</p>
      </div>
      <div className="rounded-lg bg-white p-6 shadow-lg">
        <h3 className="text-lg font-medium text-gray-900">Total Projects</h3>
        <p className="mt-2 text-3xl font-bold text-blue-600">3</p>
      </div>
      <div className="rounded-lg bg-white p-6 shadow-lg">
        <h3 className="text-lg font-medium text-gray-900">Published Posts</h3>
        <p className="mt-2 text-3xl font-bold text-blue-600">3</p>
      </div>
    </div>
  );
}