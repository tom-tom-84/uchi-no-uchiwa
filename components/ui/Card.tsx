import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from './Button';

interface CardProps {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  description?: string;
  className?: string;
}

export function Card({ id, title, price, imageUrl, description, className }: CardProps) {
  return (
    <div className={cn(
      'bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200 transition-shadow hover:shadow-md',
      className
    )}>
      {/* 商品画像とリンク */}
      <Link href={`/products/${id}`} className="block">
        <div className="relative aspect-square">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover transition-transform hover:scale-105"
          />
        </div>
      </Link>

      {/* 商品情報 */}
      <div className="p-4 space-y-2">
        <Link href={`/products/${id}`} className="block group">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-1 group-hover:text-primary-700 transition-colors">
            {title}
          </h3>
          {description && (
            <p className="text-sm text-gray-500 line-clamp-2">
              {description}
            </p>
          )}
        </Link>
        <div className="flex items-center justify-between pt-2">
          <span className="text-lg font-bold text-primary-700">
            ¥{price.toLocaleString()}
          </span>
          <Button size="sm">
            カートに追加
          </Button>
        </div>
      </div>
    </div>
  );
} 