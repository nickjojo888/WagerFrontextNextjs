"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { User as AuthUser } from "firebase/auth";
import { auth } from "@/app/firebase/firebaseConfig";
import axios, { isAxiosError } from "axios";

// Update this line to use NEXT_PUBLIC_ prefix
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "";

export interface User {
  _id: string;
  username: string;
  email?: string;
  emailVerified: boolean;
  // Add other user properties as needed
}

interface AuthContextType {
  authUser: AuthUser | null;
  user: User | null;
  loading: boolean;
  createUser: (username: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authUser, setAuthUser] = useState<AuthUser | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
      setAuthUser(firebaseUser);
      if (firebaseUser) {
        try {
          const response = await axios.get(
            `${BACKEND_URL}/api/users/${firebaseUser.uid}`
          );
          setUser(response.data);
        } catch (error) {
          console.error("Error fetching user:", error);
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const createUser = async (username: string): Promise<void> => {
    if (!authUser) throw new Error("No authenticated user");
    try {
      const response = await axios.post<User>(`${BACKEND_URL}/api/users`, {
        userID: authUser.uid,
        username,
        email: authUser.email || undefined,
        emailVerified: authUser.emailVerified,
      });
      setUser(response.data);
    } catch (error) {
      console.error("Error creating user:", error);
      if (isAxiosError(error) && error.response) {
        throw new Error(`Failed to create user: ${error.response.data}`);
      } else {
        throw new Error("Failed to create user: Unknown error occurred");
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        authUser,
        user,
        loading,
        createUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
