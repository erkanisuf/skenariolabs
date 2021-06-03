import React from "react";
import { ISpinner } from "../../types/spinnerTypes";

const Spinner: React.FC<ISpinner> = ({ loading, error, children }) => {
  if (error) {
    return <div>error</div>;
  } else if (loading) {
    return <div>loading...</div>;
  }
  return <>{children}</>;
};

export default Spinner;
