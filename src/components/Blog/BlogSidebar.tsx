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
      <div className="rounded-lg bg-white dark:bg-gray-800 p-6 shadow-lg">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Categories</h2>
        <ul className="mt-4 space-y-2">
          <li>
            <button
              className={`w-full text-left ${
                !selectedCategory ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400'
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
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-gray-600 dark:text-gray-400'
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