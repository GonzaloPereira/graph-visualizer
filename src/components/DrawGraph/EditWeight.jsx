import React, { useRef, useEffect } from 'react';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

export default function EditWeight({ currentEdge, setCurrentEdge, handleSubmit }) {
  const newWeight = useRef();
  useEffect(() => {
    if (currentEdge && newWeight.current) newWeight.current.focus();
  }, [currentEdge]);
  return (
    <form
      className='edit-weight-form'
      onSubmit={(e) => {
        e.preventDefault();
        if (newWeight.current.value === '') return;
        handleSubmit(currentEdge.id, newWeight.current.value);
        setCurrentEdge(null);
      }}
    >
      <input type='number' ref={newWeight} autoFocus />
      <button type='submit'>
        <ArrowForwardIcon fontSize='inherit' style={{ marginTop: '2px', color: 'white' }} />
      </button>
    </form>
  );
}
