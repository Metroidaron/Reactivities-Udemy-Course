import * as React from 'react';
import { Dimmer, Loader } from "semantic-ui-react";

export interface iProps {
  inverted?: boolean;
  content?: string;
}

export const LoadingComponent = (props: iProps) => {
  return (
    <Dimmer active={true} inverted={props.inverted ?? true}>
      <Loader content={props.content ?? "Loading..."} />
    </Dimmer>
  )
}