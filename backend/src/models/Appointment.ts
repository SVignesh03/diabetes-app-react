import mongoose, { Schema, Document } from 'mongoose';

export interface IAppointment extends Document {
  doctor: string;
  date: string;
  time: string;
}

const AppointmentSchema = new Schema<IAppointment>({
  doctor: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
});

export default mongoose.model<IAppointment>('Appointment', AppointmentSchema);