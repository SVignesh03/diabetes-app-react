import express from "express";
import Reminder from "../models/Reminder"; // Assume Reminder model is defined
const router = express.Router();

// Get all reminders
router.get("/", async (req, res) => {
  try {
    const reminders = await Reminder.find();
    res.json(reminders);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Add a new reminder
router.post("/", async (req, res) => {
  const { title, dateTime } = req.body;
  try {
    const newReminder = new Reminder({ title, dateTime });
    await newReminder.save();
    res.json(newReminder);
  } catch (err) {
    res.status(500).json({ message: "Failed to save reminder" });
  }
});

// Delete a reminder
router.delete("/:id", async (req, res) => {
  try {
    await Reminder.findByIdAndDelete(req.params.id);
    res.json({ message: "Reminder deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting reminder" });
  }
});

export default router;
