import React from 'react';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

export default function Tutorial({ close }) {
  return (
    <div className='tutorial'>
      <img src={process.env.PUBLIC_URL + '/images/tutorial.png'} alt='Tutorial' />
      <div className='tutorial-button' onClick={close}>
        <h3>I got it!</h3>
        <CheckCircleIcon style={{ fontSize: '1.6rem' }} />
      </div>
    </div>
  );
}
