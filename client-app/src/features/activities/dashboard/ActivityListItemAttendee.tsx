import React from 'react';
import { observer } from 'mobx-react-lite';
import { Image, List, Popup } from 'semantic-ui-react';
import { Profile } from '../../../app/models/profile';
import { Link } from 'react-router-dom';
import ProfileCard from '../../profiles/ProfileCard';

export interface iProps {
  attendees: Profile[];
}

export default observer(function ActivityListItemAttendee({attendees} : iProps) {

  const styles = {
    borderColor: 'orange',
    borderWidth: 3
  }

  return <>
    <List horizontal>
      {attendees.map(attendee => (
        <Popup
          hoverable
          key={attendee.username}
          trigger={
            <List.Item key={attendee.username} as={Link} to={`/profiles/${attendee.username}`}>
              <Image 
                size="mini" 
                circular 
                bordered 
                style={attendee.following ? styles : undefined}
                src={attendee.image || `/assets/user.png`} />
            </List.Item>
          }>
          <Popup.Content>
            <ProfileCard profile={attendee} />
          </Popup.Content>
        </Popup>
      ))}
    </List>
  </>
});