import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IAdRequest extends Document {
  name: string;
  email: string;
  phone?: string;
  packageType: string;
  message: string;
  status: 'new' | 'contacted' | 'approved' | 'rejected';
  createdAt: Date;
  updatedAt: Date;
}

const AdRequestSchema = new Schema<IAdRequest>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, trim: true },
    packageType: { type: String, required: true, trim: true },
    message: { type: String, required: true, trim: true },
    status: {
      type: String,
      enum: ['new', 'contacted', 'approved', 'rejected'],
      default: 'new',
    },
  },
  { timestamps: true }
);

const AdRequest: Model<IAdRequest> =
  mongoose.models.AdRequest || mongoose.model<IAdRequest>('AdRequest', AdRequestSchema);
export default AdRequest;
