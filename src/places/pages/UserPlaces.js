import React from 'react';
import PropTypes from 'prop-types';

import PlaceList from '../components/PlaceList';

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
      long: 73.9856961,
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
      long: 73.9856961,
    },
    creator: 'u2',
  },
];

const UserPlaces = (props) => {
  return <PlaceList items={DUMMY_PLACES}></PlaceList>;
};

UserPlaces.propTypes = {};

export default UserPlaces;