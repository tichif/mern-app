import React, { useState, useContext, Fragment } from 'react';

import './Auth.css';
import Card from '../../shared/components/UIElements/Card';
import Button from '../../shared/components/FormElements/Button';
import Input from '../../shared/components/FormElements/Input';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from '../../shared/utils/validator';
import { useForm } from '../../shared/hooks/form-hooks';
import { AuthContext } from '../../shared/context/auth-context';

const Auth = () => {
  const auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(undefined);

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
  const submitHandler = async (e) => {
    e.preventDefault();
    if (isLoginMode) {
    } else {
      try {
        setIsLoading(true);
        const response = await fetch('http://localhost:5000/api/users/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: formState.inputs.name.value,
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
        });

        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message);
        }
        console.log(responseData);
        setIsLoading(false);
        auth.login();
      } catch (err) {
        console.log(err);
        setIsLoading(false);
        setError(err.message || 'Something went wrong, please try again');
      }
    }
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

  const errorHandler = () => {
    setError(null);
  };

  return (
    <Fragment>
      <ErrorModal error={error} onClear={errorHandler} />
      <Card className='authentication'>
        {isLoading && <LoadingSpinner asOverlay />}
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
    </Fragment>
  );
};

export default Auth;
