import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import './UserItem.css';
import Avatar from '../../shared/components/UIElements/Avatar';
import Card from '../../shared/components/UIElements/Card';

const UserItem = ({ user, placesCount }) => {
  const { id, name, image } = user;
  return (
    <li className='user-item'>
      <Card className='user-item__content'>
        <Link to={`/${id}/places`}>
          <div className='user-item__image'>
            <Avatar
              image={`http://localhost:5000/${image}`}
              alt={name}
            ></Avatar>
          </div>
          <div className='user-item__info'>
            <h2>{name} </h2>
            <h3>
              {placesCount} {placesCount === 1 ? 'Place' : 'Places'}{' '}
            </h3>
          </div>
        </Link>
      </Card>
    </li>
  );
};

UserItem.propTypes = {
  user: PropTypes.object.isRequired,
};

export default UserItem;
