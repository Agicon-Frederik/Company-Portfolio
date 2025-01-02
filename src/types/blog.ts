export interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  published: boolean;
  published_at: string | null;
  author_id: string;
  created_at: string;
  updated_at: string;
  categories?: Category[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface PostFilters {
  category?: string;
  search?: string;
  page: number;
  perPage: number;
}