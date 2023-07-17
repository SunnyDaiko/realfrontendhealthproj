import HttpHelper from '../../utils/HttpHelper';
import Constants, { ENCOUNTER_ENDPOINT } from '../../utils/constants';

/**
 * Utilizes HttpHelper to make a GET request to fetch products from an API.
 * @param {Function} setProducts - Sets the state for products.
 * @param {Function} setApiError - Sets the state for API error.
 */
const fetchPatients = async (setPatients, setApiError) => {
  await HttpHelper(Constants.PATIENTS_ENDPOINT, 'GET')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(Constants.API_ERROR);
    })
    .then(setPatients)
    .catch(() => {
      setApiError(true);
    });
};

const fetchPatientById = async (setPatient, id, setApiError) => {
  await HttpHelper(`${Constants.PATIENTS_ENDPOINT}/${id}`, 'GET')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(Constants.API_ERROR);
    })
    .then(setPatient)
    .catch(() => {
      setApiError(true);
    });
};

/**
 * Utilizes HttpHelper to make a POST request to create a new patient.
 * @param {Object} formData - The form data for the new patient.
 * @param {Function} setShowToast - A function to set the visibility of the toast.
 * @param {Object} history - The history object from React Router.
 * @param {Function} setProducts - Sets the state for products.
 * @param {Function} setApiError - Sets the state for API error.
 */
const createPatient = async (
  updatedFormData,
  setShowToast,
  setShowErrorToast,
  history,
  setPatients,
  setApiError
) => {
  try {
    const response = await HttpHelper(Constants.PATIENTS_ENDPOINT, 'POST', updatedFormData);
    if (response.ok) {
      setShowToast(true);
      history.push('/Patients');
      fetchPatients(setPatients, setApiError);
    } else if (response.status === 503) {
      setShowToast(false);
      setShowErrorToast(true);
    } else {
      setApiError(true);
    }
  } catch (error) {
    setApiError(true);
  }
};

const updatePatient = async (
  patientId,
  updatedFormData,
  setShowToast,
  setShowErrorToast,
  history,
  setPatients,
  setApiError
) => {
  try {
    const response = await HttpHelper(`${Constants.PATIENTS_ENDPOINT}/${patientId}`, 'PUT', updatedFormData);
    if (response.ok) {
      setShowToast(true);
      history.push('/Patients');
      fetchPatients(setPatients, setApiError);
    } else if (response.status === 503) {
      setShowToast(false);
      setShowErrorToast(true);
    } else {
      setApiError(true);
    }
  } catch (error) {
    setApiError(true);
  }
};

const createEncounter = async (
  updatedFormData,
  setShowToast,
  setShowErrorToast,
  history,
  setPatients,
  setApiError
) => {
  try {
    const response = await HttpHelper(Constants.ENCOUNTERS_ENDPOINT, 'POST', updatedFormData);
    if (response.ok) {
      setShowToast(true);
      history.push('/Patients');
      fetchPatients(setPatients, setApiError);
    } else if (response.status === 503) {
      setShowToast(false);
      setShowErrorToast(true);
    } else {
      setApiError(true);
    }
  } catch (error) {
    setApiError(true);
  }
};

const updateEncounter = async (
  patientId,
  encounterId,
  updatedFormData,
  setShowToast,
  setShowErrorToast,
  history,
  setPatients,
  setApiError
) => {
  try {
    const response = await HttpHelper(`${Constants.PATIENTS_ENDPOINT}/${patientId}/${ENCOUNTER_ENDPOINT}/${encounterId}`, 'PUT', updatedFormData);
    if (response.ok) {
      setShowToast(true);
      history.push('/Patients');
      fetchPatients(setPatients, setApiError);
    } else if (response.status === 503) {
      setShowToast(false);
      setShowErrorToast(true);
    } else {
      setApiError(true);
    }
  } catch (error) {
    setApiError(true);
  }
};

export {
  fetchPatients, createPatient, createEncounter, updatePatient, updateEncounter, fetchPatientById
};
