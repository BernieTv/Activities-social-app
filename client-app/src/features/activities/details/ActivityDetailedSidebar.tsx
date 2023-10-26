import React from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { Segment, List, Label, Item, Image } from 'semantic-ui-react';

import { Activity } from '../../../app/models/activity';

interface Props {
  activity: Activity;
}

const ActivityDetailedSidebar = observer(({ activity: { attendees, host } }: Props) => {
  if (!attendees) {
    return null;
  }

  return (
    <React.Fragment>
      <Segment
        textAlign="center"
        style={{ border: 'none' }}
        attached="top"
        secondary
        inverted
        color="teal">
        {attendees.length} {attendees.length === 1 ? 'Person' : 'People'} going
      </Segment>

      <Segment attached>
        <List relaxed divided>
          {attendees.map((attendee) => (
            <Item style={{ position: 'relative' }} key={attendee.username}>
              {attendee.username === host?.username ? (
                <Label style={{ position: 'absolute' }} color="orange" ribbon="right">
                  Host
                </Label>
              ) : null}

              <Image size="tiny" src={attendee.image || '/assets/user.png'} />

              <Item.Content verticalAlign="middle">
                <Item.Header as="h3">
                  <Link to={`/profiles/${attendee.username}`}>{attendee.displayName}</Link>
                </Item.Header>
                <Item.Extra style={{ color: 'orange' }}>Foll owing</Item.Extra>
              </Item.Content>
            </Item>
          ))}
        </List>
      </Segment>
    </React.Fragment>
  );
});

export default ActivityDetailedSidebar;
