import React from 'react';
import PropTypes from 'prop-types';

import './PlaceItem.css';
import Card from '../../shared/components/UIElements/Card';

const PlaceItem = ({
  place: { id, imageUrl, title, description, address, creator, location },
}) => {
  return (
    <li className='place-item'>
      <Card className='place-item__content'>
        <div className='place-item__image'>
          <img src={imageUrl} alt={title} />
        </div>
        <div className='place-item__info'>
          <h2>{title}</h2>
          <h3>{address}</h3>
          <p>{description}</p>
        </div>
        <div className='place-item__actions'>
          <button>VIEW ON MAP</button>
          <button>EDIT</button>
          <button>DELETE</button>
        </div>
      </Card>
    </li>
  );
};

PlaceItem.propTypes = {
  place: PropTypes.object.isRequired,
};

export default PlaceItem;
