/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import {
  Navbar, Container, Nav, Button,
} from 'react-bootstrap';
import { signOut } from '../utils/auth';

export default function NavBarAuth() {
  return (
    <Navbar id="nav" collapseOnSelect expand="lg">
      <Container>
        <Link passHref href="/">
          <Navbar.Brand>
            <img
              src="/MyGarageNavLogo.png"
              width="240"
              height="60"
              id="navLogo"
              alt=""
            />{' '}
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Link passHref href="/cars">
              <Nav.Link>Cars</Nav.Link>
            </Link>
            <Link passHref href="/jobs">
              <Nav.Link>Jobs</Nav.Link>
            </Link>
          </Nav>
          <Nav className="ms-auto">
            <Link passHref href="/profile">
              <Nav.Link id="navProfile">Profile</Nav.Link>
            </Link>
            <Button id="signOutBtn" onClick={signOut}>Sign Out</Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
