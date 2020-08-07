import React from 'react';

import './PlaceForm.css';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import { useForm } from '../../shared/hooks/form-hooks';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from '../../shared/utils/validator';

const NewPlace = () => {
  const [formState, inputHandler] = useForm(
    {
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
    false
  );

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
