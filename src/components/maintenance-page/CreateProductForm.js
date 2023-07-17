import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core';
import classes from './CreateProductForm.module.css';
import Toast from '../toast/Toast';
import { createPatient } from '../product-page/ProductService';
import convertDateToMMDDYYYY from '../../utils/DateConverter';
import {
  validateFirstName,
  validateLastName,
  validateAge,
  validateCity,
  validateInsurance,
  validateStreet,
  validateHeight,
  validateWeight,
  validateState,
  validateSsn,
  validateEmail,
  validateGender,
  validateZipCode
} from './validateUtilities';

/**
 * Represents the Create Product Form component.
 * @param {Object} props - The component props.
 * @param {Function} props.setShowToast - A function to set the visibility of the toast.
 * @param {Function} props.setProducts - A function to set the products.
 * @param {Function} props.setApiError - A function to set the API error
 * @returns {JSX.Element} The JSX representation of the form used to create a new product.
 */
const CreateProductForm = ({ setShowToast, setPatients, setApiError }) => {
  const history = useHistory();

  /**
   * Represents the state of the error toast.
   * @type {boolean}
   */
  const [showErrorToast, setShowErrorToast] = useState(false);

  /**
   * Represents the form data state.
   * @type {Object}
   */
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    ssn: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    age: '',
    height: '',
    weight: '',
    insurance: '',
    gender: ''
  });

  const [errorMessage, setErrorMessage] = useState({
    firstName: '',
    lastName: '',
    ssn: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    age: '',
    height: '',
    weight: '',
    insurance: '',
    gender: ''
  });

  useEffect(() => {
  }, [formData, errorMessage]);

  /**
   * Handles the input changes.
   * @param {Object} event - The input change event.
   */
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    let convertedValue = value;
    if (name === 'dateCreated') {
      convertedValue = new Date(value).toISOString();
    }
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: convertedValue
    }));
  };
  /**
  * Uses helper functions from validateUtilities to check
  * each field of the product form for valid input.
  * @returns A boolean value
  */
  const validatePatientForm = () => {
    const [firstName, error1] = validateFirstName(formData.firstName);
    const [lastName, error2] = validateLastName(formData.lastName);
    const [age, error3] = validateAge(formData.age);
    const [height, error4] = validateHeight(formData.height);
    const [weight, error5] = validateWeight(formData.weight);
    const [street, error6] = validateStreet(formData.street);
    const [city, error7] = validateCity(formData.city);
    const [state, error8] = validateState(formData.state);
    const [insurance, error9] = validateInsurance(formData.insurance);
    const [ssn, error10] = validateSsn(formData.ssn);
    const [email, error11] = validateEmail(formData.email);
    const [zipCode, error12] = validateZipCode(formData.zipCode);
    const [gender, error13] = validateGender(formData.gender);
    const errorsInForm = [error1, error2, error3, error4, error5, error6, error7,
      error8, error9, error10, error11, error12, error13];
    const hasError = errorsInForm.some((error) => error === true);

    setErrorMessage(
      {
        firstName,
        lastName,
        age,
        height,
        weight,
        street,
        city,
        state,
        insurance,
        ssn,
        email,
        zipCode,
        gender
      }
    );
    return hasError;
  };

  /**
   * Handles the submission of the form.
   * @param {Object} event - The form submission event.
   */
  const handleSubmit = (event) => {
    event.preventDefault();
    const convertedReleaseDate = convertDateToMMDDYYYY(formData.releaseDate);
    const updatedFormData = { ...formData, releaseDate: convertedReleaseDate };
    const hasError = validatePatientForm();
    if (!hasError) {
      createPatient(
        updatedFormData,
        setShowToast,
        setShowErrorToast,
        history,
        setPatients,
        setApiError
      );
    }
  };

  return (
    <div className={classes.entireForm}>
      {showErrorToast && (
        <Toast
          show={showErrorToast}
          handleClose={() => setShowErrorToast(false)}
          type="error"
          message="Database unavailable. Please refresh and try again."
        />
      )}
      <h1>New Patient Form</h1>
      <div className={classes.formDiv}>
        <form onSubmit={handleSubmit}>
          <div className={classes.fcol}>
            <label htmlFor="firstName" className={classes.label}>
              First Name
              <input type="text" id="firstName" className={errorMessage.firstName !== '' ? classes.invalidInput : classes.input} name="firstName" value={formData.firstName} onChange={handleInputChange} />
              <div className={classes.errorContainer}>
                {errorMessage.firstName !== '' && <div className={classes.error}>{errorMessage.firstName}</div>}
              </div>
            </label>
            <label htmlFor="lastName" className={classes.label}>
              Last Name
              <input id="lastName" name="lastName" className={errorMessage.lastName !== '' ? classes.invalidInput : classes.input} value={formData.lastName} onChange={handleInputChange} />
              <div className={classes.errorContainer}>
                {errorMessage.lastName !== '' && <div className={classes.error}>{errorMessage.lastName}</div>}
              </div>
            </label>
            <label htmlFor="age" className={classes.label}>
              Age
              <input type="text" id="age" className={errorMessage.age !== '' ? classes.invalidInput : classes.input} name="age" value={formData.age} onChange={handleInputChange} />
              <div className={classes.errorContainer}>
                {errorMessage.age !== '' && <div className={classes.error}>{errorMessage.age}</div>}
              </div>
            </label>
            <label htmlFor="height" className={classes.label}>
              Height
              <input type="text" id="height" name="height" className={errorMessage.height !== '' ? classes.invalidInput : classes.input} value={formData.height} onChange={handleInputChange} />
              <div className={classes.errorContainer}>
                {errorMessage.height !== '' && <div className={classes.error}>{errorMessage.height}</div>}
              </div>
            </label>
            <label htmlFor="weight" className={classes.label}>
              Weight
              <input id="weight" name="weight" className={errorMessage.weight !== '' ? classes.invalidInput : classes.input} value={formData.weight} onChange={handleInputChange} />
              <div className={classes.errorContainer}>
                {errorMessage.weight !== '' && <div className={classes.error}>{errorMessage.weight}</div>}
              </div>
            </label>
            <label htmlFor="ssn" className={classes.label}>
              SSN
              <input type="text" id="ssn" className={errorMessage.ssn !== '' ? classes.invalidInput : classes.input} name="ssn" value={formData.ssn} onChange={handleInputChange} />
              <div className={classes.errorContainer}>
                {errorMessage.ssn !== '' && <div className={classes.error}>{errorMessage.ssn}</div>}
              </div>
            </label>
            <label htmlFor="email" className={classes.label}>
              Email
              <input type="text" id="email" className={errorMessage.email !== '' ? classes.invalidInput : classes.input} name="email" value={formData.email} onChange={handleInputChange} />
              <div className={classes.errorContainerSpecial}>
                {errorMessage.email !== '' && <div className={classes.error}>{errorMessage.email}</div>}
              </div>
            </label>
            <label htmlFor="street" className={classes.label}>
              Street
              <input type="text" id="street" className={errorMessage.street !== '' ? classes.invalidInput : classes.input} name="street" value={formData.street} onChange={handleInputChange} />
              <div className={classes.errorContainer}>
                {errorMessage.street !== '' && <div className={classes.error}>{errorMessage.street}</div>}
              </div>
            </label>
            <label htmlFor="city" className={classes.label}>
              City
              <input type="text" id="city" className={errorMessage.city !== '' ? classes.invalidInput : classes.input} name="city" value={formData.city} onChange={handleInputChange} />
              <div className={classes.errorContainer}>
                {errorMessage.city !== '' && <div className={classes.error}>{errorMessage.city}</div>}
              </div>
            </label>
            <label htmlFor="zipCode" className={classes.label}>
              Zipcode
              <input type="text" id="zipCode" className={errorMessage.zipCode !== '' ? classes.invalidInput : classes.input} name="zipCode" value={formData.zipCode} onChange={handleInputChange} />
              <div className={classes.errorContainer}>
                {errorMessage.zipCode !== '' && <div className={classes.error}>{errorMessage.zipCode}</div>}
              </div>
            </label>
            <label htmlFor="state" className={classes.label}>
              State
              <input type="text" id="state" className={errorMessage.state !== '' ? classes.invalidInput : classes.input} name="state" value={formData.state} onChange={handleInputChange} />
              <div className={classes.errorContainer}>
                {errorMessage.state !== '' && <div className={classes.error}>{errorMessage.state}</div>}
              </div>
            </label>
            <label htmlFor="insurance" className={classes.label}>
              Insurance
              <input type="text" id="insurance" className={errorMessage.insurance !== '' ? classes.invalidInput : classes.input} name="insurance" value={formData.insurance} onChange={handleInputChange} />
              <div className={classes.errorContainer}>
                {errorMessage.insurance !== '' && <div className={classes.error}>{errorMessage.insurance}</div>}
              </div>
            </label>
            <label htmlFor="gender" className={classes.label}>
              Gender
              <div className={classes.dropdown}>
                <select name="gender" id="gender" className={errorMessage.gender !== '' ? classes.invalidDropdown : classes.select} value={formData.gender} onChange={handleInputChange}>
                  <option value="Default">-</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className={classes.errorContainer}>
                {errorMessage.gender !== '' && <div className={classes.error}>{errorMessage.gender}</div>}
              </div>
            </label>
            <div className={classes.buttonsContainer}>
              <Button type="button" variant="outlined" className={classes.cancelButton} onClick={() => history.push('/Patients')}>Cancel</Button>
              <Button type="submit" variant="contained" className={classes.submitButton}>Submit</Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProductForm;
