import * as React from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon, Item, Label, Segment } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';
import { format } from 'date-fns';
import ActivityListItemAttendee from './ActivityListItemAttendee';

export interface iProps {
  activity: Activity;
}

export default function ActivityListItem(props: iProps) {
  const {activity} = props;

  return <>
    <Segment.Group>
      <Segment>
        {activity.isCancelled && <Label content="Canceled" attached='top' color='red' style={{textAlign: 'center'}} />}
        <Item.Group>
          <Item>
            <Item.Image style={{marginBottom: 3}} size="tiny" circular src={activity.host?.image || "/assets/user.png"} />
            <Item.Content>
              <Item.Header as={Link} to={`/activities/${activity.id}`}>
                {activity.title}
              </Item.Header>
              <Item.Description>
                Hosted By <Link to={`/profiles/${activity.hostUsername}`}>{activity.host?.displayName}</Link>
              </Item.Description>
              {activity.isHost && (
                <Item.Description>
                  <Label basic color="orange">
                    You are hosting this activity
                  </Label>
                </Item.Description>
              )}
              {activity.isGoing && !activity.isHost && (
                <Item.Description>
                  <Label basic color="green">
                    You are going to this activity
                  </Label>
                </Item.Description>
              )}
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      
      <Segment>
        <span>
          <Icon name="clock" /> {format(activity.date!, 'dd MMM yyyy h:mm aa')}
          <Icon name="marker" /> {activity.venue}
        </span>
      </Segment>

      <Segment secondary>
        <ActivityListItemAttendee attendees={activity.attendees!} />
      </Segment>

      <Segment clearing>
        <span>{activity.description}</span>
        <Button 
          content="View" 
          as={Link} to={`/activities/${activity.id}`}
          color="teal"
          floated="right" />
      </Segment>
    </Segment.Group>
  </>
}