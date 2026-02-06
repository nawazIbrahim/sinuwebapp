'use client';

import { useRouter } from 'next/navigation';

export function CustomFieldsHeader() {
  const router = useRouter();

  const handleBack = () => {
    router.push('/profile');
  };

  return (
    <header className="sticky top-0 z-50 bg-gray-200 border-b border-gray-200 shadow-sm px-4 h-16 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={handleBack}
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-300 transition-colors touch-manipulation z-10"
          aria-label="Go back"
        >
          <span className="material-symbols-outlined text-gray-800 pointer-events-none">arrow_back</span>
        </button>
        <h1 className="text-lg font-bold text-gray-900">Custom Fields</h1>
      </div>
    </header>
  );
}
