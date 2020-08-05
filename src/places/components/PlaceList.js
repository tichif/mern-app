import React from 'react';
import PropTypes from 'prop-types';

import './PlaceList.css';
import Card from '../../shared/components/UIElements/Card';
import PlaceItem from './PlaceItem';

const PlaceList = ({ items }) => {
  if (items.length === 0) {
    return (
      <div className='place-list center'>
        <Card>
          <h2>There are no places</h2>
          <button></button>
        </Card>
      </div>
    );
  }

  return (
    <ul className='place-list'>
      {items.map((place) => (
        <PlaceItem key={place.id} place={place}></PlaceItem>
      ))}
    </ul>
  );
};

PlaceList.propTypes = {
  items: PropTypes.array.isRequired,
};

export default PlaceList;
