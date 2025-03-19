'use client';

import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { useCart } from '@/contexts/CartContext';
import { MobileMenu } from './MobileMenu';
import { SearchBar } from './ui/SearchBar';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { totalItems } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-200',
        isScrolled
          ? 'bg-white/80 backdrop-blur-sm shadow-sm'
          : 'bg-primary-700'
      )}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* ロゴ */}
            <Link
              href="/"
              className={cn(
                'text-2xl font-bold transition-colors',
                isScrolled ? 'text-gray-900' : 'text-white hover:text-primary-100'
              )}
            >
              うちのうちわ
            </Link>

            {/* デスクトップナビゲーション */}
            <nav className="hidden md:flex space-x-8">
              <Link
                href="/products"
                className={cn(
                  'transition-colors',
                  isScrolled
                    ? 'text-gray-600 hover:text-gray-900'
                    : 'text-primary-100 hover:text-white'
                )}
              >
                商品一覧
              </Link>
              <Link
                href="/categories"
                className={cn(
                  'transition-colors',
                  isScrolled
                    ? 'text-gray-600 hover:text-gray-900'
                    : 'text-primary-100 hover:text-white'
                )}
              >
                カテゴリー
              </Link>
              <Link
                href="/about"
                className={cn(
                  'transition-colors',
                  isScrolled
                    ? 'text-gray-600 hover:text-gray-900'
                    : 'text-primary-100 hover:text-white'
                )}
              >
                会社概要
              </Link>
            </nav>

            <div className="flex items-center space-x-4">
              {/* 検索バー */}
              <SearchBar isScrolled={isScrolled} />

              {/* カートアイコン（デスクトップ） */}
              <Link href="/cart" className="relative hidden md:block">
                <ShoppingCart
                  className={cn(
                    'h-6 w-6 transition-colors',
                    isScrolled
                      ? 'text-gray-600 hover:text-gray-900'
                      : 'text-primary-100 hover:text-white'
                  )}
                />
                {totalItems > 0 && (
                  <span className={cn(
                    'absolute -top-2 -right-2 text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium',
                    isScrolled
                      ? 'bg-primary-700 text-white'
                      : 'bg-white text-primary-700'
                  )}>
                    {totalItems}
                  </span>
                )}
              </Link>

              {/* モバイルメニュー */}
              <MobileMenu isScrolled={isScrolled} />
            </div>
          </div>
        </div>
      </header>
      {/* ヘッダーの高さ分のスペースを確保 */}
      <div className="h-[72px]" />
    </>
  );
} 