import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core';
import classes from './ProfilePage.module.css';
import { useUser } from '../UserContext';
import Toast from '../toast/Toast';
/**
 * Represents the profile page component. A view of user profile data.
 * @returns {JSX.Element} The JSX representation of the profile page.
 */
const ProfilePage = () => {
  const { user } = useUser();
  const [containerClass, setContainerClass] = useState(classes.profileContainer);
  const [apiError, setApiError] = useState(false);
  const [id, setId] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [street, setStreet] = useState('');
  const [apt, setApt] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);
  const [firstNameValid, setFirstNameValid] = useState(true);
  const [lastNameValid, setLastNameValid] = useState(true);
  const [cityValid, setCityValid] = useState(true);
  const [zipcodeValid, setZipcodeValid] = useState(true);
  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [cityError, setCityError] = useState('');
  const [zipcodeError, setZipcodeError] = useState('');

  useEffect(() => {
    // Update the state with user data when it becomes available
    if (user) {
      setId(user.id);
      setFirstName(user.firstName || '');
      setLastName(user.lastName || '');
      setEmail(user.email || '');
      setStreet(user.street || '');
      setCity(user.city || '');
      setState(user.state || '');
      setApt(user.apt || '');
      setZipCode(user.zipCode || '');
    } else {
      setApiError(true);
      setContainerClass('');
    }
  }, [user]);

  const history = useHistory();
  /**
Saves the promo code data to the Database
@async
@function savePromoCode
@param {Object} promoCodeData - The promo code data to be saved
@returns {Promise} - The response data or an error message
*/
  const saveProfileData = async (profileData) => {
    try {
      const jwt = sessionStorage.getItem('token');

      const response = await fetch(`http://localhost:8085/users/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`
        },
        body: JSON.stringify(profileData)
      });

      if (response.status === 503) {
        throw new Error('Service Unavailable');
      } else if (response.status !== 200) {
        throw new Error('Failed to save profile data');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const validateFields = async () => {
    const nameRegex = /^[A-Za-z'-]+$/;
    const cityRegex = /^[A-Za-z\s'-]+$/;
    const zipCodeRegex = /^\d{5}$/;
    let hasError = false;
    if (!nameRegex.test(firstName)) {
      setFirstNameError('First name should only contain letters, hyphens, and apostrophes.');
      setFirstNameValid(false);
      hasError = true;
    } else {
      setFirstNameError('');
      setFirstNameValid(true);
    }
    if (!nameRegex.test(lastName)) {
      setLastNameError('Last name should only contain letters, hyphens, and apostrophes.');
      setLastNameValid(false);
      hasError = true;
    } else {
      setLastNameError('');
      setLastNameValid(true);
    }
    if (!cityRegex.test(city)) {
      setCityError('City should only contain letters, hyphens, and apostrophes');
      setCityValid(false);
      hasError = true;
    } else {
      setCityError('');
      setCityValid(true);
    }
    if (!zipCodeRegex.test(zipCode)) {
      setZipcodeError('Zipcode should be 5 numbers only');
      setZipcodeValid(false);
      hasError = true;
    } else {
      setZipcodeError('');
      setZipcodeValid(true);
    }
    if (hasError === true) {
      setShowSuccessToast(false);
    } else {
      try {
        const profileData = {
          firstName,
          lastName,
          email,
          street,
          apt,
          city,
          state,
          zipCode
        };
        await saveProfileData(profileData);
        setShowSuccessToast(true);
      } catch (error) {
        setShowSuccessToast(false);
        // Display error toast
        setShowErrorToast(true);
      }
    }
  };

  const handleChange = () => {
    setIsSaved(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    validateFields();
  };

  return (
    <div className={containerClass}>
      {apiError ? (
        <p className={classes.error}>
          Something went wrong, please refresh and try again.
        </p>
      ) : (
        <form onSubmit={handleSubmit}>
          <p className={classes.profileTitle}>User Profile</p>
          <div className={classes.formContainer}>
            <div className={classes.leftColumn}>
              <label htmlFor="first-name">
                First Name
                <input
                  type="text"
                  id="first-name"
                  value={firstName}
                  maxLength={50}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                    handleChange();
                  }}
                  className={!firstNameValid ? classes.invalid : ''}
                />
                <div className={classes.test}>
                  {!firstNameValid && <div className={classes.errorInput}>{firstNameError}</div>}

                </div>
              </label>

              <label htmlFor="email">
                Email
                <input type="text" id="email" value={email} readOnly />
              </label>

              <label htmlFor="street">
                Address
                <input
                  type="text"
                  id="street"
                  value={street}
                  onChange={(e) => {
                    setStreet(e.target.value);
                    handleChange();
                  }}
                />
              </label>

              <label htmlFor="apt" style={{ whiteSpace: 'nowrap' }}>
                Apt, Suite, etc. (optional)
                <input
                  type="text"
                  id="apt"
                  value={apt}
                  onChange={(e) => {
                    setApt(e.target.value);
                    handleChange();
                  }}
                />
              </label>
            </div>

            <div className={classes.rightColumn}>
              <label htmlFor="last-name" style={{ whiteSpace: 'nowrap' }}>
                Last Name
                <input
                  type="text"
                  id="last-name"
                  value={lastName}
                  maxLength={50}
                  onChange={(e) => {
                    setLastName(e.target.value);
                    handleChange();
                  }}
                  className={!lastNameValid ? classes.invalid : ''}
                />
                {!lastNameValid && <div className={classes.errorInput}>{lastNameError}</div>}
              </label>

              <label htmlFor="city">
                City
                <input
                  type="text"
                  id="city"
                  value={city}
                  onChange={(e) => {
                    setCity(e.target.value);
                    handleChange();
                  }}
                  className={!cityValid ? classes.invalid : ''}
                />
                {!cityValid && <div className={classes.errorInput}>{cityError}</div>}
              </label>

              <label htmlFor="state" className={classes.state}>
                State
                <select
                  id="state"
                  value={state}
                  onChange={(e) => {
                    setState(e.target.value);
                    handleChange();
                  }}
                  className={classes.dropdown}
                >
                  <option>Select a State</option>
                  <option value="AL">Alabama</option>
                  <option value="AK">Alaska</option>
                  <option value="AZ">Arizona</option>
                  <option value="AR">Arkansas</option>
                  <option value="CA">California</option>
                  <option value="CO">Colorado</option>
                  <option value="CT">Connecticut</option>
                  <option value="DE">Delaware</option>
                  <option value="FL">Florida</option>
                  <option value="GA">Georgia</option>
                  <option value="HI">Hawaii</option>
                  <option value="ID">Idaho</option>
                  <option value="IL">Illinois</option>
                  <option value="IN">Indiana</option>
                  <option value="IA">Iowa</option>
                  <option value="KS">Kansas</option>
                  <option value="KY">Kentucky</option>
                  <option value="LA">Louisiana</option>
                  <option value="ME">Maine</option>
                  <option value="MD">Maryland</option>
                  <option value="MA">Massachusetts</option>
                  <option value="MI">Michigan</option>
                  <option value="MN">Minnesota</option>
                  <option value="MS">Mississippi</option>
                  <option value="MO">Missouri</option>
                  <option value="MT">Montana</option>
                  <option value="NE">Nebraska</option>
                  <option value="NV">Nevada</option>
                  <option value="NH">New Hampshire</option>
                  <option value="NJ">New Jersey</option>
                  <option value="NM">New Mexico</option>
                  <option value="NY">New York</option>
                  <option value="NC">North Carolina</option>
                  <option value="ND">North Dakota</option>
                  <option value="OH">Ohio</option>
                  <option value="OK">Oklahoma</option>
                  <option value="OR">Oregon</option>
                  <option value="PA">Pennsylvania</option>
                  <option value="RI">Rhode Island</option>
                  <option value="SC">South Carolina</option>
                  <option value="SD">South Dakota</option>
                  <option value="TN">Tennessee</option>
                  <option value="TX">Texas</option>
                  <option value="UT">Utah</option>
                  <option value="VT">Vermont</option>
                  <option value="VA">Virginia</option>
                  <option value="WA">Washington</option>
                  <option value="WV">West Virginia</option>
                  <option value="WI">Wisconsin</option>
                  <option value="WY">Wyoming</option>
                </select>
              </label>

              <label htmlFor="zip" className={classes.zip}>
                Zip Code
                <input
                  type="text"
                  id="zip"
                  value={zipCode}
                  onChange={(e) => {
                    setZipCode(e.target.value);
                    handleChange();
                  }}
                  className={!zipcodeValid ? classes.invalid : ''}
                />
                {!zipcodeValid && <div className={classes.errorInput}>{zipcodeError}</div>}
              </label>
              <div className={classes.buttonContainer}>
                <Button type="button" variant="outlined" className={classes.cancel} onClick={() => history.push('/home')}>Cancel</Button>
                <Button type="submit" variant="contained" disabled={!isSaved} className={classes.saveButton}>Update</Button>
              </div>
            </div>
          </div>
        </form>
      )}
      {showSuccessToast && (
      <Toast
        show={showSuccessToast}
        handleClose={() => setShowSuccessToast(false)}
        type="success"
        message="Profile has been successfully updated!"
      />
      )}
      {showErrorToast && (
      <Toast
        show={showErrorToast}
        handleClose={() => setShowErrorToast(false)}
        type="error"
        message="Database unavailable. Please refresh and try again."
      />
      )}
    </div>
  );
};

export default ProfilePage;
