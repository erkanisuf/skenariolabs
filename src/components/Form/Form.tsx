import React, { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { defaultPropertyValues } from "../../helpers/defaultVariables";
import { IForm } from "../../types/formTypes";
import { IProperty } from "../../types/propertyTypes";

const Form: React.FC<IForm> = ({ type, propertyToEdit, SubmitForm }) => {
  //React-Hook-Form Setup
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    getValues,
    clearErrors,
    formState: { errors },
  } = useForm<IProperty | any>({
    mode: "all",
    shouldFocusError: true,
    defaultValues: type === "EDIT" ? propertyToEdit : defaultPropertyValues,
  });

  // SetValue accepts field name and value, it works only for single field thats why i loop the keys and values of the editing object.
  // If the form is in mode to edit property , it changes the default values of the input with propertie`s values.
  useEffect(() => {
    if (type === "EDIT") {
      for (const [key, value] of Object.entries(propertyToEdit)) {
        setValue(key, value);
      }
    }
  }, [type, propertyToEdit, setValue]);

  const FormSubmit: SubmitHandler<IProperty> = (data) => {
    SubmitForm(data); // this will push to redux store or edit (passing prop)
    reset(); // resets the form after submiting
  };
  return (
    <div>
      <form
        onSubmit={handleSubmit(FormSubmit)}
        style={{ display: "flex", flexDirection: "column", width: "50%" }}
      >
        <label>Name of the building</label>
        <input
          defaultValue="name"
          type="text"
          {...register("name", {
            required: "Name is missing!",
            minLength: { value: 2, message: "Minimum of 2(chars)" },
            maxLength: { value: 15, message: "Maximum of 15(chars)" },
          })}
        />
        <p>{errors.name ? errors.name.message : ""}</p>
        <label>Street</label>
        <input
          defaultValue="street"
          type="text"
          {...register("street", {
            required: "Street is missing!",
            minLength: { value: 2, message: "Minimum of 2(chars)" },
            maxLength: { value: 30, message: "Maximum of 30(chars)" },
          })}
        />
        <p>{errors.street ? errors.street.message : ""}</p>
        <label>Street number</label>
        <input
          defaultValue="number"
          type="text"
          {...register("number", {
            required: "Streetnumber is missing!",
            minLength: { value: 1, message: "Minimum of 1(char)" },
            maxLength: { value: 10, message: "Maximum of 10(chars)" },
          })}
        />
        <p>{errors.number ? errors.number.message : ""}</p>
        <label>Postalcode</label>
        <input
          defaultValue=""
          type="text"
          {...register("postalcode", {
            required: "Postcode is missing!",
            minLength: { value: 5, message: "Minimum of 5(char)" },
            maxLength: { value: 10, message: "Maximum of 10(chars)" },
          })}
        />
        <p>{errors.postalcode ? errors.postalcode.message : ""}</p>
        <label>City</label>
        <input
          defaultValue="city"
          type="text"
          {...register("city", {
            required: "City is missing!",
            minLength: { value: 3, message: "Minimum of 4(char)" },
            maxLength: { value: 10, message: "Maximum of 10(chars)" },
          })}
        />
        <p>{errors.city ? errors.city.message : ""}</p>
        <label>Municipality</label>
        <input
          defaultValue="municipality"
          type="text"
          {...register("municipality")}
        />

        <label>Country</label>
        <input
          defaultValue="country"
          type="text"
          {...register("country", {
            required: "Country is missing!",
            minLength: { value: 3, message: "Minimum of 3(char)" },
            maxLength: { value: 10, message: "Maximum of 10(chars)" },
          })}
        />
        <p>{errors.country ? errors.country.message : ""}</p>
        <label>Description</label>
        <textarea
          rows={10}
          defaultValue="description"
          {...register("description")}
        />

        <label>Coordinates</label>
        <input
          defaultValue="longitude"
          type="hidden"
          {...register("longitude", {
            required: "longitude is missing!",
            minLength: { value: 1, message: "Minimum of 1(char)" },
          })}
        />
        <p>{errors.longitude ? errors.longitude.message : ""}</p>
      </form>
    </div>
  );
};

export default Form;
