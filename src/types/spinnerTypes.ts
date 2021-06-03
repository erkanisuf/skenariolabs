import { ReactNode } from "react";

export interface ISpinner {
  loading: boolean;
  error: boolean;
  children: ReactNode;
}
