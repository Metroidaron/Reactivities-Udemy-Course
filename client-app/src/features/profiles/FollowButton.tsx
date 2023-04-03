import * as React from 'react';
import { Profile } from '../../app/models/profile';
import { observer } from 'mobx-react-lite';
import { Reveal, Button } from 'semantic-ui-react';
import { useStore } from '../../app/stores/store';

export interface iProps {
  profile: Profile;
}

export default observer(function FollowButton({profile}: iProps) {
  const { profileStore, userStore } = useStore();
  const { updateFollowing, loading } = profileStore;

  if(userStore.user?.username === profile.username) return null;

  function handleFollow(e: React.SyntheticEvent, username: string) {
    e.preventDefault();
    profile.following ? updateFollowing(username, false) : updateFollowing(username, true);
  }

  return (
    <Reveal animated='move'>
      <Reveal.Content visible style={{width: '100%'}}>
        <Button fluid color="teal" content={profile.following ? "Following" : "Not Following"} />
      </Reveal.Content>
      <Reveal.Content hidden style={{width: '100%'}}>
        <Button 
          content={profile.following ? "Un-Follow" : "Follow"} 
          color={profile.following ? 'red' : 'green'} 
          fluid 
          loading={loading}
          onClick={(e) => handleFollow(e, profile.username) }
          basic />
      </Reveal.Content>
    </Reveal>
  );
})