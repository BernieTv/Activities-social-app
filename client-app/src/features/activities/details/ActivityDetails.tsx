import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { Button, Card, Image } from 'semantic-ui-react';

import { useStore } from '../../../app/stores/store';
import LoadingComponent from '../../../app/layout/LoadingComponent';

const ActivityDetails = observer(() => {
  const {
    activityStore: { selectedActivity, loadActivity, loadingInitial },
  } = useStore();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      loadActivity(id);
    }
  }, [id, loadActivity]);

  if (loadingInitial || !selectedActivity) {
    return <LoadingComponent />;
  }

  return (
    <Card fluid>
      <Image src={`/assets/categoryImages/${selectedActivity.category}.jpg`} />
      <Card.Content>
        <Card.Header>{selectedActivity.title}</Card.Header>

        <Card.Meta>
          <span>{selectedActivity.date}</span>
        </Card.Meta>

        <Card.Description>{selectedActivity.description}</Card.Description>
      </Card.Content>

      <Card.Content extra>
        <Button.Group widths="2">
          <Button
            basic
            color="blue"
            content="Edit"
            as={Link}
            to={`/manage/${selectedActivity.id}`}
          />
          <Button basic color="grey" content="Cancel" as={Link} to="/activities" />
        </Button.Group>
      </Card.Content>
    </Card>
  );
});

export default ActivityDetails;
