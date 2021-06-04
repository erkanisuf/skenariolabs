import React from "react";
import { ReactNode } from "react";

export interface IConfirmWindow {
  open: boolean;
  children?: ReactNode;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  setClose: any;
  submitConfirm: any;
}
