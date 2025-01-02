/*
  # Blog System Schema

  1. New Tables
    - `posts`
      - `id` (uuid, primary key)
      - `title` (text)
      - `slug` (text, unique)
      - `content` (text)
      - `excerpt` (text)
      - `published` (boolean)
      - `published_at` (timestamp)
      - `author_id` (uuid, references auth.users)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `categories`
      - `id` (uuid, primary key)
      - `name` (text, unique)
      - `slug` (text, unique)
    
    - `post_categories`
      - `post_id` (uuid, references posts)
      - `category_id` (uuid, references categories)

  2. Security
    - Enable RLS on all tables
    - Public read access for published posts
    - Authenticated write access for admin users
*/

-- Posts table
CREATE TABLE IF NOT EXISTS posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  content text NOT NULL,
  excerpt text,
  published boolean DEFAULT false,
  published_at timestamptz,
  author_id uuid REFERENCES auth.users NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Categories table
CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  slug text UNIQUE NOT NULL
);

-- Post categories junction table
CREATE TABLE IF NOT EXISTS post_categories (
  post_id uuid REFERENCES posts ON DELETE CASCADE,
  category_id uuid REFERENCES categories ON DELETE CASCADE,
  PRIMARY KEY (post_id, category_id)
);

-- Enable RLS
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE post_categories ENABLE ROW LEVEL SECURITY;

-- Policies for posts
CREATE POLICY "Public can view published posts"
  ON posts
  FOR SELECT
  USING (published = true);

CREATE POLICY "Admin users can manage posts"
  ON posts
  USING (auth.uid() = author_id);

-- Policies for categories
CREATE POLICY "Public can view categories"
  ON categories
  FOR SELECT
  TO PUBLIC;

CREATE POLICY "Admin users can manage categories"
  ON categories
  USING (EXISTS (
    SELECT 1 FROM posts WHERE posts.author_id = auth.uid()
  ));

-- Policies for post_categories
CREATE POLICY "Public can view post categories"
  ON post_categories
  FOR SELECT
  TO PUBLIC;

CREATE POLICY "Admin users can manage post categories"
  ON post_categories
  USING (EXISTS (
    SELECT 1 FROM posts WHERE posts.id = post_categories.post_id AND posts.author_id = auth.uid()
  ));