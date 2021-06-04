//Types for the Form Component
export interface IForm {
  type: formType;
  propertyToEdit?: any;
  SubmitForm: any;
}
export type formType = "CREATE" | "EDIT"; // form can be used for creating and editing.
