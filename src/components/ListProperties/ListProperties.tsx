import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../Redux/reduxhooks";
import {
  editProperty,
  removeProperty,
} from "../../Redux/slices/propertiesSlice";
import { IProperty } from "../../types/propertyTypes";
import Form from "../Form/Form";
import { v4 as uuidv4 } from "uuid";
import ListPropertiesCSS from "./ListProperties.module.css";
import { MdDelete } from "react-icons/md";
import { FaMapMarkerAlt } from "react-icons/fa";
import ConfirmWindow from "../ConfirmWIndow/ConfirmWindow";
import Modal from "../Modal/Modal";
import CordsMapView from "../CordsMapView.tsx/CordsMapView";
import { IAPIResponse } from "../../types/apiTypes";
import {
  defaultIApiResponsevalues,
  defaultPropertyValues,
} from "../../helpers/defaultVariables";
const ListProperties = () => {
  const { properties } = useAppSelector((state) => state.propertiesREDUCER);
  const dispatch = useAppDispatch();
  const [confirmWindow, setconfirmWindow] = useState<boolean>(false); // opens confirm window to delete option
  const [isModalOpen, setisModalOpen] = useState<boolean>(false); // Opens Modal with the map and description
  const [property, setProperty] = useState<IProperty>(defaultPropertyValues);
  const [cordsToMap, setCordsToMap] = useState<IAPIResponse[]>(
    defaultIApiResponsevalues
  );

  const deleteProperty = (property: IProperty) => {
    dispatch(removeProperty(property));
    setconfirmWindow(false);
  };
  const updateProperty = (property: IProperty) => {
    dispatch(editProperty(property));
  };
  //Deletion confirmation

  const OpenConfirmWindow = (property: IProperty) => {
    setProperty(property);
    setconfirmWindow(true);
  };
  // Opens Modal with description and Map with coordinates
  const OpenInfo = (property: IProperty) => {
    setProperty(property);
    const coordinates: IAPIResponse = {
      properties: {
        lat: property.latitude ? property.latitude : 0,
        lon: property.longitude ? property.longitude : 0,
        formatted: property.street ? property.street : "",
      },
    };
    const coordinatesToMap = []; //Because CordsMapView takes prop as array;
    coordinatesToMap.push(coordinates);
    setCordsToMap(coordinatesToMap);
    setisModalOpen(true);
  };

  if (!properties.length) {
    return (
      <h2 style={{ textAlign: "center", marginTop: "150px", color: "grey" }}>
        No properties in store yet!
      </h2>
    );
  }
  return (
    <div className={ListPropertiesCSS.container}>
      <table>
        <thead>
          <tr>
            <th>Property name</th>
            <th>City</th>
            <th>Postalcode</th>
            <th>Country</th>
            <th>Street</th>
            <th>Str. number</th>
            <th>Latitude</th>
            <th>Longitude</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {properties.map((el: IProperty, index: number) => {
            return (
              <tr key={uuidv4()}>
                <td>{el.name}</td>
                <td>{el.city}</td>
                <td>{el.postalcode}</td>
                <td>{el.country}</td>
                <td>{el.street}</td>
                <td>{el.number}</td>
                <td>{el.latitude}</td>
                <td>{el.longitude}</td>
                <td>
                  <button
                    data-testid="delBtn"
                    className={ListPropertiesCSS.delBtn}
                    onClick={() => OpenConfirmWindow(el)}
                  >
                    <MdDelete /> Delete
                  </button>

                  <Form
                    type="EDIT"
                    SubmitForm={updateProperty}
                    propertyToEdit={el}
                  />
                  <button
                    data-testid="infoBtn"
                    className={ListPropertiesCSS.infoBtn}
                    onClick={() => OpenInfo(el)}
                  >
                    <FaMapMarkerAlt />
                    Info
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <ConfirmWindow
        submitConfirm={() => deleteProperty(property)}
        open={confirmWindow}
        setClose={() => setconfirmWindow(false)}
        children={property.name}
      />
      <Modal isModalOpen={isModalOpen} closeModal={setisModalOpen}>
        <p style={{ textAlign: "center" }}>{property.name}</p>
        <CordsMapView
          open={true}
          coordinates={cordsToMap}
          focusViewport={cordsToMap[0].properties}
        />
        <p style={{ textAlign: "center" }}>Description:</p>
        <p style={{ textAlign: "center" }}>{property.description}</p>
      </Modal>
    </div>
  );
};

export default ListProperties;
