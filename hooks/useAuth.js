// hooks/useAuth.js
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function useAuth() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      router.push("/login");
    } else {
      setLoading(false);
    }
  }, [router]);

  return { loading };
}
