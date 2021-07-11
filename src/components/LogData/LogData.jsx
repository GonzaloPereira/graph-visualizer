import React from 'react';
import './LogData.css';

export default function LogData({ logdata }) {
  console.log(logdata);
  return (
    <div className='logdata'>
      {logdata
        .slice(0)
        .reverse()
        .map((line, idx) => {
          return <p key={idx}>{line}</p>;
        })}
    </div>
  );
}
