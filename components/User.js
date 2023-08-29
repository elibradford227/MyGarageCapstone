/* eslint-disable react/forbid-prop-types */
/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { signOut } from '../utils/auth';

export default function User({ userObj }) {
  return (
    <div>
      <img alt="" src={userObj.photoURL} />
      <h1>{userObj.displayName}</h1>
      <p>{userObj.email}</p>
      <p>{userObj.metadata.lastSignInTime}</p>
      <Button type="button" size="lg" className="copy-btn" onClick={signOut}>
        Sign Out
      </Button>
    </div>
  );
}

User.propTypes = {
  userObj: PropTypes.shape({
    photoURL: PropTypes.string,
    displayName: PropTypes.string,
    email: PropTypes.string,
    metadata: PropTypes.object,
    lastSignInTime: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
};
