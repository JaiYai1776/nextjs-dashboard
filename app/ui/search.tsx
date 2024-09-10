'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { 
  useSearchParams,
  usePathname,
  useRouter
 } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  
  // Debounced search callback, avoids immediate triggering of search with each keypress
  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');
    
    if (term) {
      params.set('query', term); // Set query parameter if a term exists
    } else {
      params.delete('query'); // Remove query parameter if empty
    }

    replace(`${pathname}?${params.toString()}`); // Update URL without full reload
  }, 300); // 300ms debounce delay
  
  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        onChange={(e) => handleSearch(e.target.value)} // Trigger debounced search
        defaultValue={searchParams.get('query') || ''} // Pre-fill with the query if present
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
