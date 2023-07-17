/**
 * Validates user input matches a regex.
 * @param {String} name
 * @returns An two value array
 */
export const validateFirstName = (firstName) => {
  const nameRegex = /^[A-Za-z'-]+$/;
  let hasError = true;
  let firstNameError = '';
  if (firstName < 2 && !nameRegex.test(firstName)) {
    firstNameError = 'First Name must be at least 2 characters long and only have numbers.';
  } else if (!nameRegex.test(firstName)) {
    firstNameError = 'First Name must have only letters.';
  } else if (firstName.length < 1) {
    firstNameError = 'First Name cannot be blank';
  } else {
    firstNameError = '';
    hasError = false;
  }
  const nameData = [firstNameError, hasError];
  return nameData;
};

/**
 * Validates user input matches a regex.
 * @param {String} lastName
 * @returns An two value array
 */
export const validateLastName = (lastName) => {
  const nameRegex = /^[A-Za-z'-]+$/;
  let hasError = true;
  let lastNameError = '';
  if (lastName < 2 && !nameRegex.test(lastName)) {
    lastNameError = 'Last Name must be at least 2 characters long and only have numbers.';
  } else if (!nameRegex.test(lastName)) {
    lastNameError = 'Last Name must have only letters.';
  } else if (lastName.length < 1) {
    lastNameError = 'Last Name cannot be blank.';
  } else {
    lastNameError = '';
    hasError = false;
  }
  const nameData = [lastNameError, hasError];
  return nameData;
};

/**
 * Validates user input matches a regex.
 * @param {String} age
 * @returns An two value array
 */
export const validateAge = (age) => {
  let hasError = true;
  let ageError = '';
  const regex = /^[0-9]+$/;

  if (!regex.test(age)) {
    ageError = 'The age must be a number.';
  } else if (age < 1) {
    ageError = 'Age cannot be blank.';
  } else {
    ageError = '';
    hasError = false;
  }
  const ageData = [ageError, hasError];
  return ageData;
};

/**
 * Validates user input matches a regex.
 * @param {String} height
 * @returns An two value array
 */
export const validateHeight = (height) => {
  let hasError = true;
  let heightError = '';
  const regex = /^[0-9]+$/;

  if (!regex.test(height)) {
    heightError = 'The height must be a number.';
  } else if (height < 1) {
    heightError = 'Height cannot be blank.';
  } else {
    heightError = '';
    hasError = false;
  }
  const heightData = [heightError, hasError];
  return heightData;
};

/**
 * Validates user input matches a regex.
 * @param {String} weight
 * @returns An two value array
 */
export const validateWeight = (weight) => {
  let hasError = true;
  let weightError = '';
  const regex = /^[0-9]+$/;

  if (!regex.test(weight)) {
    weightError = 'The weight must be a number.';
  } else if (weight < 1) {
    weightError = 'Weight cannot be blank.';
  } else {
    weightError = '';
    hasError = false;
  }
  const weightData = [weightError, hasError];
  return weightData;
};

/**
 * Validates user input matches a regex.
 * @param {String} lastName
 * @returns An two value array
 */
export const validateInsurance = (insurance) => {
  const nameRegex = /^[0-9a-zA-Z'()\s-]+$/;
  let hasError = true;
  let insuranceError = '';
  if (!nameRegex.test(insurance)) {
    insuranceError = 'Insurance must be letters';
  } else if (insurance.length < 1) {
    insuranceError = 'Insurance cannot be blank.';
  } else {
    insuranceError = '';
    hasError = false;
  }
  const insuranceData = [insuranceError, hasError];
  return insuranceData;
};

/**
 * Validates user input matches a regex.
 * @param {String} lastName
 * @returns An two value array
 */
export const validateStreet = (street) => {
  const nameRegex = /^[A-Za-z0-9 .]*$/;
  let hasError = true;
  let streetError = '';
  if (street < 2 && !nameRegex.test(street)) {
    streetError = 'street address must be at least 2 characters long and only have letters and numbers.';
  } else if (!nameRegex.test(street)) {
    streetError = 'Street address must have only letters.';
  } else if (street.length < 1) {
    streetError = 'Street address cannot be blank.';
  } else {
    streetError = '';
    hasError = false;
  }
  const streetData = [streetError, hasError];
  return streetData;
};

/**
 * Validates user input matches a regex.
 * @param {String} lastName
 * @returns An two value array
 */
export const validateCity = (visitCode) => {
  const nameRegex = /^[A-Za-z'-]+$/;
  let hasError = true;
  let visitCodeError = '';
  if (!nameRegex.test(visitCode)) {
    visitCodeError = 'visitCode must have only letters.';
  } else if (visitCode.length < 1) {
    visitCodeError = 'visitCode cannot be blank.';
  } else {
    visitCodeError = '';
    hasError = false;
  }
  const visitCodeData = [visitCodeError, hasError];
  return visitCodeData;
};

/**
 * Validates user input matches a regex.
 * @param {String} state
 * @returns An two value array
 */
export const validateState = (state) => {
  const regex = /^[A-Z]{2}$/;
  let hasError = true;
  let stateError = '';
  if (!regex.test(state)) {
    stateError = 'Use the abbreviation for states';
  } else if (state.length < 1) {
    stateError = 'State cannot be blank.';
  } else {
    stateError = '';
    hasError = false;
  }
  const stateData = [stateError, hasError];
  return stateData;
};

/**
 * Validates user input matches a regex.
 * @param {String} ssn
 * @returns An two value array
 */
export const validateSsn = (ssn) => {
  const regex = /\b[0-9]{3}-[0-9]{2}-[0-9]{4}\b/;
  let hasError = true;
  let ssnError = '';
  if (!regex.test(ssn)) {
    ssnError = 'SSN must match the pattern: XXX-XXX-XXXX';
  } else {
    ssnError = '';
    hasError = false;
  }
  const ssnData = [ssnError, hasError];
  return ssnData;
};

/**
 * Validates user input matches a regex.
 * @param {String} email
 * @returns An two value array
 */
export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  let hasError = true;
  let emailError = '';
  if (!regex.test(email)) {
    emailError = 'Email must follow this format x@x.x.';
  } else {
    emailError = '';
    hasError = false;
  }
  const emailData = [emailError, hasError];
  return emailData;
};

/**
 * Validates user input matches a regex.
 * @param {String} zipCode
 * @returns An two value array
 */
export const validateZipCode = (zipCode) => {
  const regex = /^[0-9]{5}$/;
  let hasError = true;
  let zipCodeError = '';
  if (!regex.test(zipCode)) {
    zipCodeError = 'Zipcode must follow this format XXXXX';
  } else {
    zipCodeError = '';
    hasError = false;
  }
  const zipCodeData = [zipCodeError, hasError];
  return zipCodeData;
};

/**
 * Validates that a dropdown choice was selected
 * @param {String} gender
 * @returns A two value array.
 */
export const validateGender = (gender) => {
  let hasError = true;
  let genderError = '';
  if (gender === '' || gender === 'Default') {
    genderError = 'Please choose a gender';
  } else {
    genderError = '';
    hasError = false;
  }
  const genderData = [genderError, hasError];
  return genderData;
};

/**
 * Validates user input matches a regex.
 * @param {String} visitCode
 * @returns An two value array
 */
export const validateVisitCode = (visitCode) => {
  const Regex = /^[A-Z0-9]{3} [A-Z0-9]{3}$/;
  let hasError = true;
  let visitCodeError = '';
  if (!Regex.test(visitCode)) {
    visitCodeError = 'visitCode must follow this format XXX XXX.';
  } else if (visitCode.length < 1) {
    visitCodeError = 'visitCode cannot be blank.';
  } else {
    visitCodeError = '';
    hasError = false;
  }
  const visitCodeData = [visitCodeError, hasError];
  return visitCodeData;
};

/**
 * Validates user input matches a regex.
 * @param {String} billingCode
 * @returns An two value array
 */
export const validateBillingCode = (billingCode) => {
  const Regex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
  let hasError = true;
  let billingCodeError = '';
  if (!Regex.test(billingCode)) {
    billingCodeError = 'billingCode must follow this format xxx.xxx.xxx-xx';
  } else if (billingCode.length < 1) {
    billingCodeError = 'billingCode cannot be blank.';
  } else {
    billingCodeError = '';
    hasError = false;
  }
  const billingCodeData = [billingCodeError, hasError];
  return billingCodeData;
};

/**
 * Validates user input matches a regex.
 * @param {String} icd10
 * @returns An two value array
 */
export const validateIcd10 = (icd10) => {
  const Regex = /^[A-Z]\d{2}$/;
  let hasError = true;
  let icd10Error = '';
  if (!Regex.test(icd10)) {
    icd10Error = 'icd10 must follow this format X11';
  } else if (icd10.length < 1) {
    icd10Error = 'icd10 cannot be blank.';
  } else {
    icd10Error = '';
    hasError = false;
  }
  const icd10Data = [icd10Error, hasError];
  return icd10Data;
};

/**
 * Validates user input matches a regex.
 * @param {String} totalCost
 * @returns An two value array
 */
export const validateTotalCost = (totalCost) => {
  const Regex = /^[0-9]+$/;
  let hasError = true;
  let totalCostError = '';
  if (!Regex.test(totalCost)) {
    totalCostError = 'totalCost must be a number';
  } else if (totalCost < 1) {
    totalCostError = 'totalCost cannot be blank.';
  } else {
    totalCostError = '';
    hasError = false;
  }
  const totalCostData = [totalCostError, hasError];
  return totalCostData;
};

/**
 * Validates user input matches a regex.
 * @param {String} copay
 * @returns An two value array
 */
export const validateCopay = (copay) => {
  const Regex = /^[0-9]+$/;
  let hasError = true;
  let copayError = '';
  if (!Regex.test(copay)) {
    copayError = 'copay must be a number';
  } else if (copay < 1) {
    copayError = 'copay cannot be blank.';
  } else {
    copayError = '';
    hasError = false;
  }
  const copayData = [copayError, hasError];
  return copayData;
};

export const validateProvider = (provider) => {
  const nameRegex = /^[A-Za-z'-]+$/;
  let hasError = true;
  let providerError = '';
  if (!nameRegex.test(provider)) {
    providerError = 'visitCode must have only letters.';
  } else if (provider.length < 1) {
    providerError = 'visitCode cannot be blank.';
  } else {
    providerError = '';
    hasError = false;
  }
  const providerData = [providerError, hasError];
  return providerData;
};
/**
 * Validates user input matches a regex.
 * @param {String} chiefComplaint
 * @returns An two value array
 */
export const validateChiefComplaint = (chiefComplaint) => {
  const Regex = /^[A-Za-z0-9 .]*$/;
  let hasError = true;
  let chiefComplaintError = '';
  if (!Regex.test(chiefComplaint)) {
    chiefComplaintError = 'chiefComplaint must only be letters.';
  } else if (chiefComplaint.length < 1) {
    chiefComplaintError = 'chiefComplaint cannot be blank.';
  } else {
    chiefComplaintError = '';
    hasError = false;
  }
  const chiefComplaintData = [chiefComplaintError, hasError];
  return chiefComplaintData;
};

/**
 * Validates user input matches a regex.
 * @param {String} pulse
 * @returns An two value array
 */
export const validatePulse = (pulse) => {
  const Regex = /^[0-9]+$/;
  let hasError = true;
  let pulseError = '';
  if (!Regex.test(pulse)) {
    pulseError = 'pulse must be a number';
  } else if (pulse < 1) {
    pulseError = 'pulse cannot be blank.';
  } else {
    pulseError = '';
    hasError = false;
  }
  const pulseData = [pulseError, hasError];
  return pulseData;
};

/**
 * Validates user input matches a regex.
 * @param {String} systolicPressure
 * @returns An two value array
 */
export const validateSystolicPressure = (systolicPressure) => {
  const Regex = /^[0-9]+$/;
  let hasError = true;
  let systolicPressureError = '';
  if (!Regex.test(systolicPressure)) {
    systolicPressureError = 'systolicPressure must be a number';
  } else if (systolicPressure < 1) {
    systolicPressureError = 'systolicPressure cannot be blank.';
  } else {
    systolicPressureError = '';
    hasError = false;
  }
  const systolicPressureData = [systolicPressureError, hasError];
  return systolicPressureData;
};

/**
 * Validates user input matches a regex.
 * @param {String} diastolicPressure
 * @returns An two value array
 */
export const validateDiastolicPressure = (diastolicPressure) => {
  const Regex = /^[0-9]+$/;
  let hasError = true;
  let diastolicPressureError = '';
  if (!Regex.test(diastolicPressure)) {
    diastolicPressureError = 'diastolicPressure must be a number';
  } else if (diastolicPressure < 1) {
    diastolicPressureError = 'diastolicPressure cannot be blank.';
  } else {
    diastolicPressureError = '';
    hasError = false;
  }
  const diastolicPressureData = [diastolicPressureError, hasError];
  return diastolicPressureData;
};

/**
 * Validates user input matches a regex.
 * @param {String} date
 * @returns An two value array
 */
export const validateDate = (date) => {
  const Regex = /^\d{4}-\d{2}-\d{2}$/;
  let hasError = true;
  let dateError = '';
  if (!Regex.test(date)) {
    dateError = 'date must follow this format YYYY-MM-DD';
  } else if (date < 1) {
    dateError = 'date cannot be blank.';
  } else {
    dateError = '';
    hasError = false;
  }
  const dateData = [dateError, hasError];
  return dateData;
};
