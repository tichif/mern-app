import React from 'react';

import UsersList from '../components/UsersList';

const Users = () => {
  const USERS = [
    {
      id: 'u1',
      name: 'John Doe',
      image:
        'https://www.liberaldictionary.com/wp-content/uploads/2018/12/men-1.jpg',
      placesCount: 3,
    },
  ];

  return <UsersList items={USERS}></UsersList>;
};

export default Users;
