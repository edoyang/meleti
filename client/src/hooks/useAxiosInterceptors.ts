import axios from "axios";
import { useNavigate } from "react-router";

const API = axios.create();

const useAxiosInterceptors = () => {
  const navigate = useNavigate();

  API.interceptors.response.use(
    (response) => response, // Pass through successful responses
    (error) => {
      if (
        error.response &&
        (error.response.status === 401 || error.response.status === 403)
      ) {
        // Token is invalid or expired
        localStorage.removeItem("token"); // Clear token
        navigate("/login"); // Redirect to login
      }
      return Promise.reject(error); // Reject the promise with the error
    }
  );
};

export default useAxiosInterceptors;
