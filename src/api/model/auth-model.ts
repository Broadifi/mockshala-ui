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
  name: string;
  mobile: string;
  country: string;
  isRegistered: boolean;
  registeredBy: string;
  isPasswordExist: boolean;
  isEmailVerified: boolean;
}
