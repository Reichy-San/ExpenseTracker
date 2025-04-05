import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { publicRequest } from "../requestMethod";
import "../Styles/expense.css";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    if (!email || !password || !confirmPassword) {
      alert("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      await publicRequest.post("/auth/register", { email, password });
      alert("Signup successful! Please login.");
      navigate("/login");
    } catch (err) {
      console.error("Signup error:", err);
      alert(err.response?.data?.message || "Signup failed.");
    }
  };

  return (
    <div className="signup-container">
      <h2 className="signup-title">Sign Up</h2>
      <input
        className="signup-input"
        type="email"
        placeholder="Email"
        required
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="signup-input"
        type="password"
        placeholder="Password"
        required
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        className="signup-input"
        type="password"
        placeholder="Confirm Password"
        required
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <button className="signup-button" onClick={handleSignup}>
        Sign Up
      </button>
      <p className="signup-footer">
        Already have an account?{" "}
        <a href="/login" className="signup-link">Login</a>
      </p>
    </div>
  );
}

export default Signup;
