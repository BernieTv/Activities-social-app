import React from 'react';
import { observer } from 'mobx-react-lite';
import { Header } from 'semantic-ui-react';

import { useStore } from '../../../app/stores/store';
import ActivityListItem from './ActivityListItem';

const ActivityList = observer(() => {
  const {
    activityStore: { gropedActivities },
  } = useStore();

  return (
    <React.Fragment>
      {gropedActivities.map(([group, activities]) => (
        <React.Fragment key={group}>
          <Header sub color="teal">
            {group}
          </Header>

          {activities.map((activity) => (
            <ActivityListItem activity={activity} key={activity.id} />
          ))}
        </React.Fragment>
      ))}
    </React.Fragment>
  );
});

export default ActivityList;
