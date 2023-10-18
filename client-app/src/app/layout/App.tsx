import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import NavBar from './NavBar';
import HomePage from '../../features/home/HomePage';

const App = () => {
  const location = useLocation();

  return (
    <React.Fragment>
      {location.pathname === '/' ? (
        <HomePage />
      ) : (
        <React.Fragment>
          <NavBar />

          <Container style={{ marginTop: '7em' }}>
            <Outlet />
          </Container>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default App;
