const express = require("express");
const router = express.Router();
const Expense = require("../Models/Expense");
const authenticateToken = require("../middleware/authMiddleware"); // Import your authentication middleware

// Add an Expense (requires authentication)
router.post("/", async (req, res) => {
    try {
        const newExpense = new Expense({ ...req.body, userId: req.user.userId }); // Assuming req.user.userId is set in the token
        const savedExpense = await newExpense.save();
        res.status(201).json(savedExpense);
    } catch (error) {
        res.status(500).json( error);
    }
});

// Get All Expenses 
router.get("/",  async (req, res) => {
    try {
        const expenses = await Expense.find({ userId: req.user.userId }).sort({ createdAt: -1 });
        res.status(200).json(expenses);
    } catch (error) {
        res.status(500).json( error );
    }
});


// Update Expense
router.put("/:id", async (req, res) => {
    try {
        const updatedExpense = await Expense.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(updatedExpense);
    } catch (error) {
        res.status(500).json(error);
    }
});

// Delete an Expense (requires authentication)
router.delete("/:id", async (req, res) => {
    try {
        await Expense.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Expense deleted successfully" });
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;
