import React from 'react';

import './Auth.css';
import Card from '../../shared/components/UIElements/Card';
import Button from '../../shared/components/FormElements/Button';
import Input from '../../shared/components/FormElements/Input';
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
} from '../../shared/utils/validator';
import { useForm } from '../../shared/hooks/form-hooks';

const Auth = () => {
  const [formState, inputHandler] = useForm(
    {
      email: {
        value: '',
        isValid: false,
      },
      password: {
        value: '',
        isValid: false,
      },
    },
    false
  );

  const loginHandler = (e) => {
    e.preventDefault();
    console.log(formState.inputs);
  };

  return (
    <Card className='authentication'>
      <h2>Login required</h2>
      <hr />
      <form>
        <Input
          element='input'
          label='Email'
          type='email'
          id='email'
          validators={[VALIDATOR_EMAIL()]}
          errorText='Please enter a valid email.'
          onInput={inputHandler}
        ></Input>
        <Input
          element='input'
          label='Password'
          type='password'
          id='password'
          validators={[VALIDATOR_MINLENGTH(6)]}
          errorText='Please enter a valid password at least 6 characters.'
          onInput={inputHandler}
        ></Input>
        <Button
          type='submit'
          disabled={!formState.isValid}
          onClick={loginHandler}
        >
          SUBMIT
        </Button>
      </form>
    </Card>
  );
};

export default Auth;
