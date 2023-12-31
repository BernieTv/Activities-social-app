import { toast } from 'react-toastify';
import { Button, Header, Icon, Segment } from 'semantic-ui-react';

import agent from '../../app/api/agent';
import useQuery from '../../app/util/hooks';

const RegisterSuccess = () => {
  const email = useQuery().get('email') as string;

  const handleConfirmationEmailResend = () => {
    agent.Account.resendEmailConfirmation(email)
      .then(() => {
        toast.success('Verification email resend - please check your email');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Segment placeholder textAlign="center">
      <Header icon color="green">
        <Icon name="check" />
        Successfully registered!
      </Header>

      <p>Please check your email (including junk email) for the verification email</p>

      {email ? (
        <>
          <p>Didn't receive the email? Click the below button to resend</p>
          <Button
            primary
            onClick={handleConfirmationEmailResend}
            content="Resend email"
            size="huge"
          />
        </>
      ) : null}
    </Segment>
  );
};

export default RegisterSuccess;
