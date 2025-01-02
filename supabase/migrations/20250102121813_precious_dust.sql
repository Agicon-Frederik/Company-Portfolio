/*
  # Create admin role and policies

  1. Changes
    - Add admin role to auth schema
    - Create admin access policies for posts and categories
*/

-- Create admin role
CREATE TYPE auth.role AS ENUM ('admin', 'user');

-- Add role column to auth.users
ALTER TABLE auth.users ADD COLUMN IF NOT EXISTS role auth.role DEFAULT 'user';

-- Set your user as admin (replace with your email)
UPDATE auth.users 
SET role = 'admin' 
WHERE email = 'vaibhavkulshrestha55@gmail.com';

-- Update policies to check for admin role
CREATE POLICY "Admins can do everything" 
ON posts
USING (
  auth.jwt() ->> 'role' = 'admin'
);

CREATE POLICY "Admins can manage categories" 
ON categories
USING (
  auth.jwt() ->> 'role' = 'admin'
);