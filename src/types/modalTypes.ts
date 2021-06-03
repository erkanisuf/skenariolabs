import { ReactNode } from "react";

export interface IImodal {
  isModalOpen: boolean;
  children: ReactNode;
  closeModal: React.Dispatch<React.SetStateAction<boolean>>;
}
