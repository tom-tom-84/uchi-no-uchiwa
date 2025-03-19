export default function Loading() {
  return (
    <div className="min-h-[400px] flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-primary-700 border-r-transparent" />
        <p className="mt-4 text-gray-600">読み込み中...</p>
      </div>
    </div>
  );
} 