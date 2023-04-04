import * as React from 'react';
import { Grid, Loader } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../../app/stores/store';
import ActivityList from './ActivityList';
import { LoadingComponent } from '../../../app/layout/LoadingComponent';
import ActivityFilters from './ActivityFilters';
import { PagingParams } from '../../../app/models/pagination';
import InfiniteScroll from 'react-infinite-scroller';
import ActivityListItemPlaceholder from './ActivityListItemPlaceholder';

export interface iProps { }

export default observer(function ActivityDashboard(props: iProps) {
  const {activityStore} = useStore();
  const { setPagingParams, pagination } = activityStore;
  const [loadingNext, setLoadingNext] = React.useState(false);

  function handleGetNext() {
    setLoadingNext(true);
    setPagingParams(new PagingParams(pagination!.currentPage + 1));
    activityStore.loadActivities().then(() => setLoadingNext(false));
  }

  React.useEffect(() => {
    if(activityStore.activityRegistry.size <= 1) {
      activityStore.loadActivities();
    }
  }, [activityStore]);

  return <>
    <Grid>
      <Grid.Column width="10">
        {activityStore.loadingInitial && !loadingNext ? (
          <>
            <ActivityListItemPlaceholder />
            <ActivityListItemPlaceholder />
          </>
        ) : (
          <InfiniteScroll 
            pageStart={0} 
            loadMore={handleGetNext}
            initialLoad={false} 
            hasMore={!loadingNext && !!pagination && pagination.currentPage < pagination.totalPages}>
            <ActivityList />
          </InfiniteScroll>
        )}
        
      </Grid.Column>
      <Grid.Column width="6">
        <ActivityFilters />
      </Grid.Column>
      <Grid.Column width={10}>
        <Loader active={loadingNext} />
      </Grid.Column>
    </Grid>
  </>;
});