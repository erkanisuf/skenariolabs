import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IpropertiesSLICE, IProperty } from "../../types/propertyTypes";
import type { RootState } from "../store";

const initialState: IpropertiesSLICE = {
  properties: [],
};

export const propertiesSlice = createSlice({
  name: "properties",
  initialState,
  reducers: {
    addProperty: (state, action: PayloadAction<IProperty>) => {
      state.properties = [...state.properties, action.payload];
    },
    removeProperty: (state, action: PayloadAction<IProperty>) => {
      const properties = [...state.properties];
      const indexOfProperty = properties
        .map((el) => el.id)
        .indexOf(action.payload.id);
      if (indexOfProperty !== -1) {
        properties.splice(indexOfProperty, 1);
      }
      state.properties = properties;
    },
    editProperty: (state, action: PayloadAction<IProperty>) => {
      const properties = [...state.properties];
      const indexOfProperty = properties
        .map((el) => el.id)
        .indexOf(action.payload.id);
      if (indexOfProperty !== -1) {
        properties[indexOfProperty] = action.payload;
      }
      state.properties = properties;
    },
  },
});

export const { addProperty, removeProperty, editProperty } =
  propertiesSlice.actions;

export const propertiesREDUCER = (state: RootState) => state.propertiesREDUCER;

export default propertiesSlice.reducer;
