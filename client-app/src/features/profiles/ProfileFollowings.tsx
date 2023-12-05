import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Card, Grid, Header, Tab } from 'semantic-ui-react';

import { useStore } from '../../app/stores/store';
import ProfileCard from './ProfileCard';

const ProfileFollowings = observer(() => {
  const {
    profileStore: { profile, followings, loadFollowings, loadingFollowings },
  } = useStore();

  useEffect(() => {
    loadFollowings('following');
  }, [loadFollowings]);

  return (
    <Tab.Pane loading={loadingFollowings}>
      <Grid>
        <Grid.Column width={16}>
          <Header floated="left" icon="user" content={`People following ${profile?.displayName}`} />
        </Grid.Column>

        <Grid.Column width={16}>
          <Card.Group itemsPerRow={4}>
            {followings.map((profile) => (
              <ProfileCard key={profile.username} profile={profile} />
            ))}
          </Card.Group>
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
});

export default ProfileFollowings;
