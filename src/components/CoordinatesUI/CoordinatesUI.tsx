import React, { useEffect, useState } from "react";
import { fetchData } from "../../helpers/fetchCoordinates";
import { IApiProperty, IAPIResponse } from "../../types/apiTypes";
import { ICoordinatesUI } from "../../types/coordinatesUITypes";
import CordsMapView from "../CordsMapView.tsx/CordsMapView";
import { v4 as uuidv4 } from "uuid";
import Spinner from "../Spinner/Spinner";
import { RiRefreshFill } from "react-icons/ri";
import { BiCurrentLocation } from "react-icons/bi";
import { AiOutlineFileAdd } from "react-icons/ai";
import CoordinatesUICSS from "./CoordinatesUI.module.css";
const CoordinatesUI: React.FC<ICoordinatesUI> = ({
  formValues,
  setCordinates,
  reset,
  errors,
  formType,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [radiobutton, setRadiobutton] = useState<string>("");
  const [searchFor, setSearchFor] = useState<string>(""); //shows to the UI the searching query
  const [foundCoordinates, setFoundCoordinates] = useState<IAPIResponse[]>([]); // coordinates results of the api
  const [isMapOpen, setOpenMap] = useState<boolean>(false); // Opens the CordsMapView Component
  //sets view to the CordsMapView Component
  const [viewPort, setViewPort] = useState<IApiProperty>({
    lat: 0,
    lon: 0,
    formatted: "",
  });

  //Resets the Component after submitting
  useEffect(() => {
    setFoundCoordinates([]);
    setRadiobutton("");
  }, [reset]);

  const SetCoordinatesAndViewPort = (e: any, coordinates: IApiProperty) => {
    setRadiobutton(e.target.value);
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

  //refresh function with button if error happens
  const RefreshFetchRequest = () => {
    GetCoordinates();
  };
  const RefreshButton = () => {
    return (
      <button onClick={RefreshFetchRequest}>
        <RiRefreshFill />
      </button>
    );
  };
  return (
    <Spinner loading={loading} error={error} refreshButton={<RefreshButton />}>
      <div className={CoordinatesUICSS.container}>
        <div>
          <span> {searchFor}</span>
          {foundCoordinates.map((el, index) => {
            return (
              <div key={uuidv4()} className={CoordinatesUICSS.radioWrapper}>
                <input
                  value={el.properties.formatted}
                  checked={el.properties.formatted === radiobutton}
                  type="radio"
                  name="selectedcoordinate"
                  onChange={(e) => SetCoordinatesAndViewPort(e, el.properties)}
                />
                {el.properties.formatted},{el.properties.district},(
                {el.properties.lat},{el.properties.lon})
              </div>
            );
          })}
        </div>
        <CordsMapView
          coordinates={foundCoordinates}
          open={isMapOpen}
          focusViewport={viewPort}
        />
        <div className={CoordinatesUICSS.buttonsWrapper}>
          {formType === "EDIT" ? (
            <span>
              {formValues("latitude")} , {formValues("longitude")}
            </span>
          ) : (
            ""
          )}
          <button
            className={CoordinatesUICSS.getButton}
            type="button"
            onClick={GetCoordinates}
          >
            <BiCurrentLocation /> Get coordinates
          </button>
          <button type="submit" onClick={() => setSearchFor("")}>
            {" "}
            <AiOutlineFileAdd />{" "}
            {formType === "EDIT" ? "Save Changes" : "Submit"}
          </button>
        </div>
      </div>
    </Spinner>
  );
};

export default CoordinatesUI;
