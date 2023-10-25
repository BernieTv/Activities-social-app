import { useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';

import ActivityList from './ActivityList';
import { useStore } from '../../../app/stores/store';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import ActivityFilters from './ActivityFilters';

const ActivityDashboard = observer(() => {
  const {
    activityStore: { loadActivities, loadingInitial, activityRegistry },
  } = useStore();

  useEffect(() => {
    if (activityRegistry.size <= 1) {
      loadActivities();
    }
  }, [activityRegistry.size, loadActivities]);

  if (loadingInitial) {
    return <LoadingComponent content="Loading activities..." />;
  }

  return (
    <Grid>
      <Grid.Column width="10">
        <ActivityList />
      </Grid.Column>

      <Grid.Column width="6">
        <ActivityFilters />
      </Grid.Column>
    </Grid>
  );
});

export default ActivityDashboard;
