interface PaginationProps {
  page: number;
  total: number;
  perPage: number;
  onChange: (page: number) => void;
  className?: string;
}

export function Pagination({
  page,
  total,
  perPage,
  onChange,
  className = '',
}: PaginationProps) {
  const totalPages = Math.ceil(total / perPage);

  if (totalPages <= 1) return null;

  return (
    <nav className={`flex justify-center ${className}`}>
      <ul className="flex space-x-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
          <li key={pageNum}>
            <button
              onClick={() => onChange(pageNum)}
              className={`h-8 w-8 rounded-md ${
                pageNum === page
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-900 hover:bg-gray-50'
              }`}
            >
              {pageNum}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}