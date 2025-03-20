'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: {
    name: string;
  } | null;
}

const categories = ['すべて', '伝統的', 'モダン', 'アート'];

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState('すべて');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/admin/products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('商品の取得に失敗しました:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = selectedCategory === 'すべて'
    ? products
    : products.filter(product => product.category?.name === selectedCategory);

  const breadcrumbs = [
    { label: '商品一覧' }
  ];

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-gray-600">読み込み中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs items={breadcrumbs} />
      
      <div className="mt-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">商品一覧</h1>

        {/* カテゴリーフィルター */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'primary' : 'outline'}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* 商品グリッド */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map(product => (
            <Card
              key={product.id}
              id={product.id}
              title={product.name}
              price={product.price}
              imageUrl={product.image}
              description={product.description}
            />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">
              該当する商品が見つかりませんでした。
            </p>
          </div>
        )}
      </div>
    </div>
  );
} 