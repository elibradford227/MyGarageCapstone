/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { Button } from 'react-bootstrap';
import { signIn } from '../utils/auth';

function Signin() {
  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        height: '90vh',
        padding: '30px',
        maxWidth: '600px',
        margin: '0 auto',
      }}
    >
      <img src="MyGarageNavLogo.png" alt="logo" />
      <h4>Click the button below to login!</h4>
      <Button type="button" size="lg" className="copy-btn" id="signOutBtn" onClick={signIn}>
        Sign In
      </Button>
    </div>
  );
}

export default Signin;
