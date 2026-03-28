import mongoose, { Schema, Document, Model } from 'mongoose';

export type AdPlacement = 'top-banner' | 'sidebar' | 'inline' | 'homepage-featured';

export interface IAdvertisement extends Document {
  title: string;
  clientName: string;
  imageUrl: string;
  linkUrl: string;
  placement: AdPlacement;
  isActive: boolean;
  startDate: Date;
  endDate: Date;
  clicks: number;
  impressions: number;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const AdvertisementSchema = new Schema<IAdvertisement>(
  {
    title: { type: String, required: true, trim: true },
    clientName: { type: String, required: true, trim: true },
    imageUrl: { type: String, required: true },
    linkUrl: { type: String, required: true },
    placement: {
      type: String,
      enum: ['top-banner', 'sidebar', 'inline', 'homepage-featured'],
      required: true,
    },
    isActive: { type: Boolean, default: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    clicks: { type: Number, default: 0 },
    impressions: { type: Number, default: 0 },
    notes: { type: String },
  },
  { timestamps: true }
);

AdvertisementSchema.index({ placement: 1, isActive: 1 });

const Advertisement: Model<IAdvertisement> =
  mongoose.models.Advertisement ||
  mongoose.model<IAdvertisement>('Advertisement', AdvertisementSchema);
export default Advertisement;
