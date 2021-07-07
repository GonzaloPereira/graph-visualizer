import React, { useState } from 'react';
import SpeedSlider from './extra/SpeedSlider';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}

export default function Reproductor({ speed, setSpeed, isPlaying, setIsPlaying }) {
  const [openError, setOpenError] = useState(false);

  return (
    <div className='reproductor'>
      <SpeedSlider speed={speed} setSpeed={setSpeed} />
      <h3
        onClick={() => {
          if (isPlaying) setOpenError(true);
          else setIsPlaying(true);
        }}
      >
        Play
      </h3>
      <Snackbar
        open={openError}
        autoHideDuration={3000}
        onClose={(evt, reason) => {
          if (reason === 'clickaway') return;
          setOpenError(false);
        }}
      >
        <Alert
          onClose={(evt, reason) => {
            if (reason === 'clickaway') return;
            setOpenError(false);
          }}
          severity='error'
        >
          Wait until the visualization is finished
        </Alert>
      </Snackbar>
    </div>
  );
}
