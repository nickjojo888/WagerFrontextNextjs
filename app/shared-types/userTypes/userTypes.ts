import { Document } from "mongoose";

export interface IUser extends Document {
  _id: string;
  email: string;
  username: string;
  emailVerified: boolean;
  detailsFilled: boolean;
  kycFilled: boolean;
  agreedToTerms: boolean;
}
