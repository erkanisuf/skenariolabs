import { IAPIResponse } from "../types/apiTypes";
import { ICordsMapViewCoordinates } from "../types/cordsMapViewTypes";
import { IProperty } from "../types/propertyTypes";

// for property object used
export const defaultPropertyValues: IProperty = {
  id: "",
  name: "",
  street: "",
  number: "",
  postalcode: "",
  city: "",
  municipality: "",
  country: "",
  description: "",
  longitude: null,
  latitude: null,
};

//for the Map Component because its required to these params
export const defaultIApiResponsevalues: IAPIResponse[] = [
  {
    properties: { lat: 0, lon: 0, formatted: "" },
  },
];

// default CordsMapView variable
export const defaultViewPortCoordinates: ICordsMapViewCoordinates = {
  latitude: 0,
  longitude: 0,
  zoom: 15,
  bearing: 0,
  pitch: 0,
};

// used by the CordsMapView component for the map view styling
export const geolocateStyle = {
  top: 0,
  left: 0,
  padding: "10px",
};

export const fullscreenControlStyle = {
  top: 36,
  left: 0,
  padding: "10px",
};

export const navStyle = {
  top: 72,
  left: 0,
  padding: "10px",
};

export const scaleControlStyle = {
  bottom: 36,
  left: 0,
  padding: "10px",
};
