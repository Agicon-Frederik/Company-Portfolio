interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchInput({ value, onChange }: SearchInputProps) {
  return (
    <div>
      <label htmlFor="search" className="sr-only">
        Search posts
      </label>
      <input
        type="search"
        id="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search posts..."
        className="block w-full rounded-md border border-gray-300 px-4 py-2 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
      />
    </div>
  );
}