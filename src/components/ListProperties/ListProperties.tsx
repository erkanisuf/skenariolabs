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
import { MdDelete } from "react-icons/md";
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
                    className={ListPropertiesCSS.delBtn}
                    onClick={() => deleteProperty(el)}
                  >
                    <MdDelete /> Delete
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
