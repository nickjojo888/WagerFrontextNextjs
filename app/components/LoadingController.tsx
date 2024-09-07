"use client";
import { useAuth } from "./authentication/AuthContext";
import LoadingScreen from "./LoadingScreen";

export default function LoadingController({
  children,
}: {
  children: React.ReactNode;
}) {
  const { loading } = useAuth();

  return (
    <>
      {children}
      {loading && <LoadingScreen />}
    </>
  );
}
