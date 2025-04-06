import axios from "axios";

// Define the base URL for API requests
const BASE_URL = "http://localhost:5000"; // Your backend URL (change to the appropriate one if deployed)

// Create an axios instance
export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

// POST request for adding an expense
export const addExpense = async (expenseData) => {
  try {
    const response = await publicRequest.post("/expenses", expenseData);
    return response.data;
  } catch (err) {
    console.error("Error adding expense:", err);
    throw err;
  }
};

// GET request for fetching all expenses
export const getExpenses = async () => {
  try {
    const response = await publicRequest.get("/expenses");
    return response.data;
  } catch (err) {
    console.error("Error fetching expenses:", err);
    throw err;
  }
};

// DELETE request for deleting an expense
export const deleteExpense = async (id) => {
  try {
    const response = await publicRequest.delete(`/expenses/${id}`);
    return response.data;
  } catch (err) {
    console.error("Error deleting expense:", err);
    throw err;
  }
};

// POST request for user login
export const loginUser = async (email, password) => {
  try {
    const response = await publicRequest.post("/auth/login", { email, password });
    return response.data;
  } catch (err) {
    console.error("Error logging in:", err);
    throw err;
  }
};

// POST request for user registration
export const registerUser = async (username, email, password) => {
  try {
    const response = await publicRequest.post("/auth/register", { username, email, password });
    return response.data;
  } catch (err) {
    console.error("Error registering user:", err);
    throw err;
  }
};
