import { Fragment } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import AuthState from './context/auth/AuthState';
import Login from './views/auth/Login';
import Register from './views/auth/Register';
import Coin from './views/Coin';
import Dashboard from './views/Dashboard';
import Portfolio from './views/Portfolio';
import PrivateRoute from './views/PrivateRoute';
import { ThemeProvider } from "styled-components";
import { theme } from "./styles/theme";
import NotFound from './views/NotFound';





const App = () => {

  return (
    <ThemeProvider theme={theme}>
      <AuthState>
        <Router>
          <Fragment>
            <div className='App'>
              <Navbar />
              <Routes>
                <Route path="/" element={<Navigate replace to="/dashboard" />} />
                <Route path='/login' element={<Login />} exact />
                <Route path='/register' element={<Register />} exact />
                <Route path='/coins/:id' element={<Coin />} exact />
                <Route path='/portfolio' element={<PrivateRoute />} exact >
                  <Route path='/portfolio' element={<Portfolio />} exact />
                </Route>
                <Route path='/dashboard' element={<Dashboard />} exact />
                <Route path='*' element={<NotFound />} />
              </Routes>
            </div>
          </Fragment>
        </Router>
      </AuthState>
    </ThemeProvider>
  );
};

export default App;