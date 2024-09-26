"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { User as AuthUser } from "firebase/auth";
import { auth } from "@/app/firebase/firebaseConfig";
import axios, { isAxiosError } from "axios";
import { IUser } from "@/app/shared-types/userTypes/userTypes";

// Update this line to use NEXT_PUBLIC_ prefix
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "";

interface AuthContextType {
  authUser: AuthUser | null;
  user: IUser | null;
  loading: boolean;
  createUser: (username: string) => Promise<void>;
  updateUserDetails: (details: any) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authUser, setAuthUser] = useState<AuthUser | null>(null);
  const [user, setUser] = useState<IUser | null>(null);
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
      const response = await axios.post<IUser>(`${BACKEND_URL}/api/users`, {
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

  const updateUserDetails = async (details: any) => {
    try {
      // Make an API call to update user details
      const response = await fetch("/api/user/update-details", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(details),
      });

      if (!response.ok) {
        throw new Error("Failed to update user details");
      }

      // Update the user state with the new details
      setUser((prevUser) => ({ ...prevUser, ...details, detailsFilled: true }));
    } catch (error) {
      console.error("Error updating user details:", error);
      throw error;
    }
  };

  const value = {
    authUser,
    user,
    loading,
    createUser,
    updateUserDetails,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
