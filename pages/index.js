/* eslint-disable @next/next/no-img-element */
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import { signOut } from '../utils/auth';

function Home() {
  return (
    <div>
      <head>
        <title>MyGarage</title>
      </head>
      <div
        className="text-center d-flex flex-column justify-content-center align-content-center"
        style={{
          height: '60vh',
          padding: '30px',
          maxWidth: '550px',
          margin: '0 auto',
        }}
      >
        <img src="banner.png" alt="logo" />
        <img src="MyGarageNavLogo.png" alt="logo" />
        <br />
        <Link passHref href="/cars">
          <Button variant="secondary" className="homeBtn">Cars</Button>
        </Link>
        <Link passHref href="/jobs">
          <Button variant="secondary" className="homeBtn">Jobs</Button>
        </Link>
        <Link passHref href="/profile">
          <Button variant="secondary" className="homeBtn">Profile</Button>
        </Link>
        <Button onClick={signOut} id="signOutBtnHome">Sign Out</Button>
      </div>
    </div>
  );
}

export default Home;
