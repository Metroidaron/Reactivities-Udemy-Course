import * as React from 'react';
import { Grid } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../../app/stores/store';
import ActivityList from './ActivityList';
import { LoadingComponent } from '../../../app/layout/LoadingComponent';
import ActivityFilters from './ActivityFilters';

export interface iProps { }

export default observer(function ActivityDashboard(props: iProps) {
  const {activityStore} = useStore();

  React.useEffect(() => {
    if(activityStore.activityRegistry.size <= 1) {
      activityStore.loadActivities();
    }
  }, [activityStore]);

  if(activityStore.loadingInitial) return <LoadingComponent content="Loading Activities..." />;

  return <>
    <Grid>
      <Grid.Column width="10">
        <ActivityList />
      </Grid.Column>
      <Grid.Column width="6">
        <ActivityFilters />
      </Grid.Column>
    </Grid>
  </>;
});