import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { Grid } from 'semantic-ui-react';

import ProfileHeader from './ProfileHeader';
import ProfileContent from './ProfileContent';
import { useStore } from '../../app/stores/store';
import LoadingComponent from '../../app/layout/LoadingComponent';

const ProfilePage = observer(() => {
  const { username } = useParams<{ username: string }>();
  const {
    profileStore: { loadingProfile, loadProfile, profile },
  } = useStore();

  useEffect(() => {
    if (username) {
      loadProfile(username);
    }
  }, [loadProfile, username]);

  if (loadingProfile) {
    return <LoadingComponent content="Loading profile..." />;
  }

  return (
    <Grid>
      <Grid.Column width={16}>
        {profile ? (
          <>
            <ProfileHeader profile={profile} />
            <ProfileContent profile={profile} />
          </>
        ) : null}
      </Grid.Column>
    </Grid>
  );
});

export default ProfilePage;
