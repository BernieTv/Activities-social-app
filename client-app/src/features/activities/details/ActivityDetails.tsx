import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { Grid } from 'semantic-ui-react';

import { useStore } from '../../../app/stores/store';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import ActivityDetailedHeader from './ActivityDetailedHeader';
import ActivityDetailedInfo from './ActivityDetailedInfo';
import ActivityDetailedChat from './ActivityDetailedChat';
import ActivityDetailedSidebar from './ActivityDetailedSidebar';

const ActivityDetails = observer(() => {
  const {
    activityStore: { selectedActivity, loadActivity, loadingInitial, clearSelectedActivity },
  } = useStore();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      loadActivity(id);
    }

    return () => {
      clearSelectedActivity();
    };
  }, [id, loadActivity, clearSelectedActivity]);

  if (loadingInitial || !selectedActivity) {
    return <LoadingComponent />;
  }

  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityDetailedHeader activity={selectedActivity} />
        <ActivityDetailedInfo activity={selectedActivity} />
        <ActivityDetailedChat activityId={selectedActivity.id} />
      </Grid.Column>

      <Grid.Column width={6}>
        <ActivityDetailedSidebar activity={selectedActivity} />
      </Grid.Column>
    </Grid>
  );
});

export default ActivityDetails;
