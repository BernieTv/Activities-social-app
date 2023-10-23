import { observer } from 'mobx-react-lite';
import { Container, Header } from 'semantic-ui-react';

import { useStore } from './store';

const ServerError = observer(() => {
  const {
    commonStore: { error },
  } = useStore();

  return (
    <Container>
      <Header as="h1" content="Server Error" />
      <Header sub as="h5" color="red" content={error?.message} />
    </Container>
  );
});

export default ServerError;
