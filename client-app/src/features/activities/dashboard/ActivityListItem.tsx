import * as React from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon, Item, Label, Segment } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';
import { useStore } from '../../../app/stores/store';

export interface iProps {
  activity: Activity;
}

export default function ActivityListItem(props: iProps) {
  const {activity} = props;

  return <>
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Image size="tiny" circular src="/assets/user.png" />
            <Item.Content>
              <Item.Header as={Link} to={`/activities/${activity.id}`}>
                {activity.title}
              </Item.Header>
            </Item.Content>
            <Item.Description>
              Hosted By Bob
            </Item.Description>
          </Item>
        </Item.Group>
      </Segment>
      
      <Segment>
        <span>
          <Icon name="clock" /> {activity.date}
          <Icon name="marker" /> {activity.venue}
        </span>
      </Segment>

      <Segment secondary>
        Attendees go here
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