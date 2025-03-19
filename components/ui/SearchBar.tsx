'use client';

import { Search, X } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

interface SearchBarProps {
  isScrolled?: boolean;
  className?: string;
}

export function SearchBar({ isScrolled, className }: SearchBarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // 検索バーが開いたら自動的にフォーカス
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      setIsOpen(false);
      setQuery('');
    }
  };

  return (
    <div className={className}>
      {/* モバイル用検索ボタン */}
      <button
        onClick={() => setIsOpen(true)}
        className={cn(
          'md:hidden p-2 rounded-lg transition-colors',
          isScrolled
            ? 'text-gray-600 hover:text-gray-900'
            : 'text-primary-100 hover:text-white'
        )}
      >
        <Search className="h-6 w-6" />
      </button>

      {/* デスクトップ用検索フォーム */}
      <form
        onSubmit={handleSearch}
        className={cn(
          'hidden md:flex items-center gap-2 relative',
          isScrolled
            ? 'text-gray-600'
            : 'text-primary-100'
        )}
      >
        <Search className="h-5 w-5 absolute left-3 pointer-events-none" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="商品を検索..."
          className={cn(
            'pl-10 pr-4 py-2 rounded-lg w-64 transition-colors',
            isScrolled
              ? 'bg-gray-100 focus:bg-white placeholder-gray-500'
              : 'bg-primary-600/50 focus:bg-primary-600 placeholder-primary-200'
          )}
        />
      </form>

      {/* モバイル用フルスクリーン検索UI */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-white">
          <div className="container mx-auto px-4">
            <div className="h-16 flex items-center justify-between">
              <form onSubmit={handleSearch} className="flex-1 flex items-center gap-2">
                <Search className="h-5 w-5 text-gray-400" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="商品を検索..."
                  className="flex-1 px-2 py-2 focus:outline-none text-lg"
                />
              </form>
              <button
                onClick={() => {
                  setIsOpen(false);
                  setQuery('');
                }}
                className="p-2 text-gray-500"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 