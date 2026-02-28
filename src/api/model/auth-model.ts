export interface AuthLoginData {
  mobile: string
}

export interface AuthOtpData{
  mobile: string;
  otp: string;
}

export interface AuthRegistrationData {
  mobile: string;
  otp: string;
  name: string;
  email?: string;
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

export interface User {
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


//New User data
export interface NewUser {
  _id: string;
  name: string;
  mobile: string;
  country: string;
  isRegistered: boolean;
  registeredBy: string;
  isPasswordExist: boolean;
  isEmailVerified: boolean;
}

//Registration Verification

export interface RegistrationResponse {
  error: boolean;
  status: boolean;
  statusCode: number;
  responseTimestamp: string;
  data: RegistrationData;
}
interface RegistrationData {
  _id: string;
  token: string;
  user: RegistrationUser;
  createdAt: string;
  updatedAt: string;
}

export interface RegistrationUser {
  isRegistered: boolean;
  registeredBy: string;
  country: string;
  status: boolean;
  isEmailVerified: boolean;
  isPasswordExist: boolean;
  _id: string;
  mobile: string;
  name: string;
  email?: string;
  emailVerificationOtp: string;
  emailVerificationOtpExpiry?: string | null
  createdAt: string;
  updatedAt: string;
}


//Get Profile Data

export interface GetProfileResponse {
  error: boolean;
  status: boolean;
  statusCode: number;
  responseTimestamp: string;
  data: GetProfileData;
}

export interface GetProfileData {
  _id: string;
  email: string;
  name: string;
  profilePicture?: ProfilePictureProfile;
  mobile: string;
  line1?: string;
  line2?: string;
  googleId?: string;
  city?: string;
  state?: string;
  dob?: string;
  gender?: string;
  country: string;
  pinCode?: number;
  isRegistered: boolean;
  registeredBy: string;
  selectedExamCategories?: SelectedExamCategoriesProfile;
  deviceToken?: string;
  isPasswordExist: boolean;
  isEmailVerified: boolean;
}

interface SelectedExamCategoriesProfile {
  _id: string;
  categoryName: string;
}
interface ProfilePictureProfile {
  _id: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size: number;
  path: string;
  createdAt: string;
  updatedAt: string;
}


//Update Profile


export interface UpdateProfileResponse {
  error: boolean;
  status: boolean;
  statusCode: number;
  responseTimestamp: string;
  updated: boolean;
  data: UpdateProfileData;
}

interface UpdateProfileData {
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
  emailVerificationOtpExpiry?: string | null
  createdAt: string;
  updatedAt: string;
  city: string;
  email: string;
  gender: string;
  pinCode: number;
  state: string;
  dob: string;
  line1: string;
  line2: string;
}



