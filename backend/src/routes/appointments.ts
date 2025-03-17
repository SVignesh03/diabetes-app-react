import express, { Request, Response } from 'express';
import Appointment, { IAppointment } from '../models/Appointment';

const router = express.Router();

// Get all appointments
router.get('/', async (_req: Request, res: Response) => {
  try {
    const appointments: IAppointment[] = await Appointment.find();
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
});

// Create a new appointment
router.post('/', async (req: Request, res: Response) => {
  const { doctor, date, time } = req.body;
  try {
    const newAppointment = new Appointment({ doctor, date, time });
    await newAppointment.save();
    res.status(201).json(newAppointment);
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
});

// Delete an appointment
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    await Appointment.findByIdAndDelete(req.params.id);
    res.json({ message: 'Appointment deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
});

export default router;
