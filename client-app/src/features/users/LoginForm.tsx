import { ErrorMessage, Form, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import { Button, Label } from 'semantic-ui-react';

import MyTextInput from '../../app/common/form/MyTextInput';
import { useStore } from '../../app/stores/store';

const LoginForm = observer(() => {
  const {
    userStore: { login },
  } = useStore();

  return (
    <Formik
      initialValues={{ email: '', password: '', error: null }}
      onSubmit={(values, { setErrors }) =>
        login(values).catch(() => setErrors({ error: 'Invalid email or password' }))
      }>
      {({ handleSubmit, isSubmitting, errors }) => (
        <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
          <MyTextInput placeholder="Email" name="email" />
          <MyTextInput placeholder="Password" name="password" type="password" />

          <ErrorMessage
            name="error"
            render={() => (
              <Label style={{ marginBottom: 10 }} basic color="red" content={errors.error} />
            )}
          />

          <Button positive content="Login" type="submit" fluid loading={isSubmitting} />
        </Form>
      )}
    </Formik>
  );
});

export default LoginForm;
