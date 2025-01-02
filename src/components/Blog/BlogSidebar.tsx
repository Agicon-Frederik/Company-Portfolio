import type { Category } from '@/types/blog';

interface BlogSidebarProps {
  categories: Category[];
  selectedCategory?: string;
  onCategorySelect: (category?: string) => void;
}

export function BlogSidebar({
  categories,
  selectedCategory,
  onCategorySelect,
}: BlogSidebarProps) {
  return (
    <aside>
      <div className="rounded-lg bg-white p-6 shadow-lg">
        <h2 className="text-lg font-semibold text-gray-900">Categories</h2>
        <ul className="mt-4 space-y-2">
          <li>
            <button
              className={`w-full text-left ${
                !selectedCategory ? 'text-blue-600' : 'text-gray-600'
              }`}
              onClick={() => onCategorySelect(undefined)}
            >
              All Posts
            </button>
          </li>
          {categories.map((category) => (
            <li key={category.id}>
              <button
                className={`w-full text-left ${
                  selectedCategory === category.slug
                    ? 'text-blue-600'
                    : 'text-gray-600'
                }`}
                onClick={() => onCategorySelect(category.slug)}
              >
                {category.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}