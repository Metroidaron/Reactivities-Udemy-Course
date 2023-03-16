import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Card, Image } from 'semantic-ui-react';
import { LoadingComponent } from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';

export interface iProps { }

export default observer(function ActivityDetails(props: iProps) {
  const {activityStore} = useStore();
  const { id } = useParams();

  React.useEffect(()=>{
    if(id) {
      activityStore.loadActivity(id);
    }
  }, [id, activityStore.loadActivity])

  if(activityStore.loadingInitial || !activityStore.selectedActivity) {
    return <LoadingComponent />
  }

  return <>
    <Card fluid>
      <Image src={`/assets/categoryImages/${activityStore.selectedActivity?.category}.jpg`} wrapped ui={false} />
      <Card.Content>
        <Card.Header>{activityStore.selectedActivity?.title}</Card.Header>
        <Card.Meta>
          <span>{activityStore.selectedActivity?.date}</span>
        </Card.Meta>
        <Card.Description>
          {activityStore.selectedActivity?.description}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths={2}>
          <Button 
            content="Edit"
            as={Link} to={`/manage/${activityStore.selectedActivity.id}`}
            basic 
            color="blue" />
          <Button 
          content="Cancel"
          as={Link} to={`/activities`}
          basic 
          color="grey" />
        </Button.Group>
      </Card.Content>
    </Card>
  </>
});