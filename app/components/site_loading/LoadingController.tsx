"use client";
import { useAuth } from "../authentication/AuthContext";
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
      {loading && (
        <div className="fixed inset-0 bg-black z-50">
          <LoadingScreen />
        </div>
      )}
    </>
  );
}
