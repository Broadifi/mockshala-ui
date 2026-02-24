export interface AuthLoginData {
  mobile: string
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