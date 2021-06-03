import { IApiProperty, IAPIResponse } from "./apiTypes";

export interface ICordsMapView {
  coordinates: IAPIResponse[];
  open: boolean;
  focusViewport: IApiProperty;
}

export interface ICordsMapViewCoordinates {
  latitude: number;
  longitude: number;
  zoom: number;
  bearing: number;
  pitch: number;
}
