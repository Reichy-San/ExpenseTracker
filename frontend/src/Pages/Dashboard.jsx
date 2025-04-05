import { useState, useEffect } from "react";
import { FaTrash, FaEdit, FaWindowClose } from "react-icons/fa";
import { PieChart } from "@mui/x-charts/PieChart";
import { publicRequest } from "../requestMethod";
import { removeToken } from "../utils/auth";
import { useNavigate } from "react-router-dom";
import "../Styles/expense.css";

function Dashboard() {
  const [showAddExpense, setShowAddExpense] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [label, setLabel] = useState("");
  const [amount, setAmount] = useState(0);
  const [date, setDate] = useState("");
  const [expenses, setExpenses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleLogout = () => {
    removeToken();
    navigate("/login");
  };

  const handleAddExpense = () => setShowAddExpense(!showAddExpense);
  const handleShowReport = () => setShowReport(!showReport);

  const handleExpense = async () => {
    if (!label || !amount || !date) {
      alert("All fields are required.");
      return;
    }
    try {
      await publicRequest.post("/expenses", {
        label,
        date,
        value: parseFloat(amount),
      });
      fetchExpenses();
      setShowAddExpense(false);
      setLabel("");
      setAmount(0);
      setDate("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await publicRequest.delete(`/expenses/${id}`);
      fetchExpenses();
    } catch (error) {
      console.log(error);
    }
  };

  const fetchExpenses = async () => {
    try {
      const res = await publicRequest.get("/expenses");
      setExpenses(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const filteredExpenses = expenses.filter((expense) =>
    expense.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalSum = filteredExpenses.reduce((acc, curr) => acc + curr.value, 0);

  return (
    <div className="dashboard-container">
      <nav className="navbar">
        <div className="navbar__container">
          <a href="#" id="navbar__logo">ExpenseTracker</a>
          <ul className="navbar__menu">
            <li className="navbar__item"><a href="#" className="navbar__links">Home</a></li>
            <li className="navbar__item"><a href="#" className="navbar__links">Reports</a></li>
            <li className="navbar__item"><a href="#" className="navbar__links">Settings</a></li>
            <li className="navbar__btn">
              <button onClick={handleLogout} className="button">Logout</button>
            </li>
          </ul>
        </div>
      </nav>

      <div className="dashboard-content">
        <h1>Welcome to Your Dashboard</h1>
        <p>Track and manage your expenses with ease.</p>

        <div className="action-buttons">
          <button onClick={handleAddExpense}>Add Expense</button>
          <button onClick={handleShowReport}>View Summary</button>
        </div>

        {showAddExpense && (
          <div className="add-expense-form">
            <FaWindowClose className="close-icon" onClick={handleAddExpense} />
            <label>Expense Name</label>
            <input type="text" value={label} placeholder="e.g. Groceries" onChange={(e) => setLabel(e.target.value)} />
            <label>Expense Date</label>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            <label>Expense Amount</label>
            <input type="number" value={amount} placeholder="e.g. 1000" onChange={(e) => setAmount(e.target.value)} />
            <button onClick={handleExpense}>Add Expense</button>
          </div>
        )}

        {showReport && (
          <div className="expense-report">
            <FaWindowClose className="close-icon" onClick={handleShowReport} />
            <PieChart
              series={[{
                data: expenses.map((item) => ({ id: item._id, value: item.value, label: item.label })),
                innerRadius: 30,
                outerRadius: 100,
                paddingAngle: 5,
                cornerRadius: 5,
                startAngle: -90,
                endAngle: 180,
                cx: 150,
                cy: 150,
              }]}
            />
            <div>
              <strong>Total Expenses:</strong> KSH {totalSum.toFixed(2)}
            </div>
          </div>
        )}

        <div className="expense-filter">
          <input
            type="text"
            placeholder="Search expenses"
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="expense-list">
          {filteredExpenses.map((item) => (
            <div key={item._id} className="expense-item">
              <h2>{item.label}</h2>
              <span>{item.date}</span>
              <span>KSH {item.value}</span>
              <div className="actions">
                <FaTrash onClick={() => handleDelete(item._id)} />
                <FaEdit onClick={() => { /* Implement edit logic here */ }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
