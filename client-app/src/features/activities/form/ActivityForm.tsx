import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Form, Segment } from 'semantic-ui-react';
import { LoadingComponent } from '../../../app/layout/LoadingComponent';
import { Activity } from '../../../app/models/activity';
import { useStore } from '../../../app/stores/store';
import {v4 as uuid} from 'uuid';

export interface iProps {}

export default observer(function ActivityForm (props: iProps) {
  const [activity, setActivity] = React.useState<Activity>({
    id: '',
    title: '',
    category: '',
    description: '',
    date: '',
    city: '',
    venue: ''
  });
  const {activityStore} = useStore();
  const {id} = useParams();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if(!activity.id) {
      activity.id = uuid();
      await activityStore.createActivity(activity);
      navigate(`/activities/${activity.id}`);
    } else {
      await activityStore.updateActivity(activity);
      navigate(`/activities/${activity.id}`);
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = e.target;
    setActivity({...activity, [name]: value});
  }

  React.useEffect(()=>{
    if(id) {
      activityStore.loadActivity(id).then(activity => setActivity(activity!))
    }
  },[id, activityStore, activityStore.loadActivity]);

  if(activityStore.loadingInitial) return <LoadingComponent />

  return <>
    <Segment clearing>
      <Form onSubmit={handleSubmit} autoComplete="off">
        <Form.Input placeholder="Title" name="title" value={activity.title} onChange={handleChange} />
        <Form.TextArea placeholder="Description" name="description" value={activity.description} onChange={handleChange} />
        <Form.Input placeholder="Category" name="category" value={activity.category} onChange={handleChange} />
        <Form.Input placeholder="Date" name="date" type="date" value={activity.date} onChange={handleChange} />
        <Form.Input placeholder="City" name="city" value={activity.city} onChange={handleChange} />
        <Form.Input placeholder="Venue" name="venue" value={activity.venue} onChange={handleChange} />
        <Button loading={activityStore.loading} 
          content="Submit" 
          floated='right' 
          positive 
          type="submit" 
          onClick={handleSubmit} />
        <Button 
          content="Cancel"
          as={Link} to="/activities"
          disabled={activityStore.loading} 
          floated='right' 
          positive 
          type="button" />
      </Form>
    </Segment>
  </>
});