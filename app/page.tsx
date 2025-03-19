import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { SectionTitle } from '@/components/ui/SectionTitle';

// サンプルデータ
const featuredProducts = [
  {
    id: 1,
    title: 'シンプルうちわ',
    price: 1200,
    imageUrl: 'https://images.unsplash.com/photo-1624374053855-39a5a1a41402?q=80&w=500',
    description: '持ちやすい軽量デザイン。暑い夏に最適な一品です。',
  },
  {
    id: 2,
    title: '和風うちわ',
    price: 1800,
    imageUrl: 'https://images.unsplash.com/photo-1624374053855-39a5a1a41402?q=80&w=500',
    description: '伝統的な和柄デザイン。贈り物にも最適です。',
  },
  {
    id: 3,
    title: 'アーティストうちわ',
    price: 2200,
    imageUrl: 'https://images.unsplash.com/photo-1624374053855-39a5a1a41402?q=80&w=500',
    description: '人気アーティストとコラボレーションした限定デザイン。',
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* ヒーローセクション */}
      <section className="bg-primary-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4 sm:text-5xl">
            オリジナルうちわ専門店
          </h1>
          <p className="text-xl text-primary-100 mb-8">
            あなたの思い出を、うちわに刻みましょう
          </p>
          <Button
            variant="outline"
            size="lg"
            className="bg-white text-primary-700 hover:bg-primary-50"
          >
            商品を見る
          </Button>
        </div>
      </section>

      {/* 特徴セクション */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <SectionTitle
            title="うちのうちわの特徴"
            subtitle="高品質な素材と丁寧な製法で、末永くご愛用いただけます"
            className="mb-12"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4">高品質な印刷</h3>
              <p className="text-gray-600">
                最新の印刷技術で、鮮やかな色と細かなディテールを再現します。
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4">豊富なデザイン</h3>
              <p className="text-gray-600">
                テンプレートから完全オリジナルまで、お好みのデザインを選べます。
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4">迅速な納期</h3>
              <p className="text-gray-600">
                最短3日でお届け。大切なイベントに間に合います。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* おすすめ商品セクション */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <SectionTitle
            title="おすすめ商品"
            subtitle="人気の商品をピックアップしてご紹介"
            className="mb-12"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <Card key={product.id} {...product} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
} 