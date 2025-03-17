import mongoose, { Schema, Document } from 'mongoose';

export interface ILog extends Document {
  type: 'blood_sugar' | 'blood_pressure';
  value: number;
  date: Date;
}

const LogSchema = new Schema<ILog>({
  type: { type: String, required: true, enum: ['blood_sugar', 'blood_pressure'] },
  value: { type: Number, required: true },
  date: { type: Date, default: Date.now },  // Stores both date & time
});

export default mongoose.model<ILog>('Log', LogSchema);
