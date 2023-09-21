/* eslint-disable no-nested-ternary */
/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { Button } from 'react-bootstrap';
import { signIn } from '../utils/auth';

function Signin() {
  const userAgent = window.navigator.userAgent.toLowerCase();
  const safari = /safari/.test(userAgent);
  const ios = /iphone|ipod|ipad/.test(userAgent);

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
      {ios ? (
        safari ? (
          <div>
            <h4>Click the button below to login!</h4>
            <Button type="button" size="lg" className="copy-btn" id="signOutBtn" onClick={signIn}>
              Sign In
            </Button>
          </div>
        ) : (
          <div>
            <h4>Hi there! We&apos;re sorry but MyGarage does not support authentication in apps embedded browsers. Please open MyGarage in your phones native browser, or your regular browser of choice. Thank you!</h4>
            <br />
            <h3>https://mygarageapp.netlify.app/</h3>
          </div>
        )
      ) : (
        <div>
          <h4>Click the button below to login!</h4>
          <Button type="button" size="lg" className="copy-btn" id="signOutBtn" onClick={signIn}>
            Sign In
          </Button>
        </div>
      )}
      {/* <img src="MyGarageNavLogo.png" alt="logo" />
      <h4>Click the button below to login!</h4>
      <Button type="button" size="lg" className="copy-btn" id="signOutBtn" onClick={signIn}>
        Sign In
      </Button> */}
    </div>
  );
}

export default Signin;
