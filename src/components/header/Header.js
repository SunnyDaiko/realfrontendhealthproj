import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import GoogleLogin, { GoogleLogout } from 'react-google-login';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import { Avatar, Badge } from '@mui/material';
import PersonIcon from '@material-ui/icons/Person';
import loginUser from './HeaderService';
import constants from '../../utils/constants';
import classes from './Header.module.css';
import CtrlFreaksLogo5 from './CtrlFreaksLogo5.jpg';
import Toast from '../toast/Toast';
import { useCart } from '../checkout-page/CartContext';
import { useUser } from '../UserContext';
/**
 * @name Header
 * @description Displays the navigation header
 * @return component
 */
const Header = () => {
  const { user, setUser } = useUser();
  const [googleError, setGoogleError] = useState('');
  const [apiError, setApiError] = useState(false);
  const { state } = useCart();

  const totalItemsInCart = state.products.reduce((total, product) => total + product.quantity, 0);

  /**
   * @name handleGoogleLoginSuccess
   * @description Function to run if google login was successful
   * @param {Object} response Response object from google
   */
  const handleGoogleLoginSuccess = (response) => {
    sessionStorage.setItem('token', response.getAuthResponse().id_token);
    const googleUser = {
      email: response.profileObj.email,
      firstName: response.profileObj.givenName,
      lastName: response.profileObj.familyName
    };
    loginUser(googleUser, setUser, setApiError);
    setGoogleError('');
  };

  /**
   * @name handleGoogleLoginFailure
   * @description Function to run if google login was unsuccessful
   */
  const handleGoogleLoginFailure = () => {
    setGoogleError(
      'There was a problem logging in with Google. Please wait and try again later.'
    );
  };

  /**
   * @name handleGoogleLogoutSuccess
   * @description Function to run if google logout was successful
   */
  const handleGoogleLogoutSuccess = () => {
    setUser('');
    setGoogleError('');
  };

  /**
   * @name handleGoogleLogoutFailure
   * @description Function to run if google logout was unsuccessful
   */
  const handleGoogleLogoutFailure = () => {
    setGoogleError(
      'There was a problem logging out with Google. Please wait and try again later.'
    );
  };

  return (
    <div className={classes.header}>
      <NavLink to="/home">
        <img src={CtrlFreaksLogo5} alt="Logo" className={classes.logo} />
      </NavLink>
      <Toast type="error" />
      <div className={classes.cart}>
        <NavLink to="/checkout">
          <Badge
            color="error"
            badgeContent={totalItemsInCart}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left'
            }}
          >
            <ShoppingCartOutlinedIcon className={classes.cartIcon} />
          </Badge>
        </NavLink>
      </div>
      <div className={classes.avatar}>
        {user && <NavLink to="/profile"><Avatar><PersonIcon /></Avatar></NavLink>}
      </div>
      {googleError && <span>{googleError}</span>}
      {apiError && <span>Api Error</span>}
      {!user ? (
        <GoogleLogin
          clientId={constants.GOOGLE_CLIENT_ID}
          buttonText="Login"
          onSuccess={handleGoogleLoginSuccess}
          onFailure={handleGoogleLoginFailure}
          cookiePolicy="single_host_origin"
          className={classes.login}
        />
      ) : (
        <NavLink to="/home">
          <GoogleLogout
            clientId={constants.GOOGLE_CLIENT_ID}
            buttonText="Logout"
            onLogoutSuccess={handleGoogleLogoutSuccess}
            onFailure={handleGoogleLogoutFailure}
            className={classes.logout}
          />
        </NavLink>
      )}
    </div>
  );
};

export default Header;
