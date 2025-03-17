import express, { Request, Response } from 'express';
import Log, { ILog } from '../models/Log';

const router = express.Router();

// Get logs
router.get('/', async (_req: Request, res: Response) => {
  try {
    const logs = await Log.find().sort({ date: -1 });
    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
});

// Add a log
router.post('/', async (req: Request, res: Response) => {
  const { type, value } = req.body;
  try {
    const newLog = new Log({ type, value });
    await newLog.save();
    res.status(201).json(newLog);
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
});

export default router;
