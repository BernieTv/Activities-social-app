import { observer } from 'mobx-react-lite';
import { Card, Header, Image, Tab } from 'semantic-ui-react';

import { Profile } from '../../app/models/profile';

interface Props {
  profile: Profile;
}

const ProfilePhotos = observer(({ profile }: Props) => {
  return (
    <Tab.Pane>
      <Header icon="image" content="Photos" />

      <Card.Group>
        {profile.photos?.map((photo) => (
          <Card key={photo.id}>
            <Image src={photo.url} />
          </Card>
        ))}
      </Card.Group>
    </Tab.Pane>
  );
});

export default ProfilePhotos;
