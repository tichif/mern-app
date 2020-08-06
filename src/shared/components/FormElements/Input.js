import React from 'react';

import './Input.css';

const Input = ({ label, id, element, type, placeholder, rows }) => {
  const el =
    element === 'input' ? (
      <input id={id} type={type} placeholder={placeholder} />
    ) : (
      <textarea id={id} rows={rows || 3}></textarea>
    );
  return (
    <div className={`form-control`}>
      <label htmlFor={id}>{label}</label>
      {el}
    </div>
  );
};

export default Input;
