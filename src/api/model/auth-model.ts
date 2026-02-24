export interface AuthLoginData {
  mobile: string
}

export interface AuthOtpData{
  mobile: string;
  otp: string;
}

//Login Response for mobile login to get otp
 export interface LoginResponse {
  error: boolean;
  status: boolean;
  statusCode: number;
  responseTimestamp: string;
  data: LoginResponseData;
}

export interface LoginResponseData {
  success: boolean;
  message: string;
  newUser: boolean;
}


//OTP verification 


export interface OtpResponse {
  error: boolean;
  status: boolean;
  statusCode: number;
  responseTimestamp: string;
  data: OtpResponseData;
}
interface OtpResponseData {
  token: string;
  user: User;
}

interface User {
  _id: string;
  email: string;
  name: string;
  profilePicture: ProfilePicture;
  mobile: string;
  line1: string;
  line2: string;
  city: string;
  state: string;
  dob: string;
  gender: string;
  country: string;
  pinCode: number;
  isRegistered: boolean;
  registeredBy: string;
  selectedExamCategories: SelectedExamCategories;
  deviceToken: string;
  isPasswordExist: boolean;
  isEmailVerified: boolean;
}
interface SelectedExamCategories {
  _id: string;
  categoryName: string;
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