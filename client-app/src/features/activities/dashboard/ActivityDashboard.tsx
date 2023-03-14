import * as React from 'react';
import { Grid } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';
import ActivityDetails from '../details/ActivityDetails';
import ActivityForm from '../form/ActivityForm';
import ActivityList from './ActivityList';

export interface iProps {
  activities: Activity[];
  selectedActivity: Activity | undefined;
  selectActivity: (id: string) => void;
  cancelSelectActivity: () => void;
  editMode: boolean;
  openForm: (id: string) => void;
  closeForm: () => void;
  createOrEdit: (a: Activity) => void;
  deleteActivity: (id: string) => void;
}

export default function ActivityDashboard(props: iProps) {
  return <>
    <Grid>
      <Grid.Column width="10">
        <ActivityList 
          activities={props.activities} 
          selectActivity={props.selectActivity}
          deleteActivity={props.deleteActivity} />
      </Grid.Column>
      <Grid.Column width="6">
        {props.selectedActivity && 
          <ActivityDetails 
            activity={props.selectedActivity} 
            cancelSelectActivity={props.cancelSelectActivity}
            openForm={props.openForm} /> 
        }
        {props.editMode && <ActivityForm activity={props.selectedActivity} createOrEdit={props.createOrEdit} closeForm={props.closeForm} /> }
      </Grid.Column>
    </Grid>
  </>;
}