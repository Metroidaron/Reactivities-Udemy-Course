import * as React from 'react';
import { Button, Container, Menu } from 'semantic-ui-react';

export interface iProps {
  openForm: () => void;
}


export default function NavBar(props: iProps) {
  return <>
    <Menu inverted fixed="top">
      <Container>
        <Menu.Item header>
          <img src="/assets/logo.png" alt="logo" style={{marginRight: 10}} />
          Reactivities
        </Menu.Item>
        <Menu.Item name="Activities" />
        <Menu.Item>
          <Button onClick={() => props.openForm()} positive content="Create Activity" />
        </Menu.Item>
      </Container>
    </Menu>
  </>
}