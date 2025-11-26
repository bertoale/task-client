"use client";

import Navbar from "@/components/Navbar";
import useAuthGuard from "@/hooks/useAuthGuard";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isChecking = useAuthGuard();

  if (isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Memverifikasi akses...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <main className="p-6">{children}</main>
    </div>
  );
}
