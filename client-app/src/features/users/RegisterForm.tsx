import { ErrorMessage, Form, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import { Button, Header, Label } from 'semantic-ui-react';
import * as yup from 'yup';

import MyTextInput from '../../app/common/form/MyTextInput';
import { useStore } from '../../app/stores/store';

const RegisterForm = observer(() => {
  const {
    userStore: { register },
  } = useStore();

  return (
    <Formik
      initialValues={{ displayName: '', username: '', email: '', password: '', error: null }}
      onSubmit={(values, { setErrors }) =>
        register(values).catch(() => setErrors({ error: 'Invalid email or password' }))
      }
      validationSchema={yup.object({
        displayName: yup.string().required(),
        username: yup.string().required(),
        email: yup.string().required(),
        password: yup.string().required(),
      })}>
      {({ handleSubmit, isSubmitting, errors, isValid, dirty }) => (
        <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
          <Header as="h2" content="Sign up to Reactivities" color="teal" textAlign="center" />

          <MyTextInput placeholder="Display Name" name="displayName" />
          <MyTextInput placeholder="Username" name="username" />
          <MyTextInput placeholder="Email" name="email" />
          <MyTextInput placeholder="Password" name="password" type="password" />

          <ErrorMessage
            name="error"
            render={() => (
              <Label style={{ marginBottom: 10 }} basic color="red" content={errors.error} />
            )}
          />

          <Button
            positive
            content="Register"
            type="submit"
            fluid
            loading={isSubmitting}
            disabled={!isValid || !dirty || isSubmitting}
          />
        </Form>
      )}
    </Formik>
  );
});

export default RegisterForm;
