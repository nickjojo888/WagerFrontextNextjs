"use client";
import React, { useState } from "react";
import { useAuth } from "./AuthContext";

const SetUsernameModal: React.FC = () => {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { showSetUsernameModal, checkUsername, createUser } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const isAvailable = await checkUsername(username);
      if (!isAvailable) {
        setError("Username is already taken");
        setIsLoading(false);
        return;
      }

      await createUser(username);
    } catch (error) {
      console.error("Error creating user:", error);
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!showSetUsernameModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
      <div className="bg-gray-800 p-8 rounded-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Set Your Username</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
            className="w-full p-2 mb-4 bg-gray-700 rounded"
            required
          />
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            disabled={isLoading}
          >
            {isLoading ? "Setting Username..." : "Set Username"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SetUsernameModal;
