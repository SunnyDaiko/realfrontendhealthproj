import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core';
import classes from './UpdatePatientForm.module.css';
import Toast from '../toast/Toast';
// import { usePatient } from '../../utils/PatientContext';
import { updatePatient } from '../product-page/ProductService';
// import convertDateToMMDDYYYY from '../../utils/DateConverter';
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
  validateZipCode,
  validateBillingCode,
  validateChiefComplaint,
  validateCopay,
  validateDate,
  validateDiastolicPressure,
  validateIcd10,
  validatePulse,
  validateSystolicPressure,
  validateTotalCost,
  validateVisitCode
} from './validateUtilities';

/**
 * Represents the Create Product Form component.
 * @param {Object} props - The component props.
 * @param {Function} props.setShowToast - A function to set the visibility of the toast.
 * @param {Function} props.setProducts - A function to set the products.
 * @param {Function} props.setApiError - A function to set the API error
 * @returns {JSX.Element} The JSX representation of the form used to create a new product.
 */
const UpdatePatientForm = ({
  setShowToast, setPatients, setApiError, patientId
}) => {
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
    gender: '',
    billingCode: '',
    chiefComplaints: '',
    copay: '',
    date: '',
    diastolicPressure: '',
    icd10: '',
    pulse: '',
    systolicPressure: '',
    totalCost: '',
    visitCode: ''

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
    gender: '',
    billingCode: '',
    chiefComplaint: '',
    copay: '',
    date: '',
    diastolicPressure: '',
    icd10: '',
    pulse: '',
    systolicPressure: '',
    totalCost: '',
    visitCode: ''
  });

  //   const { patient } = usePatient();

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const response = await fetch(`http://localhost:8085/patients/${patientId}`);
        if (response.ok) {
          const data = await response.json();
          setFormData({
            firstName: data.firstName || '',
            lastName: data.lastName || '',
            ssn: data.ssn || '',
            email: data.email || '',
            street: data.street || '',
            city: data.city || '',
            state: data.state || '',
            zipCode: data.zipCode || '',
            age: data.age || '',
            height: data.height || '',
            weight: data.weight || '',
            insurance: data.insurance || '',
            gender: data.gender || ''
          });
        } else {
          // Handle the error case, e.g., set an error state
        }
      } catch (error) {
        // Handle any network or fetch-related errors
      }
    };

    fetchPatient();
  }, [patientId]);

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
    const [billingCode, error14] = validateBillingCode(formData.billingCode);
    const [chiefComplaint, error15] = validateChiefComplaint(formData.chiefComplaint);
    const [copay, error16] = validateCopay(formData.copay);
    const [date, error17] = validateDate(formData.date);
    const [diastolicPressure, error18] = validateDiastolicPressure(formData.diastolicPressure);
    const [icd10, error19] = validateIcd10(formData.icd10);
    const [pulse, error20] = validatePulse(formData.pulse);
    const [systolicPressure, error21] = validateSystolicPressure(formData.systolicPressure);
    const [totalCost, error22] = validateTotalCost(formData.totalCost);
    const [visitCode, error23] = validateVisitCode(formData.visitCode);
    const errorsInForm = [error1, error2, error3, error4, error5, error6, error7,
      error8, error9, error10, error11, error12,
      error13, error14, error15, error16, error17,
      error18, error19, error20, error21, error22, error23];
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
        gender,
        billingCode,
        chiefComplaint,
        copay,
        date,
        diastolicPressure,
        icd10,
        pulse,
        systolicPressure,
        totalCost,
        visitCode
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
    const updatedFormData = { ...formData };
    const hasError = validatePatientForm();
    if (!hasError) {
      updatePatient(
        patientId,
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
      <h1>Patient Detail Page</h1>
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
            <h1>Patient Encounter</h1>
            <label htmlFor="notes" className={classes.label}>
              Notes
              <input type="text" id="notes" className={classes.input} name="notes" value={formData.notes} onChange={handleInputChange} />
            </label>
            <label htmlFor="visitCode" className={classes.label}>
              Visit Code
              <input type="text" id="visitCode" className={errorMessage.visitCode !== '' ? classes.invalidInput : classes.input} name="visitCode" value={formData.visitCode} onChange={handleInputChange} />
              <div className={classes.errorContainer}>
                {errorMessage.visitCode !== '' && <div className={classes.error}>{errorMessage.visitCode}</div>}
              </div>
            </label>
            <label htmlFor="provider" className={classes.label}>
              Provider
              <input type="text" id="provider" className={errorMessage.provider !== '' ? classes.invalidInput : classes.input} name="provider" value={formData.provider} onChange={handleInputChange} />
              <div className={classes.errorContainer}>
                {errorMessage.provider !== '' && <div className={classes.error}>{errorMessage.provider}</div>}
              </div>
            </label>
            <label htmlFor="billingCode" className={classes.label}>
              BillingCode
              <input type="text" id="billingCode" className={errorMessage.billingCode !== '' ? classes.invalidInput : classes.input} name="billingCode" value={formData.billingCode} onChange={handleInputChange} />
              <div className={classes.errorContainer}>
                {errorMessage.billingCode !== '' && <div className={classes.error}>{errorMessage.billingCode}</div>}
              </div>
            </label>
            <label htmlFor="icd10" className={classes.label}>
              Icd10
              <input type="text" id="icd10" className={errorMessage.icd10 !== '' ? classes.invalidInput : classes.input} name="icd10" value={formData.icd10} onChange={handleInputChange} />
              <div className={classes.errorContainer}>
                {errorMessage.icd10 !== '' && <div className={classes.error}>{errorMessage.icd10}</div>}
              </div>
            </label>
            <label htmlFor="totalCost" className={classes.label}>
              TotalCost
              <input type="text" id="totalCost" className={errorMessage.totalCost !== '' ? classes.invalidInput : classes.input} name="totalCost" value={formData.totalCost} onChange={handleInputChange} />
              <div className={classes.errorContainer}>
                {errorMessage.totalCost !== '' && <div className={classes.error}>{errorMessage.totalCost}</div>}
              </div>
            </label>
            <label htmlFor="copay" className={classes.label}>
              Copay
              <input type="text" id="copay" className={errorMessage.copay !== '' ? classes.invalidInput : classes.input} name="copay" value={formData.copay} onChange={handleInputChange} />
              <div className={classes.errorContainer}>
                {errorMessage.copay !== '' && <div className={classes.error}>{errorMessage.copay}</div>}
              </div>
            </label>
            <label htmlFor="chiefComplaint" className={classes.label}>
              ChiefComplaint
              <input type="text" id="chiefComplaint" className={errorMessage.chiefComplaint !== '' ? classes.invalidInput : classes.input} name="chiefComplaint" value={formData.chiefComplaint} onChange={handleInputChange} />
              <div className={classes.errorContainer}>
                {errorMessage.chiefComplaint !== '' && <div className={classes.error}>{errorMessage.chiefComplaint}</div>}
              </div>
            </label>
            <label htmlFor="pulse" className={classes.label}>
              Pulse
              <input type="text" id="pulse" className={errorMessage.pulse !== '' ? classes.invalidInput : classes.input} name="pulse" value={formData.pulse} onChange={handleInputChange} />
              <div className={classes.errorContainer}>
                {errorMessage.pulse !== '' && <div className={classes.error}>{errorMessage.pulse}</div>}
              </div>
            </label>
            <label htmlFor="systolicPressure" className={classes.label}>
              SystolicPressure
              <input type="text" id="systolicPressure" className={errorMessage.systolicPressure !== '' ? classes.invalidInput : classes.input} name="systolicPressure" value={formData.systolicPressure} onChange={handleInputChange} />
              <div className={classes.errorContainer}>
                {errorMessage.systolicPressure !== '' && <div className={classes.error}>{errorMessage.systolicPressure}</div>}
              </div>
            </label>
            <label htmlFor="diastolicPressure" className={classes.label}>
              DiastolicPressure
              <input type="text" id="diastolicPressure" className={errorMessage.diastolicPressure !== '' ? classes.invalidInput : classes.input} name="diastolicPressure" value={formData.diastolicPressure} onChange={handleInputChange} />
              <div className={classes.errorContainer}>
                {errorMessage.diastolicPressure !== '' && <div className={classes.error}>{errorMessage.diastolicPressure}</div>}
              </div>
            </label>
            <label htmlFor="date" className={classes.label}>
              Date
              <input type="text" id="date" className={errorMessage.date !== '' ? classes.invalidInput : classes.input} name="date" value={formData.date} onChange={handleInputChange} />
              <div className={classes.errorContainer}>
                {errorMessage.date !== '' && <div className={classes.error}>{errorMessage.date}</div>}
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

export default UpdatePatientForm;
