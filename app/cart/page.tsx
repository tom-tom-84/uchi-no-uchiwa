'use client';

import { useState } from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/Button';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { getStripe } from '@/lib/stripe';

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice } = useCart();
  const [isLoading, setIsLoading] = useState(false);

  const breadcrumbs = [
    { label: 'カート' }
  ];

  const handleCheckout = async () => {
    try {
      setIsLoading(true);

      // チェックアウトセッションを作成
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ items }),
      });

      const { sessionId, error } = await response.json();

      if (error) {
        console.error('Checkout error:', error);
        alert('決済処理中にエラーが発生しました。');
        return;
      }

      // Stripeチェックアウトにリダイレクト
      const stripe = await getStripe();
      const { error: stripeError } = await stripe!.redirectToCheckout({ sessionId });

      if (stripeError) {
        console.error('Stripe error:', stripeError);
        alert('決済処理中にエラーが発生しました。');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('決済処理中にエラーが発生しました。');
    } finally {
      setIsLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs items={breadcrumbs} />
        <div className="mt-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">カートは空です</h1>
          <p className="text-gray-600 mb-8">商品をカートに追加してください。</p>
          <Button asChild>
            <a href="/products">商品一覧へ</a>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs items={breadcrumbs} />
      
      <div className="mt-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">ショッピングカート</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* カート商品リスト */}
          <div className="lg:col-span-8">
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm"
                >
                  {/* 商品画像 */}
                  <div className="w-24 h-24 relative rounded-md overflow-hidden flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="object-cover w-full h-full"
                    />
                  </div>

                  {/* 商品情報 */}
                  <div className="flex-grow">
                    <h3 className="font-medium text-gray-900">{item.name}</h3>
                    <p className="text-primary-600">¥{item.price.toLocaleString()}</p>
                  </div>

                  {/* 数量調整 */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-1 rounded-md hover:bg-gray-100"
                      disabled={isLoading}
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-1 rounded-md hover:bg-gray-100"
                      disabled={isLoading}
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>

                  {/* 小計 */}
                  <div className="w-24 text-right">
                    <p className="font-medium text-gray-900">
                      ¥{(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>

                  {/* 削除ボタン */}
                  <button
                    onClick={() => removeItem(item.id)}
                    className="p-2 text-gray-400 hover:text-red-500"
                    disabled={isLoading}
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* 注文サマリー */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">注文サマリー</h2>
              <div className="space-y-4">
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <p>小計</p>
                  <p>¥{totalPrice.toLocaleString()}</p>
                </div>
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <p>送料</p>
                  <p>¥0</p>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between text-lg font-semibold">
                    <p>合計</p>
                    <p>¥{totalPrice.toLocaleString()}</p>
                  </div>
                </div>
                <Button
                  className="w-full"
                  onClick={handleCheckout}
                  disabled={isLoading}
                >
                  {isLoading ? '処理中...' : 'レジに進む'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 