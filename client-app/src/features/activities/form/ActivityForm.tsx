import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';

export interface iProps {}

export default observer(function ActivityForm (props: iProps) {
  const {activityStore} = useStore();

  const initialState = activityStore.selectedActivity ?? {
    id: '',
    title: '',
    category: '',
    description: '',
    date: '',
    city: '',
    venue: ''
  }

  const [activity, setActivity] = React.useState(initialState);

  const handleSubmit = () => {
    console.log(activity);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = e.target;
    setActivity({...activity, [name]: value});
  }

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
          floated='right' 
          positive 
          type="submit" 
          content="Submit" 
          onClick={() => activity.id !== '' ? activityStore.updateActivity(activity) : activityStore.createActivity(activity)} />
        <Button 
          disabled={activityStore.loading} 
          floated='right' 
          positive 
          type="button" 
          content="Cancel" 
          onClick={() => activityStore.closeForm()} />
      </Form>
    </Segment>
  </>
});