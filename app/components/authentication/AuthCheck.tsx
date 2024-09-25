"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./AuthContext";

const AuthCheck: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { authUser, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !authUser) {
      router.push("/?auth=login");
    }
  }, [authUser, loading, router]);

  return <>{children}</>;
};

export default AuthCheck;
