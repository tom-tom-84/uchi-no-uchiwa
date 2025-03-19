'use client';

import { Button } from '@/components/ui/Button';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { useCart } from '@/contexts/CartContext';

interface ProductDetails {
  size: string;
  material: string;
  weight: string;
  features: string[];
}

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  details: ProductDetails;
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const { addItem } = useCart();
  
  // 商品データ（実際のアプリケーションではAPIやデータベースから取得）
  const product: Product = {
    id: params.id,
    name: 'シンプルうちわ',
    price: 1200,
    description: '伝統的な日本の技術と現代的なデザインを組み合わせた、シンプルで美しいうちわです。',
    image: '/products/simple-uchiwa.jpg',
    details: {
      size: '23cm × 35cm',
      material: '竹、和紙',
      weight: '約50g',
      features: [
        '伝統的な製法で作られた竹骨',
        '高品質な和紙使用',
        '耐久性に優れた仕上げ',
        '持ちやすい握り'
      ]
    }
  };

  const breadcrumbs = [
    { label: '商品一覧', href: '/products' },
    { label: product.name }
  ];

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs items={breadcrumbs} />
      
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* 商品画像 */}
        <div className="aspect-square relative overflow-hidden rounded-lg bg-gray-100">
          <img
            src={product.image}
            alt={product.name}
            className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* 商品情報 */}
        <div className="space-y-6">
          <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
          <p className="text-2xl font-semibold text-primary-600">¥{product.price.toLocaleString()}</p>
          <p className="text-gray-600">{product.description}</p>

          <div className="border-t border-gray-200 pt-6">
            <h2 className="text-lg font-semibold mb-4">商品詳細</h2>
            <dl className="space-y-4">
              <div>
                <dt className="font-medium text-gray-900">サイズ</dt>
                <dd className="text-gray-600">{product.details.size}</dd>
              </div>
              <div>
                <dt className="font-medium text-gray-900">素材</dt>
                <dd className="text-gray-600">{product.details.material}</dd>
              </div>
              <div>
                <dt className="font-medium text-gray-900">重量</dt>
                <dd className="text-gray-600">{product.details.weight}</dd>
              </div>
              <div>
                <dt className="font-medium text-gray-900">特徴</dt>
                <dd className="text-gray-600">
                  <ul className="list-disc list-inside space-y-1">
                    {product.details.features.map((feature: string, index: number) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </dd>
              </div>
            </dl>
          </div>

          <Button
            size="lg"
            className="w-full md:w-auto"
            onClick={handleAddToCart}
          >
            カートに追加
          </Button>
        </div>
      </div>
    </div>
  );
} 