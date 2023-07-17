import HttpHelper from '../../utils/HttpHelper';

/**
 * @name getPatientsById
 * @description Gets the patient by id to see if exists
 * @param {String} patient Target patient
 * @param {Function} setPatient Sets the user state
 */
const getPatientsById = async (id, setPatient) => {
  let patientByIdExists;

  await HttpHelper(`/patients/${id}`, 'GET')
    .then((response) => {
      if (response.status === 200) {
        patientByIdExists = true;
        return response.json();
      }
      if (response.status === 404) {
        patientByIdExists = false;
      }
      throw new Error(response.statusText);
    })
    .then((body) => {
      setPatient(body);
      document.cookie = `user=${JSON.stringify(body)}`;
    })
    .catch(() => {});

  return patientByIdExists;
};

/**
 * @name createNewPatient
 * @description Posts a patient to the backend
 * @param {Object} user The user to create
 * @param {Function} setPatient Sets the user state
 * @param {Function} setApiError Sets the API Error state
 */
const createNewPatient = async (user, setPatient, setApiError) => {
  await HttpHelper('/patients', 'POST', user)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then((body) => {
      setPatient(body);
      document.cookie = `user=${JSON.stringify(body)}`;
    })
    .catch(() => {
      setApiError(true);
    });
};

const grabPatientById = async (patient, setPatient, setApiError) => {
  const idByPatientExists = await getPatientsById(patient.id, setPatient);
  if (!idByPatientExists) {
    createNewPatient(patient, setPatient, setApiError);
  }
};

export {
  getPatientsById, createNewPatient, grabPatientById
};
