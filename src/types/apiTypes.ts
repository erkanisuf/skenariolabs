export interface IApiProperty {
  lat: number;
  lon: number;
  formatted: string; // This gives the adress formatted .
  district?: string;
}

export interface IAPIResponse {
  properties: IApiProperty;
}
