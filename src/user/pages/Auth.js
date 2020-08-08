import React, { useState } from 'react';

import './Auth.css';
import Card from '../../shared/components/UIElements/Card';
import Button from '../../shared/components/FormElements/Button';
import Input from '../../shared/components/FormElements/Input';
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from '../../shared/utils/validator';
import { useForm } from '../../shared/hooks/form-hooks';

const Auth = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);

  const [formState, inputHandler, setFormData] = useForm(
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

  // Submit the form
  const submitHandler = (e) => {
    e.preventDefault();
    console.log(formState.inputs);
  };

  // Switch mode functionality
  const switchModeHandler = () => {
    if (!isLoginMode) {
      // Signup mode to login form
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
        },
        formState.inputs.email.isValid && formState.inputs.password.isvalid
      );
    } else {
      // login mode to signup mode
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: '',
            isValid: false,
          },
        },
        false
      );
    }
    setIsLoginMode((prevMode) => !prevMode);
  };

  return (
    <Card className='authentication'>
      <h2>{isLoginMode ? 'LOGIN' : 'SIGNUP'}</h2>
      <hr />
      <form>
        {!isLoginMode && (
          <Input
            element='input'
            label='Name'
            type='name'
            id='name'
            onInput={inputHandler}
            validators={[VALIDATOR_REQUIRE()]}
            errorText='Please enter a valid name'
          ></Input>
        )}
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
          onClick={submitHandler}
        >
          {isLoginMode ? 'LOGIN' : 'SIGNUP'}
        </Button>
      </form>
      <Button inverse onClick={switchModeHandler}>
        SWITCH TO {!isLoginMode ? 'LOGIN' : 'SIGNUP'}
      </Button>
    </Card>
  );
};

export default Auth;
