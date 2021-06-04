import React from "react";
import { IConfirmWindow } from "../../types/confirmWindowTypes";
import ConfirmWindowCSS from "./ConfirmWindow.module.css";
const ConfirmWindow: React.FC<IConfirmWindow> = ({
  open,
  children,
  submitConfirm,
  setClose,
}) => {
  return (
    <div
      className={ConfirmWindowCSS.container}
      style={{ display: open ? "flex" : "none" }}
    >
      <div className={ConfirmWindowCSS.windowChildren}>
        <div>Are you sure you want to delete: {children}</div>
        <div className={ConfirmWindowCSS.btnContainer}>
          <button onClick={submitConfirm}>Confirm</button>
          <button onClick={setClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmWindow;
