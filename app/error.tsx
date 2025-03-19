'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/Button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[400px] flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          エラーが発生しました
        </h2>
        <p className="text-gray-600 mb-8">
          申し訳ありません。予期せぬエラーが発生しました。<br />
          もう一度お試しください。
        </p>
        <div className="space-x-4">
          <Button onClick={() => reset()}>
            再試行
          </Button>
          <Button variant="outline" asChild>
            <a href="/">トップページへ</a>
          </Button>
        </div>
      </div>
    </div>
  );
} 