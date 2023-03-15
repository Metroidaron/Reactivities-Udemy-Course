import * as React from 'react';
import { Grid } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../../app/stores/store';
import ActivityDetails from '../details/ActivityDetails';
import ActivityForm from '../form/ActivityForm';
import ActivityList from './ActivityList';

export interface iProps { }

export default observer(function ActivityDashboard(props: iProps) {
  const {activityStore} = useStore();

  return <>
    <Grid>
      <Grid.Column width="10">
        <ActivityList />
      </Grid.Column>
      <Grid.Column width="6">
        {activityStore.selectedActivity && !activityStore.editMode &&
          <ActivityDetails /> 
        }
        {activityStore.editMode && 
          <ActivityForm /> }
      </Grid.Column>
    </Grid>
  </>;
});