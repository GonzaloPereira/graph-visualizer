import React, { useReducer } from 'react';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

export default function SubMenu({ title, list, setCurrentAlgorithm }) {
  const [open, toggleOpen] = useReducer((st) => !st, false);
  return (
    <div className='submenu' onClick={toggleOpen}>
      <div className='submenu-title'>
        <h3>{title}</h3>
        {open ? <ArrowDropDownIcon style={{ fontSize: '1.5rem' }} /> : <ArrowRightIcon style={{ fontSize: '1.5rem' }} />}
      </div>
      {open && (
        <div className='submenu-list'>
          {list.map((item, id) => (
            <h4
              key={id}
              className='submenu-item'
              onClick={(e) => {
                e.stopPropagation();
                setCurrentAlgorithm(item);
              }}
            >
              {item}
            </h4>
          ))}
        </div>
      )}
    </div>
  );
}
