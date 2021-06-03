export interface IpropertiesSLICE {
  properties: IProperty[];
}

// Main type for properties , this one submits from the form ,also for edit is used.
export interface IProperty {
  id: string;
  name: string;
  street: string;
  number: string;
  postalcode: string;
  city: string;
  municipality: string;
  country: string;
  description?: string;
  latitude?: number | null;
  longitude?: number | null;
}
