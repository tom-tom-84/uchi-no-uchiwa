'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface OrderItem {
  id: string;
  productId: string;
  product: {
    name: string;
    price: number;
    image: string;
  };
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  userId: string;
  total: number;
  status: string;
  createdAt: string;
  items: OrderItem[];
  user: {
    name: string;
    email: string;
    address: string;
  };
}

export default function OrderDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchOrder();
  }, [params.id]);

  const fetchOrder = async () => {
    try {
      const response = await fetch(`/api/admin/orders/${params.id}`);
      if (!response.ok) throw new Error('注文の取得に失敗しました');
      const data = await response.json();
      setOrder(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'エラーが発生しました');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (newStatus: string) => {
    if (!order) return;

    try {
      const response = await fetch(`/api/admin/orders/${order.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) throw new Error('注文ステータスの更新に失敗しました');

      setOrder({ ...order, status: newStatus });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'エラーが発生しました');
    }
  };

  if (loading) return <div className="p-4">読み込み中...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;
  if (!order) return <div className="p-4">注文が見つかりません</div>;

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">注文詳細</h1>
        <button
          onClick={() => router.push('/admin/orders')}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          一覧に戻る
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-lg font-medium">注文情報</h2>
              <p className="text-sm text-gray-500">注文ID: {order.id}</p>
              <p className="text-sm text-gray-500">
                注文日時: {new Date(order.createdAt).toLocaleString()}
              </p>
            </div>
            <div className="text-right">
              <p className="text-lg font-medium">合計金額: ¥{order.total.toLocaleString()}</p>
              <select
                value={order.status}
                onChange={(e) => handleStatusChange(e.target.value)}
                className="mt-2 text-sm rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="pending">保留中</option>
                <option value="paid">支払い済み</option>
                <option value="shipped">発送済み</option>
                <option value="delivered">配送完了</option>
                <option value="cancelled">キャンセル</option>
              </select>
            </div>
          </div>
        </div>

        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium mb-4">お客様情報</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">お名前</p>
              <p className="font-medium">{order.user.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">メールアドレス</p>
              <p className="font-medium">{order.user.email}</p>
            </div>
            <div className="col-span-2">
              <p className="text-sm text-gray-500">配送先住所</p>
              <p className="font-medium">{order.user.address}</p>
            </div>
          </div>
        </div>

        <div className="px-6 py-4">
          <h3 className="text-lg font-medium mb-4">注文商品</h3>
          <div className="space-y-4">
            {order.items.map((item) => (
              <div key={item.id} className="flex items-center space-x-4">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-16 h-16 object-cover rounded"
                />
                <div className="flex-1">
                  <p className="font-medium">{item.product.name}</p>
                  <p className="text-sm text-gray-500">
                    数量: {item.quantity} × ¥{item.price.toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 