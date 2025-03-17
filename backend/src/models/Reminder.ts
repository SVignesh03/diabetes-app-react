import mongoose from "mongoose";

const ReminderSchema = new mongoose.Schema({
  title: { type: String, required: true },
  dateTime: { type: Date, required: true }
});

export default mongoose.model("Reminder", ReminderSchema);
