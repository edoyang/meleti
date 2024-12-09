import { useDispatch } from "react-redux";
import { setUser } from "../../redux/Slices/userSlice"; // User slice actions
import { setSettings } from "../../redux/Slices/pomodoroSlice"; // Pomodoro slice actions
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuthContext } from "../../context/AuthContext";

interface LoginForm {
  identifier: string;
  password: string;
}

const Login = () => {
  const [formData, setFormData] = useState<LoginForm>({
    identifier: "",
    password: "",
  });
  const [message, setMessage] = useState<string>("");

  const navigate = useNavigate();
  const { checkAuth } = useAuthContext();
  const dispatch = useDispatch(); // Redux dispatch hook

  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/users/login`,
        formData,
        { withCredentials: !isMobile } // Disable `withCredentials` on mobile
      );

      setMessage("Login successful!");

      const token = response.data.token; // Get the token from the response
      if (isMobile) {
        // Store token in local storage for mobile
        localStorage.setItem("token", token);
      }

      // Dispatch user data to Redux
      dispatch(
        setUser({
          id: response.data.user.id,
          username: response.data.user.username,
          email: response.data.user.email,
          uni: response.data.user.uni,
        })
      );

      // Dispatch Pomodoro settings to Redux
      dispatch(
        setSettings({
          timer: response.data.user.p_timer,
          shortBreak: response.data.user.p_break,
          longBreak: response.data.user.p_long_break,
        })
      );

      await checkAuth(); // Call auth check if needed
      setTimeout(() => navigate("/"), 1000);
    } catch (error: any) {
      console.error("Login failed:", error.response?.data || error.message);
      setMessage(error.response?.data.message || "Login failed");
    }
  };

  return (
    <div className="login-page">
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <input
          type="text"
          name="identifier"
          placeholder="Username or Email"
          value={formData.identifier}
          onChange={handleInputChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleInputChange}
          required
        />
        <button type="submit">Login</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default Login;
