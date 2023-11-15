import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Button, Grid, Header, Tab } from 'semantic-ui-react';

import { useStore } from '../../app/stores/store';
import ProfileEditForm from './ProfileEditForm';

const ProfileAbout = observer(() => {
  const [editMode, setEditMode] = useState(false);
  const {
    profileStore: { isCurrentUser, profile },
  } = useStore();

  return (
    <Tab.Pane>
      <Grid>
        <Grid.Column width="16">
          <Header floated="left" icon="user" content={`About ${profile?.displayName}`} />

          {isCurrentUser ? (
            <Button
              floated="right"
              basic
              content={editMode ? 'Cancel' : 'Edit Profile'}
              onClick={() => setEditMode(!editMode)}
            />
          ) : null}
        </Grid.Column>

        <Grid.Column width="16">
          {editMode ? (
            <ProfileEditForm setEditMode={setEditMode} />
          ) : (
            <span style={{ whiteSpace: 'pre-wrap' }}>{profile?.bio}</span>
          )}
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
});

export default ProfileAbout;
