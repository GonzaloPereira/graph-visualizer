import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}

export default function SnackbarAlert({ openError, setOpenError, error }) {
  function closeSnackbar(evt, reason) {
    if (reason === 'clickaway') return;
    setOpenError(false);
  }
  return (
    <Snackbar open={openError} autoHideDuration={3000} onClose={closeSnackbar}>
      <Alert onClose={closeSnackbar} severity='error'>
        {error}
      </Alert>
    </Snackbar>
  );
}
