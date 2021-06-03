import React, { useEffect, useState } from "react";
import { fetchData } from "../../helpers/fetchCoordinates";
import { IApiProperty, IAPIResponse } from "../../types/apiTypes";
import { ICoordinatesUI } from "../../types/coordinatesUITypes";

const CoordinatesUI: React.FC<ICoordinatesUI> = ({
  formValues,
  setCordinates,
  reset,
  errors,
}) => {
  const [searchFor, setSearchFor] = useState<any>();
  const [foundCoordinates, setFoundCoordinates] = useState<IAPIResponse[]>([]);

  useEffect(() => {
    setFoundCoordinates([]);
  }, [reset]);

  const SetCoordinatesAndViewPort = (coordinates: IApiProperty) => {
    setCordinates(coordinates);
  };

  return (
    <div style={{ backgroundColor: "green", minHeight: "500px" }}>
      <p>Searching for: {searchFor}</p>
      <button
        type="button"
        onClick={() => fetchData(formValues, setSearchFor, setFoundCoordinates)}
      >
        Proceed to get Coordinates
      </button>
      {foundCoordinates.map((el, index) => {
        return (
          <div key={index}>
            <input
              type="radio"
              name="selectedcoordinate"
              key={index}
              onChange={() => SetCoordinatesAndViewPort(el.properties)}
            />
            {el.properties.formatted},{el.properties.district},(
            {el.properties.lat},{el.properties.lon})
          </div>
        );
      })}

      <input
        type="submit"
        value="submit"
        disabled={Object.keys(errors).length > 0}
      />
    </div>
  );
};

export default CoordinatesUI;
