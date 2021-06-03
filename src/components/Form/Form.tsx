import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { defaultPropertyValues } from "../../helpers/defaultVariables";
import { IForm } from "../../types/formTypes";
import { IProperty } from "../../types/propertyTypes";
import Modal from "../Modal/Modal";
import FormCSS from "./Form.module.css";
import { RiErrorWarningLine } from "react-icons/ri";
const Form: React.FC<IForm> = ({ type, propertyToEdit, SubmitForm }) => {
  const [isModalOpen, setisModalOpen] = useState<boolean>(false); // Opens Modal
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
      <button onClick={() => setisModalOpen(true)}>
        {type === "EDIT" ? "Edit" : "Add"}
      </button>
      <Modal isModalOpen={isModalOpen} closeModal={setisModalOpen}>
        <form className={FormCSS.container} onSubmit={handleSubmit(FormSubmit)}>
          <div className={FormCSS.inputContainer}>
            <div className={FormCSS.inputWrapper}>
              <label className={FormCSS.nameLabel}>Name of the building</label>
              <input
                placeholder="required"
                defaultValue="name"
                type="text"
                {...register("name", {
                  required: "Name is missing!",
                  minLength: { value: 2, message: "Minimum of 2(chars)" },
                  maxLength: { value: 15, message: "Maximum of 15(chars)" },
                })}
              />
            </div>
            <div className={FormCSS.errorWrapper}>
              {errors.name ? (
                <p>
                  <RiErrorWarningLine />
                  {errors.name.message}
                </p>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className={FormCSS.inputContainer}>
            <div className={FormCSS.inputWrapper}>
              <label>Street</label>
              <input
                placeholder="required"
                defaultValue="street"
                type="text"
                {...register("street", {
                  required: "Street is missing!",
                  minLength: { value: 2, message: "Minimum of 2(chars)" },
                  maxLength: { value: 30, message: "Maximum of 30(chars)" },
                })}
              />

              <label>Street number</label>
              <input
                placeholder="required"
                defaultValue="number"
                type="text"
                {...register("number", {
                  required: "Streetnumber is missing!",
                  minLength: { value: 1, message: "Minimum of 1(char)" },
                  maxLength: { value: 10, message: "Maximum of 10(chars)" },
                })}
              />
            </div>
            <div className={FormCSS.errorWrapper}>
              {errors.street ? (
                <p>
                  <RiErrorWarningLine />
                  {errors.street.message}
                </p>
              ) : (
                ""
              )}
              {errors.number ? (
                <p>
                  <RiErrorWarningLine />
                  {errors.number.message}
                </p>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className={FormCSS.inputContainer}>
            <div className={FormCSS.inputWrapper}>
              <label>Postalcode</label>
              <input
                placeholder="required"
                defaultValue=""
                type="text"
                {...register("postalcode", {
                  required: "Postcode is missing!",
                  minLength: { value: 5, message: "Minimum of 5(char)" },
                  maxLength: { value: 10, message: "Maximum of 10(chars)" },
                })}
              />

              <label>City</label>
              <input
                placeholder="required"
                defaultValue="city"
                type="text"
                {...register("city", {
                  required: "City is missing!",
                  minLength: { value: 3, message: "Minimum of 4(char)" },
                  maxLength: { value: 10, message: "Maximum of 10(chars)" },
                })}
              />
            </div>
            <div className={FormCSS.errorWrapper}>
              {errors.postalcode ? (
                <p>
                  <RiErrorWarningLine />
                  {errors.postalcode.message}
                </p>
              ) : (
                ""
              )}
              {errors.city ? (
                <p>
                  <RiErrorWarningLine />
                  {errors.city.message}
                </p>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className={FormCSS.inputContainer}>
            <div className={FormCSS.inputWrapper}>
              <label>Municipality</label>
              <input
                defaultValue="municipality"
                type="text"
                {...register("municipality")}
              />

              <label>Country</label>
              <input
                placeholder="required"
                defaultValue="country"
                type="text"
                {...register("country", {
                  required: "Country is missing!",
                  minLength: { value: 3, message: "Minimum of 3(char)" },
                  maxLength: { value: 10, message: "Maximum of 10(chars)" },
                })}
              />
            </div>
            <div className={FormCSS.errorWrapper}>
              {errors.country ? (
                <p>
                  <RiErrorWarningLine />
                  {errors.country.message}
                </p>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className={FormCSS.inputContainer}>
            <label>Description</label>
            <textarea
              rows={5}
              defaultValue="description"
              {...register("description")}
            />
          </div>
          <label>Coordinates</label>
          <input
            defaultValue="longitude"
            type="hidden"
            {...register("longitude", {
              required: "longitude is missing!",
              minLength: { value: 1, message: "Minimum of 1(char)" },
            })}
          />
          {errors.longitude ? <p> {errors.longitude.message}</p> : ""}
        </form>
      </Modal>
    </div>
  );
};

export default Form;
