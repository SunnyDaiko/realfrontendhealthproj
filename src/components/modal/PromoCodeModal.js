import React, { useState } from 'react';
import classes from './PromoCodeModal.module.css';
import Toast from '../toast/Toast';

/**
A modal component for creating a new promo code
@param {Object} props - The props object
@param {Function} props.onClose - The function to close the modal
@param {boolean} props.isModalOpen - A boolean indicating whether the modal is open or not
@returns {JSX.Element} - The Modal component
*/
const PromoCodeModal = ({ onClose, isModalOpen }) => {
  // Promo code fields
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('');
  const [rate, setRate] = useState('');
  // invalid border change
  const [nameValid, setNameValid] = useState(true);
  const [amountValid, setAmountValid] = useState(true);
  const [typeValid, setTypeValid] = useState(true);
  // Error messages for failed validations
  const [nameError, setNameError] = useState('');
  const [amountError, setAmountError] = useState('');
  const [typeError, setTypeError] = useState('');

  const [showSuccessToast, setShowSuccessToast] = useState(false);

  /**
Saves the promo code data to the Database
@async
@function savePromoCode
@param {Object} promoCodeData - The promo code data to be saved
@returns {Promise} - The response data or an error message
*/
  const savePromoCode = async (promoCodeData) => {
    try {
      const response = await fetch('http://localhost:8085/promocodes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(promoCodeData)
      });
      const data = await response.json();
      return data;
    } catch (error) {
      return error.message;
    }
  };

  /**
Handles the form submission and logic for validation errors
@async
@function handleSubmit
@param {Object} e - The form submission event
*/
  const handleSubmit = async (e) => {
    e.preventDefault();
    const regex = /^[A-Z0-9]*$/;
    let hasError = false;
    if (title.length < 3 && !regex.test(title)) {
      setNameError('Name must be at least 3 characters long and must have only capital letters and numbers.');
      setNameValid(false);
      hasError = true;
    } else if (title.length > 20 && !regex.test(title)) {
      setNameError('Name must be no more than 20 characters long and must have only capital letters and numbers.');
      setNameValid(false);
      hasError = true;
    } else if (!regex.test(title)) {
      setNameError('Name must have only capital letters and numbers.');
      setNameValid(false);
      hasError = true;
    } else if (title.length < 3) {
      setNameError('Name must be at least 3 characters long.');
      setNameValid(false);
      hasError = true;
    } else if (title.length > 20) {
      setNameError('Name must be no more than 20 characters long.');
      setNameValid(false);
      hasError = true;
    } else {
      setNameError('');
      setNameValid(true);
    }
    if (rate < 0.01) {
      setAmountError('Amount must be more than 0.00.');
      setAmountValid(false);
      hasError = true;
    } else {
      setAmountError('');
      setAmountValid(true);
    }
    if (!type) {
      setTypeError('Please select either "Flat" or "Percentage".');
      setTypeValid(false);
      hasError = true;
    } else {
      setTypeError('');
      setTypeValid(true);
    }
    if (hasError) {
      setShowSuccessToast(false);
    } else {
      const promoCodeData = {
        title,
        description,
        type,
        rate
      };
      await savePromoCode(promoCodeData);
      setShowSuccessToast(true);
      setTimeout(() => {
        onClose(e);
      }, 2000);
    }
  };

  /**
Handles the conversion of the rate/amount to 0.00
Sets max amount to 100 if 'percent' is selected by the user
@function handleRateChange
@param {Object} e - The input event object
*/
  const handleRateChange = (e) => {
    const rawValue = e.target.value;
    const regex = /^\d{0,1000000000}(\.\d{0,2})?$/;
    if (regex.test(rawValue)) {
      if (type === 'percent') {
        setRate(Math.min(rawValue, 100));
      } else {
        setRate(rawValue);
      }
    }
  };

  return (
    <div className={classes.modal}>
      {isModalOpen && (
        <div className={classes.modalContent}>
          <h2 className={classes.modalTitle}>Create Promo Code</h2>
          <form onSubmit={handleSubmit}>
            <div className={classes.formGroup}>
              <label htmlFor="name">
                Name:
                <input
                  type="text"
                  id="name"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                  className={!nameValid ? classes.invalid : ''}
                />
                {!nameValid && <div className={classes.error}>{nameError}</div>}
              </label>
            </div>
            <div className={classes.formGroup}>
              <label htmlFor="description">
                Description (optional) :
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  maxLength={100}
                  style={{ resize: 'none' }}
                />
              </label>
            </div>
            <div className={classes.typeGroup}>
              <div className={!typeValid ? classes.invalid : ''}>
                <label htmlFor="flat">
                  <input
                    type="radio"
                    id="flat"
                    name="type"
                    value="flat"
                    checked={type === 'flat'}
                    onChange={(e) => {
                      setType(e.target.value);
                    }}
                  />
                  Flat
                </label>
                <label htmlFor="percent">
                  <input
                    type="radio"
                    id="percent"
                    name="type"
                    value="percent"
                    checked={type === 'percent'}
                    onChange={(e) => {
                      setType(e.target.value);
                    }}
                  />
                  Percentage
                </label>
              </div>
              {!typeValid && <div className={classes.error}>{typeError}</div>}
            </div>
            <div className={classes.formGroup}>
              <label htmlFor="amount">
                Amount:
                <input
                  type="text"
                  id="amount"
                  value={rate}
                  onChange={handleRateChange}
                  onBlur={() => {
                    const parsedAmount = parseFloat(rate);
                    if (!Number.isNaN(parsedAmount)) {
                      setRate(parsedAmount.toFixed(2));
                    } else {
                      setRate('');
                    }
                  }}
                  className={!amountValid ? classes.invalid : ''}
                />
                {!amountValid && <div className={classes.error}>{amountError}</div>}
              </label>
            </div>
            <div className={classes.formGroup}>
              <button type="button" className={classes.cancelButton} onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className={classes.submitButton}>Submit</button>
            </div>
          </form>
          {showSuccessToast && (
          <Toast
            show={showSuccessToast}
            handleClose={() => setShowSuccessToast(false)}
            type="success"
            message="Promo Code saved successfully!"
          />
          )}
        </div>
      )}
    </div>
  );
};

export default PromoCodeModal;
