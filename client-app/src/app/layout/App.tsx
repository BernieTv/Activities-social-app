import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { ToastContainer } from 'react-toastify';
import { Container } from 'semantic-ui-react';

import NavBar from './NavBar';
import HomePage from '../../features/home/HomePage';
import { useStore } from '../stores/store';
import LoadingComponent from './LoadingComponent';
import ModalContainer from '../common/modals/ModalContainer';

const App = observer(() => {
  const { commonStore, userStore } = useStore();

  const location = useLocation();

  useEffect(() => {
    if (commonStore.token) {
      userStore.getUser().finally(() => commonStore.setAppLoaded());
    } else {
      commonStore.setAppLoaded();
    }
  }, [commonStore, userStore]);

  if (!commonStore.appLoaded) {
    return <LoadingComponent content="Loading app..." />;
  }

  return (
    <React.Fragment>
      <ModalContainer />
      <ToastContainer position="bottom-right" theme="colored" />

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
});

export default App;
