import { Document } from "mongoose";

export interface IUser {
  _id: string;
  email?: string;
  username?: string;
  emailVerified: boolean;
  detailsFilled: boolean;
  kycFilled: boolean;
  agreedToTerms: boolean;
}
