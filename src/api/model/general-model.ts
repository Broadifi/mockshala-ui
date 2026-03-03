export interface StateResponse {
  error: boolean;
  status: boolean;
  statusCode: number;
  responseTimestamp: string;
  data: StateData[];
}

export interface StateData {
  name: string;
  isoCode: string;
  countryCode: string;
  latitude: string;
  longitude: string;
}