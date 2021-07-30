import React, { useRef, useEffect } from 'react';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

export default function EditWeight({ currentEdge, setCurrentEdge, handleSubmit }) {
  const newWeight = useRef();
  useEffect(() => {
    if (newWeight.current) newWeight.current.focus();
  }, []);
  return (
    <form
      className='edit-weight-form'
      onSubmit={(e) => {
        e.preventDefault();
        if (newWeight.current.value === '') return;
        handleSubmit(currentEdge, newWeight.current.value);
        setCurrentEdge(null);
      }}
    >
      <input type='number' ref={newWeight} autoFocus />
      <button type='submit'>
        <ArrowForwardIcon style={{ fontSize: '0.8rem', marginTop: '2px', color: 'white' }} />
      </button>
    </form>
  );
}
