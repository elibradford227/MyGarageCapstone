import React from 'react';
import { useAuth } from '../utils/context/authContext';
import User from '../components/User';

export default function Profile() {
  const { user } = useAuth();
  return (
    <div>
      <head>
        <title>MyGarage | Profile</title>
      </head>
      <div id="profile">
        <User userObj={user} />
      </div>
    </div>
  );
}
