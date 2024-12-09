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
  checkAuth: () => Promise<void>; // Function to check authentication
  logout: () => void; // Logout function
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  // Function to check authentication
  const checkAuth = useCallback(async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/users/auth`,
        {
          withCredentials: true, // Ensures cookies are sent
        }
      );
      console.log("Auth check success:", response.data);
      setIsAuthenticated(true);
    } catch (error: any) {
      console.error(
        "Auth check failed:",
        error.response?.data || error.message
      );
      setIsAuthenticated(false);
    }
  }, []);

  // Function to handle logout
  const logout = useCallback(() => {
    setIsAuthenticated(false); // Reset authentication state
    axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/users/logout`,
      {},
      {
        withCredentials: true, // Clear cookies
      }
    );
  }, []);

  // Check authentication on initial mount
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isAuthenticated === null) {
    return <div>Loading...</div>; // Render a loading state while authentication is being checked
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, checkAuth, logout }}>
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
