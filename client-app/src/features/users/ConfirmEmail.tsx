import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Button, Header, Icon, Segment } from 'semantic-ui-react';

import { useStore } from '../../app/stores/store';
import useQuery from '../../app/util/hooks';
import agent from '../../app/api/agent';
import LoginForm from './LoginForm';

const Status = {
  Verifying: 'Verifying',
  Success: 'Success',
  Failed: 'Failed',
};

const ConfirmEmail = () => {
  const [status, setStatus] = useState(Status.Verifying);

  const email = useQuery().get('email') as string;
  const token = useQuery().get('token') as string;

  const { modalStore } = useStore();

  const handleConfirmationEmailResend = () => {
    agent.Account.resendEmailConfirmation(email)
      .then(() => {
        toast.success('Verification email resend - please check your email');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getBody = () => {
    switch (status) {
      case Status.Verifying:
        return <p>Verifying...</p>;

      case Status.Failed:
        return (
          <div>
            <p>Verification failed. You can try resending the verify link to your email</p>
            <Button
              primary
              onClick={handleConfirmationEmailResend}
              size="huge"
              content="Resend email"
            />
          </div>
        );

      case Status.Success:
        return (
          <div>
            <p>Email has been verified - you can now login</p>
            <Button
              primary
              onClick={() => modalStore.openModal(<LoginForm />)}
              size="huge"
              content="Login"
            />
          </div>
        );

      default:
        return null;
    }
  };

  useEffect(() => {
    agent.Account.verifyEmail(token, email)
      .then(() => {
        setStatus(Status.Success);
      })
      .catch(() => {
        setStatus(Status.Failed);
      });
  }, [email, token]);

  return (
    <Segment placeholder textAlign="center">
      <Header icon>
        <Icon name="envelope" />
        Email verification
      </Header>

      <Segment.Inline>{getBody()}</Segment.Inline>
    </Segment>
  );
};

export default ConfirmEmail;
