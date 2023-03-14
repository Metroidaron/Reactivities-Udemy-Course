import React from 'react';
import { Container } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import {v4 as uuid} from 'uuid';

import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import agent from '../api/agent';
import { LoadingComponent } from './LoadingComponent';

function App() {
  const [activities, setActivities] = React.useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = React.useState<Activity>();
  const [editMode, setEditMode] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [submitting, setSubmitting] = React.useState(false);

  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities.find(x => x.id  === id));
  }

  const handleCancelSelectActivity = () => {
    setSelectedActivity(undefined);
  }

  const handleFormOpen = (id?: string) => {
    id ? handleSelectActivity(id) : handleCancelSelectActivity();
    setEditMode(true);
  }

  const handleFormClose = () => {
    setEditMode(false);
  }

  const handleCreateOrEditActivity = (activity: Activity) => {
    setSubmitting(true);
    if(activity.id) {
      agent.Activities.update(activity).then(() => {
        setActivities([
          ...activities.filter(x => x.id !== activity.id), 
          {...activity, id: uuid()}
        ]);
        setSelectedActivity(activity);
        setEditMode(false);
        setSubmitting(false);
      });
    } else {
      activity.id = uuid();
      agent.Activities.create(activity).then(() => {
        setActivities([...activities, activity]);
        setSelectedActivity(activity);
        setEditMode(false);
        setSubmitting(false);
      });
    }
  }

  const handleDeleteActivity = (id: string) => {
    // setActivities([...activities.filter(x => x.id !== id)]);
    setSubmitting(true);
    agent.Activities.delete(id).then(() => {
      fetchData();
      setSubmitting(false);
    });
  } 

  const fetchData = () => {
    agent.Activities.list().then(response => {
      setActivities(response.map(i => ({...i, date: i.date.split("T")[0]}) ))
      setLoading(false);
    });
  }

  React.useEffect(() => {
    fetchData();
  }, []);

  if(loading) return <LoadingComponent content="Loading App..." />;

  return <>
    <NavBar openForm={handleFormOpen} />
    <Container style={{marginTop: '7em'}}>
      <ActivityDashboard 
        activities={activities}
        selectedActivity={selectedActivity}
        selectActivity={handleSelectActivity}
        cancelSelectActivity={handleCancelSelectActivity}
        editMode={editMode}
        openForm={handleFormOpen}
        closeForm={handleFormClose}
        createOrEdit={handleCreateOrEditActivity}
        deleteActivity={handleDeleteActivity}
        submitting={submitting} />
    </Container>
  </>;
}

export default App;
