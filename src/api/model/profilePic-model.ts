//Upload profile photo 

export interface UploadProfilePicResponse {
  error: boolean;
  status: boolean;
  statusCode: number;
  responseTimestamp: string;
  data: UploadProfilePicData;
}
interface UploadProfilePicData {
  _id: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size: number;
  path: string;
  createdAt: string;
  updatedAt: string;
}

//Upload profile photo id

export interface uploadProfilePicIdRes {
  error: boolean;
  status: boolean;
  statusCode: number;
  responseTimestamp: string;
  updated: boolean;
  data: uploadProfilePicIdData;
}
interface uploadProfilePicIdData {
  isRegistered: boolean;
  registeredBy: string;
  country: string;
  status: boolean;
  isEmailVerified: boolean;
  isPasswordExist: boolean;
  _id: string;
  mobile: string;
  name: string;
  emailVerificationOtp: string;
  emailVerificationOtpExpiry?: string | null;
  createdAt: string;
  updatedAt: string;
  selectedExamCategories?: SelectedExamCategories | null;
  appStreak: AppStreak;
  city: string;
  dob: string;
  email: string;
  gender: string;
  line1: string;
  line2: string;
  pinCode: number;
  state: string;
  profilePicture: ProfilePicture;
  deviceToken: string;
}
interface ProfilePicture {
  _id: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size: number;
  path: string;
  createdAt: string;
  updatedAt: string;
}
interface AppStreak {
  current: number;
  lastOpenDate: string;
}

interface SelectedExamCategories {
  _id: string;
  categoryName: string;
}