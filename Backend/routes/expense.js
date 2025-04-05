const express = require("express");
const router = express.Router();
const Expense = require("../Models/Expense");
const authenticateToken = require("../middleware/authMiddleware"); // Import your authentication middleware

// Add an Expense (requires authentication)
router.post("/", authenticateToken, async (req, res) => {
    try {
        const newExpense = new Expense({ ...req.body, userId: req.user.userId }); // Assuming req.user.userId is set in the token
        const savedExpense = await newExpense.save();
        res.status(201).json(savedExpense);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
});

// Get All Expenses (requires authentication)
router.get("/", authenticateToken, async (req, res) => {
    try {
        const expenses = await Expense.find({ userId: req.user.userId }).sort({ createdAt: -1 });
        res.status(200).json(expenses);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
});

// Update an Expense (requires authentication)
router.put("/:id", authenticateToken, async (req, res) => {
    try {
        const updatedExpense = await Expense.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(updatedExpense);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
});

// Delete an Expense (requires authentication)
router.delete("/:id", authenticateToken, async (req, res) => {
    try {
        await Expense.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Expense deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
});

module.exports = router;
