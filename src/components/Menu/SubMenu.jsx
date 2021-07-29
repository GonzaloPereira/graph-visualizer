import React, { useReducer } from 'react';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

export default function SubMenu({ title, list, setCurrentAlgorithm }) {
  const [open, toggleOpen] = useReducer((st) => !st, true);
  return (
    <div className='submenu' onClick={toggleOpen}>
      <div className='submenu-title'>
        <h3 style={{ borderBottom: open ? '' : 'solid #06121f 1px' }}>{title}</h3>
        {open ? <ArrowDropDownIcon style={{ fontSize: '1.5rem' }} /> : <ArrowRightIcon style={{ fontSize: '1.5rem' }} />}
      </div>
      {open && (
        <>
          {list.map((item, id) => (
            <div key={id} className='submenu-item'>
              <h4
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentAlgorithm(item);
                }}
              >
                {item}
              </h4>
              <div></div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
