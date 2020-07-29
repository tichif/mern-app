import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import './UsersList.css';
import UserItem from './UserItem';

const UsersList = ({ items }) => {
  return (
    <Fragment>
      {items.length > 0 ? (
        <ul className='users-list'>
          {items.map((user) => (
            <UserItem key={user.id} user={user}></UserItem>
          ))}
        </ul>
      ) : (
        <div className='center'>
          <h2>No User Found </h2>
        </div>
      )}
    </Fragment>
  );
};

UsersList.propTypes = {
  item: PropTypes.array.isRequired,
};

export default UsersList;
