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
          height: '50vh',
          padding: '30px',
          maxWidth: '400px',
          margin: '0 auto',
        }}
      >
        <h1>Welcome to MyGarage</h1>
        <Link passHref href="/cars">
          <Button variant="secondary">Cars</Button>
        </Link>
        {/* <Button variant="secondary" onClick={signOut}>Cars</Button> */}
        <Link passHref href="/jobs">
          <Button variant="secondary">Jobs</Button>
        </Link>
        <Link passHref href="/profile">
          <Button variant="secondary">Profile</Button>
        </Link>
        <Button variant="danger" onClick={signOut}>Sign Out</Button>
      </div>
    </div>
  );
}

export default Home;
