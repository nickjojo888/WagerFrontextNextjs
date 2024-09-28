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
  updateUser: (details: any) => Promise<void>;
  createInitialUser: (firebaseUser: any) => Promise<IUser>;
  fetchUserByFirebaseId: (firebaseUserId: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authUser, setAuthUser] = useState<AuthUser | null>(null);
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
      setAuthUser(firebaseUser);
      console.log("auth user: ", firebaseUser);
      if (firebaseUser) {
        try {
          const response = await axios.get(
            `${BACKEND_URL}/api/users/${firebaseUser.uid}`
          );
          setUser(response.data);
        } catch (error) {
          // don't use the fetchuserbyfirebaseid function here since catch block will soon delete firebase auth user here
          console.error("Error fetching user in useEffect:", error);
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const fetchUserByFirebaseId = async (firebaseUserId: string) => {
    try {
      const response = await axios.get(
        `${BACKEND_URL}/api/users/${firebaseUserId}`
      );
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user:", error);
      setUser(null);
      throw error;
    }
  };

  const updateUser = async (details: Partial<IUser>) => {
    if (!user) {
      throw new Error("No user data available");
    }

    try {
      const response = await axios.put(
        `${BACKEND_URL}/api/users/${user._id}`,
        details
      );

      if (response.status !== 200) {
        throw new Error("Failed to update user details");
      }

      // Update the user state with the new details
      setUser(response.data);
    } catch (error) {
      console.error("Error updating user details:", error);
      if (isAxiosError(error) && error.response) {
        throw new Error(error.response.data);
      } else {
        throw error;
      }
    }
  };

  const createInitialUser = async (firebaseUser: any): Promise<IUser> => {
    try {
      const response = await axios.post(`${BACKEND_URL}/api/users`, {
        userID: firebaseUser.uid,
        email: firebaseUser.email || undefined,
        emailVerified: firebaseUser.emailVerified,
      });
      setUser(response.data);
      return response.data;
    } catch (error) {
      console.error("Error creating initial user:", error);
      throw new Error("Failed to create initial user");
    }
  };

  const value = {
    authUser,
    user,
    loading,
    updateUser,
    createInitialUser,
    fetchUserByFirebaseId,
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
