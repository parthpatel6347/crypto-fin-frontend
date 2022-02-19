import React, { useState, Fragment, useContext } from 'react';
import { Modal } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import authContext from '../context/auth/authContext';
import { NavbarContainer, NavbarInner, NavLinksContainer, NavLink, Title, LogoutBtn } from '../styles/NavbarStyles';
import Logout from '../views/auth/Logout';


const Navbar = () => {
  // State for visibility of logout modal
  const [show, setShow] = useState(false)

  // logout modal show and hide
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const location = useLocation()

  const { isAuthenticated } = useContext(authContext)


  return (
    <NavbarContainer>
      <NavbarInner>
        <Title to='/dashboard'>CryptoFin</Title>
        <NavLinksContainer>
          {isAuthenticated === true ? (
            <Fragment>
              {' '}
              <NavLink to='/dashboard' active={location.pathname === "/dashboard" ? "true" : "false"}>Dashboard</NavLink>
              <NavLink to='/portfolio' active={location.pathname === "/portfolio" ? "true" : "false"}>Portfolio</NavLink>
              <LogoutBtn onClick={handleShow}>Logout</LogoutBtn>
            </Fragment>
          ) : (
            <Fragment>
              {' '}
              <NavLink to='/dashboard' active={location.pathname === "/dashboard" ? "true" : "false"}>Dashboard</NavLink>

              <NavLink to='/login' active={location.pathname === "/login" ? "true" : "false"}>Login</NavLink>
              <NavLink to='/register' active={location.pathname === "/register" ? "true" : "false"}>Register</NavLink>
            </Fragment>
          )}
        </NavLinksContainer>
      </NavbarInner>
      <Modal show={show} onHide={handleClose}>
        <Logout hideModal={handleClose} />
      </Modal>
    </NavbarContainer>
  );
};

export default Navbar;