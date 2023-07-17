import React, { useEffect, useState } from 'react';
import { Box, Modal } from '@mui/material';
import { Button, Typography } from '@material-ui/core';
import {
  Switch, Route, useLocation, useHistory
} from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { fetchPatients } from '../product-page/ProductService';
import classes from './MaintenancePage.module.css';
import Toast from '../toast/Toast';
import { usePatient } from '../../utils/PatientContext';
import CreateProductForm from './CreateProductForm';
import UpdatePatientForm from './UpdatePatientForm';

/**
 * Represents the MaintenancePage component.
 * @returns {JSX.Element} MaintenancePage component.
 */
const MaintenancePage = () => {
  const [patients, setPatients] = useState([]);
  const [apiError, setApiError] = useState(false);
  // const [showPromoModal, setShowPromoModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [showDeleteToast, setShowDeleteToast] = useState([]);
  const { setPatient } = usePatient();

  const location = useLocation();

  useEffect(() => {
    fetchPatients(setPatients, setApiError);
  }, [location.key]);

  /**
   * Changes active status of patient to false which is shown in
   * the UI and is persisted in the database.
   */
  const handleInactiveClick = async () => {
    try {
      await fetch('http://localhost:8085/patients/', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify()
      });
      setShowDeleteModal(false);
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const handleTrashClick = async (event, patientId) => {
    event.preventDefault();
    try {
      await fetch(`http://localhost:8085/products/${patientId}`, {
        method: 'DELETE'
      });

      setPatients((prevPatient) => prevPatient.filter((patient) => patient.id !== patientId));
      setDeleteSuccess(true);
      setShowDeleteToast(true);
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const handleViewButtonClick = (patient) => {
    setPatient(patient.id);
  };

  const history = useHistory();

  const goToCreatePatientPage = () => {
    history.push('/Patients/create');
  };

  /**
   * Determines the cell content.
   * @param {*} value - The value to be displayed in the cell.
   * @returns {*} The value if it is not null, otherwise '-'.
   */
  const cellContent = (value) => {
    if (value != null) {
      return value;
    }
    return '-';
  };

  const sortedPatients = [...patients].sort((a, b) => a.id - b.id);

  /**
   * Closes toast component.
   */
  const closeToast = () => {
    setShowToast(false);
  };

  /**
   * Closes toast for deleting a patient.
   */
  const closeDeleteToast = () => {
    setDeleteSuccess(false);
    setShowDeleteToast(false);
  };

  /**
   * Generates the content of the maintenance page.
   * @returns {JSX.Element} Content of the maintenance page.
   */
  const maintenancePageContent = (
    <div>
      {apiError ? (
        <p className={classes.errMsg} data-testid="errMsg">
          Something went wrong, please refresh and try again.
        </p>
      ) : (
        <div>
          <table className={classes.maintenance}>
            <thead>
              <tr>
                <th>Delete Patient</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Patient Page</th>
              </tr>
            </thead>
            <tbody>
              {sortedPatients.length === 0 ? (
                <tr>
                  <td colSpan="21">No patients to display.</td>
                </tr>
              ) : (
                sortedPatients.map((patient) => (
                  <tr key={patient.id}>
                    <td>
                      <IconButton aria-label="delete patient" onClick={(event) => handleTrashClick(event, patient.id)}><DeleteIcon /></IconButton>
                    </td>
                    <td>{cellContent(patient.firstName)}</td>
                    <td>{cellContent(patient.lastName)}</td>
                    <td>{cellContent(patient.age)}</td>
                    <td>{cellContent(patient.gender)}</td>
                    <td>
                      <button type="button" className={classes.edit} onClick={() => handleViewButtonClick(patient.id)} label="edit" value={patient.id}><a href={`/patients/${patient.id}`}>View</a></button>
                    </td>
                  </tr>
                ))

              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );

  return (
    <div>
      <div className={classes.promoCodeButtonContainer}>
        <Button className={classes.createPatientButton} variant="contained" onClick={goToCreatePatientPage}>
          Create New Patient
        </Button>
      </div>
      <div>
        {showDeleteModal && (
        <Modal
          open={showDeleteModal}
          onClose={(_, reason) => {
            if (reason !== 'backdropClick') {
              setShowDeleteModal(false);
            }
          }}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className={classes.modalContainer}>
            <Box className={classes.modalContent}>
              <Typography className={classes.textContainer} id="modal-modal-title" variant="h6" component="h2">
                This patient cannot be deleted due to its previous purchase history.
                Mark inactive instead?
              </Typography>
              <div className={classes.buttonContainer}>
                <Button
                  className={classes.cancelButton}
                  onClick={() => { setShowDeleteModal(false); }}
                >
                  Cancel
                </Button>
                <Button
                  className={classes.inactiveButton}
                  onClick={handleInactiveClick}
                >
                  Mark Inactive
                </Button>
              </div>
            </Box>
          </Box>
        </Modal>
        )}
      </div>
      <div>
        {deleteSuccess && (
        <Toast
          show={showDeleteToast}
          handleClose={closeDeleteToast}
          setShowToast={setShowDeleteToast}
          type="success"
          message="patient successfully deleted"
        />
        )}
      </div>
      <div>
        <Toast
          show={showToast}
          handleClose={closeToast}
          setShowToast={setShowToast}
          type="success"
          message="patient successfully added to the database."
        />
        <Switch>
          <Route
            path="/Patients/create"
            render={() => (
              <CreateProductForm
                showToast={showToast}
                setShowToast={setShowToast}
                setPatients={setPatients}
                setApiError={setApiError}
              />
            )}
          />
          <Route
            path="/Patients/:patientId"
            render={({ match }) => (
              <UpdatePatientForm
                patientId={match.params.patientId}
                setShowToast={setShowToast}
                setPatients={setPatients}
                setApiError={setApiError}
              />
            )}
          />
          <Route
            path=""
            render={() => maintenancePageContent}
          />
        </Switch>

      </div>
    </div>
  );
};

export default MaintenancePage;
