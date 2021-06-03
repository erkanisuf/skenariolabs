import React from "react";

import "./App.css";
import Form from "./components/Form/Form";
import { useAppDispatch } from "./Redux/reduxhooks";
import { addProperty } from "./Redux/slices/propertiesSlice";
import { IProperty } from "./types/propertyTypes";

function App() {
  const CreateNewProperty = (newproperty: IProperty) => {};
  console.log(`${process.env.REACT_MAP_GL_KEY}`);
  return (
    <div className="App">
      <h1>Skenario Labs</h1>
      <Form type={"CREATE"} SubmitForm={CreateNewProperty} />
    </div>
  );
}

export default App;
