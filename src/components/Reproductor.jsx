import React from 'react';
import SpeedSlider from './extra/SpeedSlider';
export default function Reproductor({ speed, setSpeed }) {
  return (
    <div className='reproductor'>
      <SpeedSlider speed={speed} setSpeed={setSpeed} />
    </div>
  );
}
