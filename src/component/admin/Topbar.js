'use client';

export default function Topbar() {
  const user = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : null;

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/login';
  };

  return (
    <header className="flex justify-between items-center px-6 py-4 bg-white shadow">
      <h1 className="text-lg text-gray-600 font-semibold">Welcome, {user?.name || 'Admin'}</h1>
      <button
        onClick={handleLogout}
        className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition cursor-pointer"
      >
        Logout
      </button>
    </header>
  );
}
