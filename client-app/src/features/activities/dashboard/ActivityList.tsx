import { observer } from 'mobx-react-lite';
import { Fragment } from 'react';
import { Header } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import ActivityListItem from './ActivityListItem';

export interface iProps {}

export default observer(function ActivityList(props: iProps) {
  const {activityStore} = useStore();

  return <>
    {activityStore.groupedActivities.map(([group, activities]) => <Fragment key={group}>
      <Header sub color="teal">
        {group}
      </Header>
      {activities.map(activity => (
        <ActivityListItem key={activity.id} activity={activity} />
      ))}
    </Fragment>)}
  </>
});