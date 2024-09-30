"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from "react";
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
  isHandlingAuth: React.MutableRefObject<boolean>;
  updateUser: (details: Partial<IUser>) => Promise<void>;
  createNewUser: (firebaseUser: any, agreedToTerms: boolean) => Promise<IUser>;
  fetchUserByFirebaseUser: (firebaseUser: AuthUser) => Promise<void>;
  deleteUser: () => Promise<void>;
  deleteFirebaseAuthUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authUser, setAuthUser] = useState<AuthUser | null>(null);
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);
  // when sign in flow manually done in register / login modals, don't want onauthchange to run also, race conditions in calling setUser
  const isHandlingAuth = useRef(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
      setAuthUser(firebaseUser);
      console.log(
        "auth user just changed: ",
        firebaseUser,
        " manually handling auth? ",
        isHandlingAuth.current
      );
      if (firebaseUser && !isHandlingAuth.current) {
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
      } else if (!firebaseUser) {
        setUser(null);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  // Function to fetch user data by Firebase ID
  const fetchUserByFirebaseUser = async (
    firebaseUser: AuthUser
  ): Promise<void> => {
    try {
      const response = await axios.get(
        `${BACKEND_URL}/api/users/${firebaseUser.uid}`
      );
      setUser(response.data);
    } catch (error) {
      console.error("Fetched user not in db:", error);
      if (isAxiosError(error) && error.response?.status === 404) {
        // User not found, attempt to create
        try {
          const newUser = await createNewUser(firebaseUser);
          setUser(newUser);
        } catch (createError) {
          console.error("Error creating initial user:", createError);
          setUser(null);
          throw createError;
        }
      } else {
        console.error("Error fetching user:", error);
        setUser(null);
        throw error;
      }
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

  const createNewUser = async (
    firebaseUser: any,
    agreedToTerms: boolean = false
  ): Promise<IUser> => {
    try {
      const response = await axios.post(`${BACKEND_URL}/api/users`, {
        userID: firebaseUser.uid,
        email: firebaseUser.email || undefined,
        emailVerified: firebaseUser.emailVerified,
        agreedToTerms: agreedToTerms,
      });
      setUser(response.data);
      return response.data;
    } catch (error) {
      console.error("Error creating initial user:", error);
      throw new Error(`Failed to create initial user: ${error}`);
    }
  };

  const deleteUser = async () => {
    if (!user || !authUser) {
      throw new Error("No user data available");
    }

    try {
      const response = await axios.delete(
        `${BACKEND_URL}/api/users/${user._id}`
      );

      if (response.status !== 200) {
        throw new Error("Failed to delete user");
      }

      // Sign out from Firebase
      // This will trigger onAuthStateChanged, which will set user to null
      await auth.signOut();
    } catch (error) {
      console.error("Error deleting user:", error);
      if (isAxiosError(error) && error.response) {
        throw new Error(error.response.data);
      } else {
        throw error;
      }
    }
  };

  const deleteFirebaseAuthUser = async () => {
    if (!authUser) {
      throw new Error("No authenticated user");
    }

    try {
      const response = await axios.delete(
        `${BACKEND_URL}/api/users/${authUser.uid}/auth`
      );

      if (response.status !== 200) {
        throw new Error("Failed to delete Firebase Auth user");
      }

      // Sign out from Firebase
      // This will trigger onAuthStateChanged, which will set user and authUser to null
      await auth.signOut();
    } catch (error) {
      console.error("Error deleting Firebase Auth user:", error);
      if (isAxiosError(error) && error.response) {
        throw new Error(error.response.data);
      } else {
        throw error;
      }
    }
  };

  const value = {
    authUser,
    user,
    loading,
    isHandlingAuth,
    updateUser,
    createNewUser,
    fetchUserByFirebaseUser,
    deleteUser,
    deleteFirebaseAuthUser,
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
