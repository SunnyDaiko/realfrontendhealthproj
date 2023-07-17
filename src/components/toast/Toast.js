import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';

/**
 * Toast component that displays a message.
 * @param {Object} props - Component props.
 * @param {Object} show - A stateful object with a boolean value used to display or hide the Toast.
 * @param {Function} handleClose - The function that closes the toast.
 * @param {string} props.type - The type of the toast message ('success', 'error',
 * or other value for default.)
 * @param {string} message - Message displayed on toast.
 * @returns {JSX.Element} JSX element representing a toast component.
 */

const Toast = ({
  show, handleClose, type, message
}) => {
  /**
   * A function which determines the severity of the alert based on the type prop.
   * @returns {string} The severity of the Alert ('success', 'error', or 'default')
   */
  const getSeverity = () => {
    switch (type) {
      case 'success':
        return 'success';
      case 'error':
        return 'error';
      case 'info':
        return 'info';
      default:
        return 'default';
    }
  };

  return (
    <Stack spacing={2} sx={{ width: '20%' }}>
      <Snackbar
        open={show}
        autoHideDuration={8000}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
      >
        <Alert
          onClose={handleClose}
          severity={getSeverity()}
          sx={{ width: '100%' }}
        >
          {message}
        </Alert>
      </Snackbar>
    </Stack>
  );
};

export default Toast;
