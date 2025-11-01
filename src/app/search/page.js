import { Suspense } from 'react';
import Header from '@/component/header';
import SearchContent from '../SearchContent';

export default function SearchPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Suspense fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      }>
        <SearchContent />
      </Suspense>
    </div>
  );
}