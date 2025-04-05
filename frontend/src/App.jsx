import React from "react";
import { Routes, Route } from "react-router-dom"; // Import Routes and Route

import HomePage from "./Components/Homepage";
import Signup from "./Pages/Signup";
import LoginPage from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";

function App() {
  return (
    <Routes>
      {" "}
      {/* Use Routes here, no need for Router wrapping */}
      <Route path="/" element={<HomePage />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App;
