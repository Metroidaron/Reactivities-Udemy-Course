import React from 'react';
import Axios from 'axios';
import { Container } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import {v4 as uuid} from 'uuid';

import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';

function App() {
  const [activities, setActivities] = React.useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = React.useState<Activity>();
  const [editMode, setEditMode] = React.useState(false);

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
    if(activity.id) {
      setActivities([
        ...activities.filter(x => x.id !== activity.id), 
        {...activity, id: uuid()}
      ]);
    } else {
      setActivities([...activities, activity]);
    }
    setEditMode(false);
    setSelectedActivity(activity);
  }

  const handleDeleteActivity = (id: string) => {
    setActivities([...activities.filter(x => x.id !== id)]);
  } 

  React.useEffect(() => {
    Axios.get<Activity[]>("http://localhost:5001/api/activities")
      .then(response => {
        setActivities(response.data);
      })
      .catch(error => {})
  }, []);

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
        deleteActivity={handleDeleteActivity} />
    </Container>
  </>;
}

export default App;