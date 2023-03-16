import { Message } from "semantic-ui-react";

export interface iProps {
  errors: string[];
}

export default function ValidationError({errors}: iProps) {

  return <>
    <Message error>
      {errors && (
        <Message.List>
          {errors.map( (e, i) => <Message.Item key={i}>{e}</Message.Item>)}
        </Message.List>
      )}
    </Message>
  </>

}