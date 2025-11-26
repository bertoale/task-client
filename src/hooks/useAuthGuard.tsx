"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// Hook untuk mengecek apakah user sudah login, jika tidak redirect ke /login
export default function useAuthGuard() {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      if (!token) {
        router.replace("/");
        return;
      }
      setIsChecking(false);
    };
    // Delay kecil untuk memastikan localStorage sudah ready
    const timer = setTimeout(checkAuth, 100);
    return () => clearTimeout(timer);
  }, [router]);

  return isChecking;
}
