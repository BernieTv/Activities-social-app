import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Button, Card, Grid, Header, Image, Tab } from 'semantic-ui-react';

import { Profile } from '../../app/models/profile';
import { useStore } from '../../app/stores/store';

interface Props {
  profile: Profile;
}

const ProfilePhotos = observer(({ profile }: Props) => {
  const {
    profileStore: { isCurrentUser },
  } = useStore();
  const [addPhotoMode, setAddPhotoMode] = useState(false);

  return (
    <Tab.Pane>
      <Grid>
        <Grid.Column width={16}>
          <Header floated="left" icon="image" content="Photos" />

          {isCurrentUser ? (
            <Button
              floated="right"
              basic
              content={addPhotoMode ? 'Cancel' : 'Add Photo'}
              onClick={() => setAddPhotoMode((prev) => !prev)}
            />
          ) : null}
        </Grid.Column>

        <Grid.Column width={16}>
          {addPhotoMode ? (
            <p>Photo widget goes here</p>
          ) : (
            <Card.Group>
              {profile.photos?.map((photo) => (
                <Card key={photo.id}>
                  <Image src={photo.url} />
                </Card>
              ))}
            </Card.Group>
          )}
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
});

export default ProfilePhotos;
