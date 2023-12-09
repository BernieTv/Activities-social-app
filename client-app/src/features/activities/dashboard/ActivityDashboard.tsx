import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import InfiniteScroll from 'react-infinite-scroller';
import { Grid, Loader } from 'semantic-ui-react';

import ActivityList from './ActivityList';
import { useStore } from '../../../app/stores/store';
import ActivityFilters from './ActivityFilters';
import { PagingParams } from '../../../app/models/pagination';
import ActivityListItemPlaceholder from './ActivityListItemPlaceholder';

const ActivityDashboard = observer(() => {
  const [loadingNext, setLoadingNext] = useState(false);

  const {
    activityStore: {
      loadActivities,
      loadingInitial,
      activityRegistry,
      setPagingParams,
      pagination,
    },
  } = useStore();

  useEffect(() => {
    if (activityRegistry.size <= 1) {
      loadActivities();
    }
  }, [activityRegistry.size, loadActivities]);

  const handleGetNext = () => {
    setLoadingNext(true);

    if (pagination?.currentPage) {
      setPagingParams(new PagingParams(pagination.currentPage + 1));
    }

    loadActivities().then(() => setLoadingNext(false));
  };

  return (
    <Grid>
      <Grid.Column width="10">
        {loadingInitial && activityRegistry.size === 0 && !loadingNext ? (
          <>
            <ActivityListItemPlaceholder />
            <ActivityListItemPlaceholder />
          </>
        ) : (
          <InfiniteScroll
            pageStart={0}
            loadMore={handleGetNext}
            hasMore={!loadingNext && !!pagination && pagination.currentPage < pagination.totalItems}
            initialLoad={false}>
            <ActivityList />
          </InfiniteScroll>
        )}
      </Grid.Column>

      <Grid.Column width={6}>
        <ActivityFilters />
      </Grid.Column>

      <Grid.Column width={10}>
        <Loader active={loadingNext} />
      </Grid.Column>
    </Grid>
  );
});

export default ActivityDashboard;
