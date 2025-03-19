'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { useCart } from '@/contexts/CartContext';

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams();
  const { clearCart } = useCart();
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    if (sessionId) {
      clearCart();
    }
  }, [sessionId, clearCart]);

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-8">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          ご注文ありがとうございます！
        </h1>
        <p className="text-gray-600 mb-8">
          ご注文の確認メールをお送りしました。<br />
          商品の発送準備が整い次第、発送のご連絡をさせていただきます。
        </p>

        <div className="space-x-4">
          <Button asChild variant="outline">
            <a href="/products">商品一覧に戻る</a>
          </Button>
          <Button asChild>
            <a href="/">トップページへ</a>
          </Button>
        </div>
      </div>
    </div>
  );
} 