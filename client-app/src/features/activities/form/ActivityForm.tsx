import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { Button, Segment } from 'semantic-ui-react';
import { v4 as uuid } from 'uuid';
import { Formik, Form, Field } from 'formik';

import { useStore } from '../../../app/stores/store';
import { Activity } from '../../../app/models/activity';
import LoadingComponent from '../../../app/layout/LoadingComponent';

const ActivityForm = observer(() => {
  const {
    activityStore: { createActivity, updateActivity, loading, loadActivity, loadingInitial },
  } = useStore();

  const [activity, setActivity] = useState<Activity>({
    id: '',
    title: '',
    category: '',
    description: '',
    date: '',
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

  // const handleSubmit = () => {
  //   if (!activity.id) {
  //     activity.id = uuid();
  //     createActivity(activity).then(() => {
  //       return navigate(`/activities/${activity.id}`);
  //     });
  //   } else {
  //     updateActivity(activity).then(() => {
  //       return navigate(`/activities/${activity.id}`);
  //     });
  //   }
  // };

  // const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  //   const { name, value } = event.target;

  //   setActivity((prevValue) => ({ ...prevValue, [name]: value }));
  // };

  if (loadingInitial) {
    return <LoadingComponent content="Loading activity..." />;
  }

  return (
    <Segment clearing>
      <Formik
        enableReinitialize
        initialValues={activity}
        onSubmit={(values) => console.log(values)}>
        {({ handleSubmit }) => (
          <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
            <Field placeholder="Title" name="title" />
            <Field placeholder="Description" name="description" />
            <Field placeholder="Category" name="category" />
            <Field type="date" placeholder="Data" name="date" />
            <Field placeholder="City" name="city" />
            <Field placeholder="Venue" name="venue" />

            <Button loading={loading} floated="right" positive type="submit" content="Submit" />
            <Button floated="right" type="button" content="Cancel" as={Link} to="/activities" />
          </Form>
        )}
      </Formik>
    </Segment>
  );
});

export default ActivityForm;
