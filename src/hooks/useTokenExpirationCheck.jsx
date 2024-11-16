// src/hooks/useTokenExpirationCheck.js
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";

import RouterPaths from "../route.paths";
import { logoutUser } from "../redux/slices/authSlice";

const useTokenExpirationCheck = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const checkTokenExpiration = () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate(RouterPaths.LOGIN);
        return;
      }

      try {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000; // Current time in seconds

        if (decoded.exp < currentTime) {
          localStorage.removeItem("token");
          dispatch(logoutUser());
          navigate(RouterPaths.LOGIN);
        }
      } catch (error) {
        console.error("Token decoding error:", error);
        navigate(RouterPaths.LOGIN);
      }
    };

    // Run the check when the component mounts
    checkTokenExpiration();

    // Optional: You can set an interval to periodically check token expiration
    const interval = setInterval(checkTokenExpiration, 60000); // Check every minute

    return () => clearInterval(interval); // Cleanup the interval on unmount
  }, [navigate, dispatch]);
};

export default useTokenExpirationCheck;
