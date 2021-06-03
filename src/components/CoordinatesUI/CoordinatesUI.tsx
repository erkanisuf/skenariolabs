import React, { useEffect, useState } from "react";
import { fetchData } from "../../helpers/fetchCoordinates";
import { IApiProperty, IAPIResponse } from "../../types/apiTypes";
import { ICoordinatesUI } from "../../types/coordinatesUITypes";
import CordsMapView from "../CordsMapView.tsx/CordsMapView";
import { v4 as uuidv4 } from "uuid";
import Spinner from "../Spinner/Spinner";
const CoordinatesUI: React.FC<ICoordinatesUI> = ({
  formValues,
  setCordinates,
  reset,
  errors,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [searchFor, setSearchFor] = useState<string>(""); //shows to the UI the searching query
  const [foundCoordinates, setFoundCoordinates] = useState<IAPIResponse[]>([]); // coordinates results of the api
  const [isMapOpen, setOpenMap] = useState<boolean>(false); // Opens the CordsMapView Component
  //sets view to the CordsMapView Component
  const [viewPort, setViewPort] = useState<IApiProperty>({
    lat: 0,
    lon: 0,
    formatted: "",
  });

  useEffect(() => {
    setFoundCoordinates([]);
  }, [reset]);

  const SetCoordinatesAndViewPort = (coordinates: IApiProperty) => {
    setViewPort(coordinates);
    setCordinates(coordinates);
  };
  const GetCoordinates = () => {
    if (isAnySearchValue()) {
      fetchData(
        formValues,
        setSearchFor,
        setFoundCoordinates,
        setOpenMap,
        setViewPort,
        setLoading,
        setError
      );
    }
  };
  //Checks if form`s inputs has atleast one value
  const isAnySearchValue = () => {
    const inputvalues = formValues();
    inputvalues.description = inputvalues.name; // This is pretty much to exclude this property , its not needed for the search query. And if only this field is filled it causes error.
    return Object.values(inputvalues).some((val) => val);
  };
  console.log(isAnySearchValue());

  return (
    <Spinner loading={loading} error={error}>
      <div style={{ backgroundColor: "green", minHeight: "500px" }}>
        <p>Searching for: {searchFor}</p>
        <button
          type="button"
          onClick={GetCoordinates}
          disabled={Object.keys(errors).length > 0}
        >
          Proceed to get Coordinates
        </button>
        {foundCoordinates.map((el, index) => {
          return (
            <div key={index}>
              <input
                type="radio"
                name="selectedcoordinate"
                key={uuidv4()}
                onChange={() => SetCoordinatesAndViewPort(el.properties)}
              />
              {el.properties.formatted},{el.properties.district},(
              {el.properties.lat},{el.properties.lon})
            </div>
          );
        })}
        <CordsMapView
          coordinates={foundCoordinates}
          open={isMapOpen}
          focusViewport={viewPort}
        />
        <input
          type="submit"
          value="submit"
          disabled={Object.keys(errors).length > 0}
        />
      </div>
    </Spinner>
  );
};

export default CoordinatesUI;
