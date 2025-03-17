import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import appointmentsRouter from './routes/appointments';
import logsRouter from './routes/logs';
import userRoutes from './routes/users';
import remindersRoute from "./routes/reminders";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URI as string, { useNewUrlParser: true, useUnifiedTopology: true } as any)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

app.use('/api/appointments', appointmentsRouter);
app.use('/api/logs', logsRouter);
app.use('/api/users', userRoutes);
app.use("/api/reminders", remindersRoute);

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
