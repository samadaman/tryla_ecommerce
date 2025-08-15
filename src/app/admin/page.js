'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true); // ✅ wait before showing UI
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      router.push("/login");
      return;
    }

    try {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);

      if (parsedUser.role !== "ADMIN") {
        router.push("/");
        return;
      }
    } catch (err) {
      console.error("Error parsing user from localStorage:", err);
      router.push("/login");
    } finally {
      setLoading(false);
    }
  }, [router]);

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Welcome to Admin Panel</h1>
      <p className="mt-4">Hello {user?.name}, manage your site here.</p>
    </div>
  );
}
