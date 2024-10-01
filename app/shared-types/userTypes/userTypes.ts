import { Document } from "mongoose";

export interface IUser extends Document {
  _id: string;
  email?: string;
  username?: string;
  emailVerified: boolean;
  detailsFilled: boolean;
  kycFilled: boolean;
  agreedToTerms: boolean;
  // New fields for personal details
  country?: string;
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
  occupation?: string;
  address?: string;
  postalCode?: string;
  city?: string;
}
