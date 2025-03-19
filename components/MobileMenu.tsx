'use client';

import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { useCart } from '@/contexts/CartContext';

interface MobileMenuProps {
  isScrolled: boolean;
}

export function MobileMenu({ isScrolled }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { totalItems } = useCart();

  // メニューが開いているときはスクロールを無効化
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const menuItems = [
    { href: '/products', label: '商品一覧' },
    { href: '/categories', label: 'カテゴリー' },
    { href: '/about', label: '会社概要' },
    { href: '/cart', label: 'カート', badge: totalItems > 0 ? totalItems : undefined },
  ];

  return (
    <div className="md:hidden">
      {/* メニューボタン */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'p-2 rounded-lg transition-colors',
          isScrolled
            ? 'text-gray-600 hover:text-gray-900'
            : 'text-primary-100 hover:text-white'
        )}
      >
        <span className="sr-only">メニュー</span>
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <Menu className="h-6 w-6" />
        )}
      </button>

      {/* オーバーレイ */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setIsOpen(false)} />
      )}

      {/* メニュー本体 */}
      <div
        className={cn(
          'fixed top-0 right-0 bottom-0 w-64 bg-white z-50 transform transition-transform duration-300 ease-in-out',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className="flex flex-col h-full">
          {/* メニューヘッダー */}
          <div className="flex items-center justify-between p-4 border-b">
            <span className="text-lg font-semibold text-gray-900">メニュー</span>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 text-gray-500 hover:text-gray-700"
            >
              <span className="sr-only">閉じる</span>
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* メニューアイテム */}
          <nav className="flex-1 overflow-y-auto">
            <ul className="py-2">
              {menuItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="flex items-center justify-between px-4 py-3 text-gray-700 hover:bg-gray-50"
                    onClick={() => setIsOpen(false)}
                  >
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className="bg-primary-700 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
} 