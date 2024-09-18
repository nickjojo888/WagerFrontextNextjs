"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { User as AuthUser } from "firebase/auth";
import { auth } from "@/app/firebase/firebaseConfig";
import axios from "axios"; // Assume axios is installed for making API calls

export interface User {
  id: string;
  username: string;
  // Add other user properties as needed
}

interface AuthContextType {
  authUser: AuthUser | null;
  user: User | null;
  loading: boolean;
  showSetUsernameModal: boolean;
  setShowSetUsernameModal: (show: boolean) => void;
  checkUsername: (username: string) => Promise<boolean>;
  createUser: (username: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authUser, setAuthUser] = useState<AuthUser | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [showSetUsernameModal, setShowSetUsernameModal] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
      setAuthUser(firebaseUser);
      if (firebaseUser) {
        try {
          const response = await axios.get(`/api/users/${firebaseUser.uid}`);
          setUser(response.data);
        } catch (error) {
          console.error("Error fetching user:", error);
          setUser(null);
          setShowSetUsernameModal(true);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const checkUsername = async (username: string): Promise<boolean> => {
    try {
      const response = await axios.get(`/api/users/check-username/${username}`);
      return !response.data.isTaken;
    } catch (error) {
      console.error("Error checking username:", error);
      throw error;
    }
  };

  const createUser = async (username: string): Promise<void> => {
    if (!authUser) throw new Error("No authenticated user");
    try {
      const response = await axios.post<User>("/api/users", {
        uid: authUser.uid,
        username,
      });
      setUser(response.data);
      setShowSetUsernameModal(false);
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        authUser,
        user,
        loading,
        showSetUsernameModal,
        setShowSetUsernameModal,
        checkUsername,
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
