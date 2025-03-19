'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';

interface Category {
  id: string;
  name: string;
}

interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  stock: number;
  image: string;
  category: Category | null;
}

export default function ProductsPage() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/admin/products');
      if (!response.ok) throw new Error('商品の取得に失敗しました');
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'エラーが発生しました');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('この商品を削除してもよろしいですか？')) return;

    try {
      const response = await fetch(`/api/admin/products/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('商品の削除に失敗しました');
      setProducts(products.filter(product => product.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'エラーが発生しました');
    }
  };

  if (loading) return <div className="p-4">読み込み中...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">商品管理</h1>
        <div className="space-x-4">
          <button
            onClick={() => router.push('/admin/products/new')}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            新規商品追加
          </button>
          <button
            onClick={() => signOut()}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            ログアウト
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product.id} className="border rounded-lg p-4 shadow-sm">
            <div className="aspect-square mb-4 relative">
              <img
                src={product.image}
                alt={product.name}
                className="object-cover w-full h-full rounded"
              />
            </div>
            <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
            <p className="text-gray-600 mb-2">{product.description}</p>
            <div className="flex justify-between items-center mb-2">
              <span className="text-lg font-bold">¥{product.price.toLocaleString()}</span>
              <span className="text-sm text-gray-500">在庫: {product.stock}</span>
            </div>
            {product.category && (
              <div className="mb-2">
                <span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                  {product.category.name}
                </span>
              </div>
            )}
            <div className="mt-4 flex space-x-2">
              <button
                onClick={() => router.push(`/admin/products/${product.id}/stock`)}
                className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
              >
                在庫履歴
              </button>
              <button
                onClick={() => router.push(`/admin/products/${product.id}/edit`)}
                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
              >
                編集
              </button>
              <button
                onClick={() => handleDelete(product.id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                削除
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 