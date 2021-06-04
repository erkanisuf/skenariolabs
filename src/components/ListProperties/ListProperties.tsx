import React from "react";
import { useAppDispatch, useAppSelector } from "../../Redux/reduxhooks";
import {
  editProperty,
  removeProperty,
} from "../../Redux/slices/propertiesSlice";
import { IProperty } from "../../types/propertyTypes";
import Form from "../Form/Form";
import { v4 as uuidv4 } from "uuid";
import ListPropertiesCSS from "./ListProperties.module.css";
const ListProperties = () => {
  const { properties } = useAppSelector((state) => state.propertiesREDUCER);
  const dispatch = useAppDispatch();
  const deleteProperty = (property: IProperty) => {
    dispatch(removeProperty(property));
  };
  const updateProperty = (property: IProperty) => {
    dispatch(editProperty(property));
  };
  return (
    <div className={ListPropertiesCSS.container}>
      <table style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>id</th>
            <th>Property name</th>
            <th>Latitude</th>
            <th>Longitude</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {properties.map((el: IProperty, index: number) => {
            return (
              <tr key={uuidv4()}>
                <td>{el.id}</td>
                <td>{el.name}</td>
                <td>{el.latitude}</td>
                <td>{el.longitude}</td>
                <td>
                  <button
                    className={ListPropertiesCSS.delBtn}
                    onClick={() => deleteProperty(el)}
                  >
                    Delete
                  </button>
                  <Form
                    type="EDIT"
                    SubmitForm={updateProperty}
                    propertyToEdit={el}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ListProperties;
