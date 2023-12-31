import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import FacebookLogin, { FailResponse, SuccessResponse } from '@greatsumini/react-facebook-login';
import { Button, Container, Divider, Header, Image, Segment } from 'semantic-ui-react';

import { useStore } from '../../app/stores/store';
import LoginForm from '../users/LoginForm';
import RegisterForm from '../users/RegisterForm';

const HomePage = observer(() => {
  const {
    userStore: { isLoggedIn, facebookLogin, fbLoading },
    modalStore: { openModal },
  } = useStore();

  return (
    <Segment inverted textAlign="center" vertical className="masthead">
      <Container text>
        <Header as="h1" inverted>
          <Image size="massive" src="/assets/logo.png" alt="logo" style={{ marginBottom: 12 }} />
          Reactivities
        </Header>

        {isLoggedIn ? (
          <>
            <Header as="h2" inverted content="Welcome to Reactivities"></Header>
            <Button as={Link} to="/activities" size="huge" inverted>
              Go to Activities!
            </Button>
          </>
        ) : (
          <>
            <Button onClick={() => openModal(<LoginForm />)} size="huge" inverted>
              Login!
            </Button>

            <Button onClick={() => openModal(<RegisterForm />)} size="huge" inverted>
              Register!
            </Button>

            <Divider horizontal inverted>
              Or
            </Divider>

            <FacebookLogin
              appId="334148852712724"
              onSuccess={(response: SuccessResponse) => {
                console.log('Login success!', response);

                facebookLogin(response.accessToken);
              }}
              onFail={(response: FailResponse) => {
                console.log('Login failed!', response);
              }}
              className={`ui button facebook huge inverted ${fbLoading && 'loading'}`}
            />
          </>
        )}
      </Container>
    </Segment>
  );
});

export default HomePage;
