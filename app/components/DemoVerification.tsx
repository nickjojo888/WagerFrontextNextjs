"use client";
import { useState, useEffect } from "react";

export default function DemoVerification() {
  const [isVerified, setIsVerified] = useState(true);
  const [key, setKey] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const storedVerification = localStorage.getItem("demoVerified");
    if (storedVerification !== "true") {
      setIsVerified(false);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // Clear any previous error
    try {
      const response = await fetch("/api/verify-demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key }),
      });

      if (response.ok) {
        setIsVerified(true);
        localStorage.setItem("demoVerified", "true");
      } else {
        setError("Invalid key. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again later.");
    }
  };

  if (isVerified) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-gray-900">
      <form
        onSubmit={handleSubmit}
        className="p-8 bg-gray-800 rounded-lg shadow-lg"
      >
        <h2 className="mb-4 text-2xl font-bold text-white">
          Demo Verification
        </h2>
        <input
          type="password"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          placeholder="Enter demo key"
          className="w-full p-2 mb-4 text-black bg-gray-200 rounded"
          required
        />
        <button
          type="submit"
          className="w-full p-2 text-white bg-blue-600 rounded hover:bg-blue-700"
        >
          Verify
        </button>
        {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
      </form>
    </div>
  );
}
