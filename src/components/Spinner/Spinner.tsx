import React from "react";
import { ISpinner } from "../../types/spinnerTypes";
import { ImSpinner9 } from "react-icons/im";
import SpinnerCSS from "./Spinner.module.css";
import { BiErrorAlt } from "react-icons/bi";
const Spinner: React.FC<ISpinner> = ({
  loading,
  error,
  children,
  refreshButton,
}) => {
  if (error) {
    return (
      <div className={SpinnerCSS.error}>
        <BiErrorAlt />
        Error! Something went wrong !
        <div className={SpinnerCSS.refresh}>
          {refreshButton}
          <p>Try again?</p>
        </div>
      </div>
    );
  } else if (loading) {
    return (
      <div className={SpinnerCSS.loading}>
        <ImSpinner9 />
        Fetching coordinates , please wait! ...
      </div>
    );
  }
  return <>{children}</>;
};

export default Spinner;
