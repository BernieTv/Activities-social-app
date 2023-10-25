import { ErrorMessage, Form, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import { Button, Header } from 'semantic-ui-react';
import * as yup from 'yup';

import MyTextInput from '../../app/common/form/MyTextInput';
import { useStore } from '../../app/stores/store';
import ValidationError from '../errors/ValidationError';

const RegisterForm = observer(() => {
  const {
    userStore: { register },
  } = useStore();

  return (
    <Formik
      initialValues={{ displayName: '', username: '', email: '', password: '', error: null }}
      onSubmit={(values, { setErrors }) => register(values).catch((error) => setErrors({ error }))}
      validationSchema={yup.object({
        displayName: yup.string().required(),
        username: yup.string().required(),
        email: yup.string().required(),
        password: yup.string().required(),
      })}>
      {({ handleSubmit, isSubmitting, errors, isValid, dirty }) => (
        <Form className="ui form error" onSubmit={handleSubmit} autoComplete="off">
          <Header as="h2" content="Sign up to Reactivities" color="teal" textAlign="center" />

          <MyTextInput placeholder="Display Name" name="displayName" />
          <MyTextInput placeholder="Username" name="username" />
          <MyTextInput placeholder="Email" name="email" />
          <MyTextInput placeholder="Password" name="password" type="password" />

          <ErrorMessage
            name="error"
            render={() => <ValidationError errors={errors.error as unknown as string[]} />}
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
