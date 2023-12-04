import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import { Image, List, Popup } from 'semantic-ui-react';

import { Profile } from '../../../app/models/profile';
import ProfileCard from '../../profiles/ProfileCard';

interface Props {
  attendees: Profile[];
}

const styles = {
  borderColor: 'orange',
  borderWidth: 2,
};

const ActivityListItemAttendee = observer(({ attendees }: Props) => {
  return (
    <List horizontal>
      {attendees.map((attendee) => (
        <Popup
          hoverable
          key={attendee.username}
          trigger={
            <List.Item as={Link} to={`/profiles/${attendee.username}`}>
              <Image
                size="mini"
                circular
                bordered
                src={attendee.image || '/assets/user.png'}
                style={attendee.following ? styles : null}
              />
            </List.Item>
          }>
          <Popup.Content>
            <ProfileCard profile={attendee} />
          </Popup.Content>
        </Popup>
      ))}
    </List>
  );
});

export default ActivityListItemAttendee;
