import { supabase } from './supabase';
import type { Post, Category, PostFilters } from '@/types/blog';

export async function getPosts({ category, search, page, perPage }: PostFilters) {
  let query = supabase
    .from('posts')
    .select(`
      *,
      categories (
        id,
        name,
        slug
      )
    `)
    .eq('published', true)
    .order('published_at', { ascending: false });

  if (category) {
    query = query.contains('categories', [{ slug: category }]);
  }

  if (search) {
    query = query.or(`title.ilike.%${search}%,content.ilike.%${search}%`);
  }

  const from = (page - 1) * perPage;
  query = query.range(from, from + perPage - 1);

  const { data, error, count } = await query;

  if (error) throw error;

  return {
    posts: data as Post[],
    total: count || 0,
  };
}

export async function getCategories() {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('name');

  if (error) throw error;

  return data as Category[];
}

export async function createPost(post: Omit<Post, 'id' | 'created_at' | 'updated_at'>) {
  const { data, error } = await supabase
    .from('posts')
    .insert(post)
    .select()
    .single();

  if (error) throw error;

  return data as Post;
}

export async function updatePost(id: string, post: Partial<Post>) {
  const { data, error } = await supabase
    .from('posts')
    .update({ ...post, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;

  return data as Post;
}

export async function deletePost(id: string) {
  const { error } = await supabase
    .from('posts')
    .delete()
    .eq('id', id);

  if (error) throw error;
}