import React, { useCallback, useReducer } from 'react';

import './PlaceForm.css';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from '../../shared/utils/validator';

const formReducer = (state, action) => {
  switch (action.type) {
    case 'INPUT_CHANGE':
      let formIsValid = true;
      for (const inputId in state.inputs) {
        if (inputId === action.inputId) {
          formIsValid = formIsValid && action.isValid;
        } else {
          formIsValid = formIsValid && state.inputs[inputId].isValid;
        }
      }
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: {
            value: action.payload,
            isValid: action.isValid,
          },
        },
        isValid: formIsValid,
      };
    default:
      return state;
  }
};

const NewPlace = () => {
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: {
      title: {
        value: '',
        isValid: false,
      },
      description: {
        value: '',
        isValid: false,
      },
      address: {
        value: '',
        isValid: false,
      },
    },
    isValid: false, // for the overall form
  });
  // for avoid infinite loop, we use the useCallback hook
  // otherwise this function will be call every time the state of this component changed
  const inputHandler = useCallback((id, value, isValid) => {
    dispatch({
      type: 'INPUT_CHANGE',
      payload: value,
      inputId: id,
      isValid: isValid,
    });
  }, []);

  const placeSubmitHandler = (e) => {
    e.preventDefault();
    console.log(formState.inputs);
  };

  return (
    <form className='place-form' onSubmit={placeSubmitHandler}>
      <Input
        id='title'
        element='input'
        type='text'
        label='Title'
        errorText='Please enter a valid title'
        validators={[VALIDATOR_REQUIRE()]}
        onInput={inputHandler}
      ></Input>
      <Input
        id='description'
        element='textarea'
        label='Description'
        errorText='Please enter a valid description'
        validators={[VALIDATOR_MINLENGTH(5)]}
        onInput={inputHandler}
      ></Input>
      <Input
        id='address'
        element='input'
        type='text'
        label='Address'
        errorText='Please enter a valid address'
        validators={[VALIDATOR_REQUIRE()]}
        onInput={inputHandler}
      ></Input>
      <Button type='submit' disabled={!formState.isValid}>
        Add Place
      </Button>
    </form>
  );
};

export default NewPlace;
