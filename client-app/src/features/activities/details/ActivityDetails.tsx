import * as React from 'react';
import { Button, Card, Image } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';

export interface iProps {
  activity: Activity;
  cancelSelectActivity: () => void;
  openForm: (id: string) => void;
}

export default function ActivityDetails(props: iProps) {
  return <>
    <Card fluid>
      <Image src={`/assets/categoryImages/${props.activity.category}.jpg`} wrapped ui={false} />
      <Card.Content>
        <Card.Header>{props.activity.title}</Card.Header>
        <Card.Meta>
          <span>{props.activity.date}</span>
        </Card.Meta>
        <Card.Description>
          {props.activity.description}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths={2}>
          <Button basic color="blue" content="Edit" onClick={() => props.openForm(props.activity.id)} />
          <Button basic color="grey" content="Cancel" onClick={() => props.cancelSelectActivity()} />
        </Button.Group>
      </Card.Content>
    </Card>
  </>
}