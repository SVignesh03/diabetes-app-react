import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  clerkId: string;  // Clerk user ID
  name: string;
  email: string;
  age?: number;
  phone?: string;
}

const UserSchema = new Schema<IUser>({
  clerkId: { type: String, required: true, unique: true }, 
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number },
  phone: { type: String },
});

export default mongoose.model<IUser>('User', UserSchema);
