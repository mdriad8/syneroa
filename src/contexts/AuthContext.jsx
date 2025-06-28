import React, { createContext, useContext, useEffect, useState } from "react";
import { account } from "../lib/appwrite";

const AuthContext = createContext(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const isAdmin =
    user?.email === "admin@syneroa.com" || user?.prefs?.role === "admin";

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const currentUser = await account.get();
      console.log("Logged in user:", currentUser);
      setUser(currentUser);
    } catch (error) {
      console.log("User not logged in:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    await account.createEmailSession(email, password);
    const currentUser = await account.get();
    setUser(currentUser);
  };

  const logout = async () => {
    await account.deleteSession("current");
    setUser(null);
  };

  const value = {
    user,
    login,
    logout,
    loading,
    isAdmin,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
