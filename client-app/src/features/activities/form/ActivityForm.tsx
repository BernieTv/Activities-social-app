import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { Button, Header, Segment } from 'semantic-ui-react';
import { Formik, Form } from 'formik';
import { v4 as uuid } from 'uuid';
import * as yup from 'yup';

import { useStore } from '../../../app/stores/store';
import { Activity } from '../../../app/models/activity';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import MyTextInput from '../../../app/common/form/MyTextInput';
import MyTextArea from '../../../app/common/form/MyTextArea';
import MySelectInput from '../../../app/common/form/MySelectInput';
import { categoryOptions } from '../../../app/common/form/options/categoryOptions';
import MyDateInput from '../../../app/common/form/MyDateInput';

const validationSchema = yup.object({
  title: yup.string().required('The activity title is required.'),
  description: yup.string().required('The activity description is required.'),
  category: yup.string().required(),
  date: yup.string().required('Date is required'),
  city: yup.string().required(),
  venue: yup.string().required(),
});

const ActivityForm = observer(() => {
  const {
    activityStore: { loading, loadActivity, loadingInitial, createActivity, updateActivity },
  } = useStore();

  const [activity, setActivity] = useState<Activity>({
    id: '',
    title: '',
    category: '',
    description: '',
    date: null,
    city: '',
    venue: '',
  });

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      loadActivity(id).then((activity) => {
        if (activity) {
          setActivity(activity);
        }
      });
    }
  }, [id, loadActivity]);

  const handleFormSubmit = (activity: Activity) => {
    if (!activity.id) {
      activity.id = uuid();
      createActivity(activity).then(() => {
        return navigate(`/activities/${activity.id}`);
      });
    } else {
      updateActivity(activity).then(() => {
        return navigate(`/activities/${activity.id}`);
      });
    }
  };

  if (loadingInitial) {
    return <LoadingComponent content="Loading activity..." />;
  }

  return (
    <Segment clearing>
      <Header content="Activity Details" sub color="teal" />

      <Formik
        validationSchema={validationSchema}
        enableReinitialize
        initialValues={activity}
        onSubmit={handleFormSubmit}>
        {({ handleSubmit, isValid, isSubmitting, dirty }) => (
          <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
            <MyTextInput placeholder="Title" name="title" />

            <MyTextArea placeholder="Description" name="description" rows={3} />
            <MySelectInput placeholder="Category" name="category" options={categoryOptions} />

            <MyDateInput
              placeholderText="Date"
              name="date"
              showTimeSelect
              timeCaption="Time"
              dateFormat="MMMM d, yyyy h:m aa"
            />

            <Header content="Location Details" sub color="teal" />
            <MyTextInput placeholder="City" name="city" />
            <MyTextInput placeholder="Venue" name="venue" />

            <Button
              loading={loading}
              disabled={isSubmitting || !dirty || !isValid}
              floated="right"
              positive
              type="submit"
              content="Submit"
            />
            <Button floated="right" type="button" content="Cancel" as={Link} to="/activities" />
          </Form>
        )}
      </Formik>
    </Segment>
  );
});

export default ActivityForm;
