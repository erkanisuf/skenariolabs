import React from "react";

import "./App.css";
import Form from "./components/Form/Form";
import { useAppDispatch } from "./Redux/reduxhooks";
import { addProperty } from "./Redux/slices/propertiesSlice";
import { IProperty } from "./types/propertyTypes";
import { v4 as uuidv4 } from "uuid";
import ListProperties from "./components/ListProperties/ListProperties";

function App() {
  const dispatch = useAppDispatch();
  const CreateNewProperty = (newproperty: IProperty) => {
    const propertyToStore = { ...newproperty, id: uuidv4() };
    dispatch(addProperty(propertyToStore));
  };
  console.log(`${process.env.REACT_MAP_GL_KEY}`);
  return (
    <div className="App">
      <h1>Skenario Labs</h1>
      <Form type={"CREATE"} SubmitForm={CreateNewProperty} />
      <ListProperties />
    </div>
  );
}

export default App;
