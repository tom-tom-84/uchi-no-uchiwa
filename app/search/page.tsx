'use client';

import { useSearchParams } from 'next/navigation';
import { Card } from '@/components/ui/Card';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

// 商品データ（実際のアプリケーションではAPIやデータベースから取得）
const products = [
  {
    id: '1',
    name: 'シンプルうちわ',
    price: 1200,
    description: '伝統的な日本の技術と現代的なデザインを組み合わせた、シンプルで美しいうちわです。',
    image: '/products/simple-uchiwa.jpg',
    category: '伝統的'
  },
  {
    id: '2',
    name: '和風うちわ',
    price: 1500,
    description: '日本の伝統的な模様をあしらった、趣のある和風うちわです。',
    image: '/products/japanese-uchiwa.jpg',
    category: '伝統的'
  },
  {
    id: '3',
    name: 'アーティストうちわ',
    price: 2000,
    description: '現代アーティストとのコラボレーションによる、アート作品のようなうちわです。',
    image: '/products/artist-uchiwa.jpg',
    category: 'アート'
  },
  {
    id: '4',
    name: 'モダンうちわ',
    price: 1800,
    description: '現代的なデザインと機能性を追求した、スタイリッシュなうちわです。',
    image: '/products/modern-uchiwa.jpg',
    category: 'モダン'
  },
  {
    id: '5',
    name: '季節の花うちわ',
    price: 1300,
    description: '四季折々の花々をモチーフにした、華やかなうちわです。',
    image: '/products/flower-uchiwa.jpg',
    category: '伝統的'
  },
  {
    id: '6',
    name: 'ポップうちわ',
    price: 1600,
    description: 'カラフルでポップなデザインの、楽しい気分になれるうちわです。',
    image: '/products/pop-uchiwa.jpg',
    category: 'アート'
  }
];

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';

  // 検索クエリに基づいて商品をフィルタリング
  const searchResults = products.filter(product => {
    const searchText = query.toLowerCase();
    return (
      product.name.toLowerCase().includes(searchText) ||
      product.description.toLowerCase().includes(searchText) ||
      product.category.toLowerCase().includes(searchText)
    );
  });

  const breadcrumbs = [
    { label: '検索結果' }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs items={breadcrumbs} />
      
      <div className="mt-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">検索結果</h1>
        <p className="text-gray-600 mb-8">
          「{query}」の検索結果: {searchResults.length}件
        </p>

        {/* 検索結果グリッド */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {searchResults.map(product => (
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

        {/* 検索結果が0件の場合 */}
        {searchResults.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">
              検索条件に一致する商品が見つかりませんでした。<br />
              別のキーワードで検索してください。
            </p>
          </div>
        )}
      </div>
    </div>
  );
} 