import "./App.css";
import { Route, Routes, Navigate } from "react-router";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Pomodoro from "./pages/Pomodoro";
import UniversityConnect from "./pages/UniversityConnect";
import University from "./pages/University";
import Header from "./components/Header";
import { jwtDecode } from "jwt-decode";
import useAxiosInterceptors from "./hooks/useAxiosInterceptors";

// Mock function to check authentication status
const isAuthenticated = () => {
  const token = localStorage.getItem("token");

  if (!token) return false;

  try {
    const decoded: any = jwtDecode(token);
    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
    return decoded.exp > currentTime; // Check if the token is still valid
  } catch (error) {
    console.error("Token decoding failed:", error);
    return false;
  }
};

const ProtectedRoute = ({ Component }: { Component: React.ComponentType }) => {
  return isAuthenticated() ? <Component /> : <Navigate to="/login" replace />;
};

function App() {
  useAxiosInterceptors();
  return (
    <>
      <Header />

      <div className="content">
        <Routes>
          {/* Public Route */}
          <Route path="/login" Component={Login} />

          {/* Protected Routes */}
          <Route path="/" element={<ProtectedRoute Component={Home} />} />
          <Route
            path="/pomodoro"
            element={<ProtectedRoute Component={Pomodoro} />}
          />
          <Route
            path="/university-connect"
            element={<ProtectedRoute Component={UniversityConnect} />}
          />
          <Route
            path="/university-connect/:university"
            element={<ProtectedRoute Component={University} />}
          />
        </Routes>
      </div>

      <footer>
        <h1>Footer</h1>
      </footer>
    </>
  );
}

export default App;
