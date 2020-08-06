import React from 'react';
import { useParams } from 'react-router-dom';

import './PlaceForm.css';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from '../../shared/utils/validator';

const DUMMY_PLACES = [
  {
    id: 'p1',
    title: 'Empire State Building',
    description: 'One of the most sky scrappers in the world',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/1/10/Empire_State_Building_%28aerial_view%29.jpg',
    address: '20 W 34th St, New York, NY 10001',
    location: {
      lat: 40.7481563,
      lng: 73.9856961,
    },
    creator: 'u1',
  },
  {
    id: 'p2',
    title: 'Empire State Building',
    description: 'One of the most sky scrappers in the world',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/1/10/Empire_State_Building_%28aerial_view%29.jpg',
    address: '20 W 34th St, New York, NY 10001',
    location: {
      lat: 40.7481563,
      lng: 73.9856961,
    },
    creator: 'u2',
  },
];

const UpdatePlace = () => {
  const placeId = useParams().placeId;

  const identifiedPlace = DUMMY_PLACES.find((place) => place.id === placeId);

  if (!identifiedPlace) {
    return (
      <div className='center'>
        <h2>Could not found place</h2>
      </div>
    );
  }

  return (
    <form className='place-form'>
      <Input
        id='title'
        type='text'
        element='input'
        label='Title'
        validators={[VALIDATOR_REQUIRE()]}
        errorText='Please enter a valid title'
        onInput={() => {}}
        valueInput={identifiedPlace.title}
        valid={true}
      ></Input>
      <Input
        id='description'
        element='textarea'
        label='Description'
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText='Please enter a valid description. (Min : 5 characters)'
        onInput={() => {}}
        valueInput={identifiedPlace.description}
        valid={true}
      ></Input>
      <Button type='submit' disabled={true}>
        UPDATE PLACE
      </Button>
    </form>
  );
};

export default UpdatePlace;
