import React, { useReducer } from 'react';

import './Input.css';

const inputReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE':
      return {
        ...state,
        value: action.payload,
        isValid: true,
      };
    default:
      return state;
  }
};

const Input = ({ label, id, element, type, placeholder, rows, errorText }) => {
  // The second argument is the initial state
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: '',
    isValid: false,
  });

  const changeHandler = (e) => {
    dispatch({
      type: 'CHANGE',
      payload: e.target.value,
    });
  };

  const el =
    element === 'input' ? (
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        onChange={changeHandler}
        value={inputState.value}
      />
    ) : (
      <textarea
        id={id}
        rows={rows || 3}
        onChange={changeHandler}
        value={inputState.value}
      ></textarea>
    );
  return (
    <div
      className={`form-control ${
        !inputState.isValid && 'form-control--invalid'
      }`}
    >
      <label htmlFor={id}>{label}</label>
      {el}
      {!inputState.isValid && <p>{errorText}</p>}
    </div>
  );
};

export default Input;
