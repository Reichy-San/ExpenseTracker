import { useState } from "react";
import { publicRequest } from "../requestMethod";
import { setToken } from "../utils/auth";
import { useNavigate } from "react-router-dom";
import "../Styles/expense.css";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }

    try {
      const response = await publicRequest.post("/auth/login", { email, password });

      if (response.data?.token) {
        setToken(response.data.token);
        navigate("/dashboard");
      } else {
        alert("Login failed. No token received.");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert(error.response?.data?.message || "Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <h1 className="title">Login</h1>
      <form onSubmit={handleLogin} className="login-form">
        <input
          className="input-field"
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="input-field"
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="button login-button">
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
