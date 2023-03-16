import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { useParams } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';
import { LoadingComponent } from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import ActivityDetailedChat from './ActivityDetailedChat';
import ActivityDetailedHeader from './ActivityDetailedHeader';
import ActivityDetailedInfo from './ActivityDetailedInfo';
import ActivityDetailedSideBar from './ActivityDetailedSidebar';

export interface iProps { }

export default observer(function ActivityDetails(props: iProps) {
  const {activityStore} = useStore();
  const { id } = useParams();

  React.useEffect(()=>{
    if(id) {
      activityStore.loadActivity(id);
    }
  }, [id, activityStore, activityStore.loadActivity])

  if(activityStore.loadingInitial || !activityStore.selectedActivity) {
    return <LoadingComponent />
  }

  return <>
    <Grid>
      <Grid.Column width={10}>
        <ActivityDetailedHeader activity={activityStore.selectedActivity} />
        <ActivityDetailedInfo activity={activityStore.selectedActivity} />
        <ActivityDetailedChat />
      </Grid.Column>

      <Grid.Column width={6}>
        <ActivityDetailedSideBar />
      </Grid.Column>
    </Grid>
  </>
});