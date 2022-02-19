import React, { useState, useEffect, useContext } from 'react';
import authContext from '../../context/auth/authContext';
import { useNavigate } from 'react-router-dom';
import { ErrorText, FormContainer, HeaderText, Main, SubmitButton } from '../../styles/Login.Styles';
import { Form } from 'react-bootstrap'

const Login = (props) => {

  // State for form fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  let navigate = useNavigate();

  const { login, error, loadUser, token, clearErrors } = useContext(authContext)

  useEffect(() => {
    clearErrors()
    // if token in local storage, load user and redirect to dashboard
    if (token) {
      loadUser().then(() => navigate('/dashboard'));
    }
  }, [token]);

  const onSubmit = e => {
    e.preventDefault();
    login({ email, password })
  };

  return (
    <Main>
      <FormContainer>
        <HeaderText>Log in</HeaderText>
        {error && <ErrorText>Cannot log in with provided credentials.</ErrorText>}
        <Form onSubmit={onSubmit} style={{ width: "100%" }}>
          <Form.Group className='mb-3'>
            <Form.Label>Email address</Form.Label>
            <Form.Control onChange={e => setEmail(e.target.value)} type="email" name='email' value={email} required placeholder="Enter email" autoComplete='off' />
          </Form.Group>
          <Form.Group className="mb-4" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control onChange={e => setPassword(e.target.value)} name='password' type="password" placeholder="Password" value={password} required />
          </Form.Group>
          <SubmitButton type="submit">Log in</SubmitButton>
        </Form>
      </FormContainer>
    </Main>
  );
};

export default Login;