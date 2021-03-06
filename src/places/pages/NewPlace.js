import React, { useContext, Fragment } from 'react';
import { useHistory } from 'react-router-dom';

import './PlaceForm.css';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import ImageUpload from '../../shared/components/FormElements/ImageUpload';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useForm } from '../../shared/hooks/form-hooks';
import { useHttpClient } from '../../shared/hooks/http-hooks';
import { AuthContext } from '../../shared/context/auth-context';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from '../../shared/utils/validator';

const NewPlace = () => {
  const auth = useContext(AuthContext);
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
      image: {
        value: null,
        isValid: false,
      },
    },
    false
  );

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const history = useHistory();

  const placeSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('title', formState.inputs.title.value);
      formData.append('description', formState.inputs.description.value);
      formData.append('address', formState.inputs.address.value);
      formData.append('image', formState.inputs.image.value);
      await sendRequest('http://localhost:5000/api/places', 'POST', formData, {
        Authorization: `Bearer ${auth.token}`,
      });
    } catch (err) {
      console.log(err);
    }
    history.push('/');
  };

  return (
    <Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <form className='place-form' onSubmit={placeSubmitHandler}>
        {isLoading && <LoadingSpinner asOverlay />}
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
        <ImageUpload
          id='image'
          onInput={inputHandler}
          errorText='Please provide a image'
        />
        <Button type='submit' disabled={!formState.isValid}>
          Add Place
        </Button>
      </form>
    </Fragment>
  );
};

export default NewPlace;
