import React, { useState, useEffect, useContext } from 'react';
import authContext from '../../context/auth/authContext';
import { ErrorText, FormContainer, HeaderText, Main, SubmitButton } from '../../styles/Login.Styles';
import { Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';


const Register = (props) => {

  // States for Register form fields 
  const [email, setEmail] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const [errors, setErrors] = useState([])

  let navigate = useNavigate();

  const { register, error, isAuthenticated, token, loadUser, clearErrors } = useContext(authContext)

  useEffect(() => {
    clearErrors();
    // if there is a token in localstorage, load that user and redirect to dashboard
    if (token) {
      loadUser().then(() => navigate('/dashboard'));
    }
  }, [token]);

  useEffect(() => {
    // if error, prepare a array of error description and set to 'errors' state
    if (error !== null) {
      let e = []
      for (let key in error) {
        error[key].forEach(err => e.push(err))
      }
      setErrors(e);
    }
  }, [error])

  const onSubmit = e => {
    e.preventDefault();

    register({
      username: username,
      first_name: firstName,
      email: email,
      password: password1,
      re_password: password2,
      last_name: lastName,
    }).then(res => {
      if (res === "success") {
        navigate('/login');
      } else {
        setFirstName('')
        setLastName('')
        setUsername('')
        setEmail('')
        setPassword1('')
        setPassword2('')
      }
    })
  };


  return (
    <Main>
      <FormContainer style={{ height: "unset" }}>
        <HeaderText>Sign up</HeaderText>
        {error && <ErrorText>{errors.map(err => <p key={err}>{err}</p>)}</ErrorText>}
        <Form onSubmit={onSubmit}>
          <Form.Group className='mb-3'>
            <Form.Label>First Name</Form.Label>
            <Form.Control
              name='firstName'
              type='text'
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
              required
              placeholder="First Name"
              autoComplete='off' />
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              name='lastName'
              type='text'
              value={lastName}
              onChange={e => setLastName(e.target.value)}
              required
              placeholder="Last Name"
              autoComplete='off' />
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>Email address</Form.Label>
            <Form.Control onChange={e => setEmail(e.target.value)} type="email" name='email' value={email} required placeholder="Enter email" autoComplete='off' />
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>Username</Form.Label>
            <Form.Control
              name='username'
              type='text'
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
              placeholder="Username"
              autoComplete='off' />
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              name='password1'
              type='password'
              value={password1}
              onChange={e => setPassword1(e.target.value)}
              required
              placeholder="Password"
              autoComplete='off' />
          </Form.Group>
          <Form.Group className='mb-4'>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              name='password2'
              type='password'
              value={password2}
              onChange={e => setPassword2(e.target.value)}
              required
              placeholder="Confirm Password"
              autoComplete='off' />
          </Form.Group>
          <SubmitButton type='submit'>Sign up</SubmitButton>
        </Form>
      </FormContainer>
    </Main>
  );
};

export default Register;