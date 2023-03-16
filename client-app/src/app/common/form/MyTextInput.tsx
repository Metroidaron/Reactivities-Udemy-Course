import { useField } from 'formik';
import React from 'react';
import { Form, Label } from 'semantic-ui-react';

export interface iProps {
  placeholder: string;
  name: string;
  label?: string;
}

export default function MyTextInput(props: iProps) {
  const [field, meta] = useField(props.name);

  return <>
    <Form.Field error={meta.touched && !!meta.error}>
      <label>{props.label}</label>
      <input {...field} {...props} />
      {meta.touched && meta.error ? (
        <Label basic color="red">{meta.error}</Label>
      ) : ( undefined )}
    </Form.Field>
  </>
}