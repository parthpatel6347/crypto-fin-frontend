import React, { useEffect, Fragment, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import authContext from '../../context/auth/authContext';
import { LogoutButton, Main, StyledText } from '../../styles/LogoutStyles';

const Logout = ({ hideModal }) => {

  const { logout, loading, token } = useContext(authContext)

  let navigate = useNavigate();


  useEffect(() => {
    // If there is no token, redirect to login
    if (!token) {
      navigate('/login');
    }
  }, [token]);

  const handleLogout = e => {
    e.preventDefault();

    logout()
      .then(res => {
        hideModal();
        navigate('/login');
      });
  };

  return (
    <Main>
      {loading === false && (
        <Fragment>
          <StyledText>Are you sure you want to logout?</StyledText>
          <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
        </Fragment>
      )}
    </Main>
  );
};

export default Logout;