'use client';

import Sidebar from '@/components/admin/Sidebar';
import Topbar from '@/components/admin/Topbar';

export default function AdminLayout({ children }) {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex flex-col flex-1 ml-64 min-h-screen bg-gray-50">
        <Topbar />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
