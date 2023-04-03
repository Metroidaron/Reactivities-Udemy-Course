import { observer } from 'mobx-react-lite';
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Icon, Image } from 'semantic-ui-react';
import { Profile } from '../../app/models/profile';
import FollowButton from './FollowButton';

export interface iProps {
  profile: Profile;
}

export default observer(function ProfileCard(props: iProps) {

  return (
    <Card as={Link} to={`/profiles/${props.profile.username}`}>
      <Image src={props.profile.image || '/assets/user.png'} />
      <Card.Content>
        <Card.Header>{props.profile.displayName}</Card.Header>
        <Card.Description>Bio goes here</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Icon name="user" />
        {props.profile.followersCount} Followers
      </Card.Content>
      <FollowButton profile={props.profile} />
    </Card>
  )
})