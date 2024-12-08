import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import axios from "axios";

interface AuthContextProps {
  isAuthenticated: boolean | null; // null: loading, true: authenticated, false: not authenticated
  checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  const checkAuth = useCallback(async () => {
    try {
      // Send request to the `/users/auth` endpoint
      await axios.get(`${import.meta.env.VITE_API_BASE_URL}/users/auth`, {
        withCredentials: true, // Ensures cookies are sent
      });
      setIsAuthenticated(true); // If successful, set authenticated
    } catch (error: any) {
      console.error(
        "Auth check failed:",
        error.response?.data || error.message
      );
      setIsAuthenticated(false); // If failed, set not authenticated
    }
  }, []);

  useEffect(() => {
    // Call checkAuth only on initial mount
    checkAuth();
  }, [checkAuth]);

  if (isAuthenticated === null) {
    // Render a loading state while the authentication is being checked
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};
