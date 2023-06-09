import { observer } from 'mobx-react-lite';
import React from 'react';
import { Tab } from 'semantic-ui-react';
import { Profile } from '../../app/models/profile';
import ProfilePhotos from './ProfilePhotos';
import ProfileFollowings from './ProfileFollowings';
import { useStore } from '../../app/stores/store';

export interface iProps {
  profile: Profile;
}

export default observer(function ProfileContent({profile}: iProps) {
  const {profileStore} = useStore();

  const panes = [
    {menuItem: 'About', render: () => <Tab.Pane>About</Tab.Pane>},
    {menuItem: 'Photos', render: () => <ProfilePhotos profile={profile} />},
    {menuItem: 'Events', render: () => <Tab.Pane>Events</Tab.Pane>},
    {menuItem: 'Followers', render: () => <ProfileFollowings />},
    {menuItem: 'Following', render: () => <ProfileFollowings />},
  ]

  return (
    <Tab 
      menu={{fluid: true, vertical: true}}
      menuPosition="right"
      panes={panes}
      onTabChange={(e, data) => profileStore.setActiveTab(data.activeIndex)} />
  )
})