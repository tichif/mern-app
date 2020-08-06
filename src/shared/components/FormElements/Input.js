import React, { useReducer, useEffect } from 'react';

import './Input.css';
import { validate } from '../../utils/validator';

const inputReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE':
      return {
        ...state,
        value: action.payload,
        isValid: validate(action.payload, action.validators),
      };
    case 'TOUCH':
      return {
        ...state,
        isTouched: true,
      };
    default:
      return state;
  }
};

const Input = ({
  label,
  id,
  element,
  type,
  placeholder,
  rows,
  errorText,
  validators,
  onInput,
  valueInput,
  valid,
}) => {
  // The second argument is the initial state
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: valueInput || '',
    isValid: valid || false,
    isTouched: false,
  });

  const { value, isValid } = inputState;

  useEffect(() => {
    onInput(id, value, isValid);
  }, [value, isValid, onInput, id]);

  const changeHandler = (e) => {
    dispatch({
      type: 'CHANGE',
      payload: e.target.value,
      validators,
    });
  };

  const touchHandler = (e) => {
    dispatch({
      type: 'TOUCH',
    });
  };

  const el =
    element === 'input' ? (
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        onBlur={touchHandler} // allows you know when the input gain or lose the focus
        onChange={changeHandler}
        value={inputState.value}
      />
    ) : (
      <textarea
        id={id}
        rows={rows || 3}
        onBlur={touchHandler} // allows you know when the input gain or lose the focus
        onChange={changeHandler}
        value={inputState.value}
      ></textarea>
    );
  return (
    <div
      className={`form-control ${
        !inputState.isValid && inputState.isTouched && 'form-control--invalid'
      }`}
    >
      <label htmlFor={id}>{label}</label>
      {el}
      {!inputState.isValid && inputState.isTouched && <p>{errorText}</p>}
    </div>
  );
};

export default Input;
