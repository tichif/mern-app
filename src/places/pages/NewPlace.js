import React, { useCallback } from 'react';

import './NewPlace.css';
import Input from '../../shared/components/FormElements/Input';
import { VALIDATOR_REQUIRE } from '../../shared/utils/validator';

const NewPlace = () => {
  // for avoid infinite loop, we use the useCallback hook
  // otherwise this function will be call every time the state of this component changed
  const titleInputHandler = useCallback((id, value, isValid) => {
    console.log(id, value, isValid);
  }, []);
  return (
    <form className='place-form'>
      <Input
        id='title'
        element='input'
        type='text'
        label='Title'
        errorText='Please enter a valid title'
        validators={[VALIDATOR_REQUIRE()]}
        onInput={titleInputHandler}
      ></Input>
    </form>
  );
};

export default NewPlace;
