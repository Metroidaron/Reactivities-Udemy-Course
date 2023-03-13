import React from 'react';
import logo from './logo.svg';
import './App.css';
import Axios from 'axios';
import { Header, List } from 'semantic-ui-react';

function App() {
  const [activities, setActivities] = React.useState([]);

  React.useEffect(() => {
    Axios.get("http://localhost:5001/api/activities")
      .then(response => {
        setActivities(response.data);
      })
      .catch(error => {})
  }, []);

  return (
    <div>
      <Header as="h2" icon="users" content="Reactivities" />
        <List>
          {activities.map((activity: any) => (
            <List.Item key={activity.id}>
              {activity.title}
            </List.Item>
          ))}
        </List>
    </div>
  );
}

export default App;
