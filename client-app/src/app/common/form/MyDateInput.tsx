import { useField } from 'formik';
import { Form, Label } from 'semantic-ui-react';
import DatePicker, { ReactDatePickerProps } from 'react-datepicker';
 
export interface iProps extends Partial<ReactDatePickerProps> {}

export default function MyTextInput(props: iProps) {
  const [field, meta, helpers] = useField(props.name!);

  return <>
    <Form.Field error={meta.touched && !!meta.error}>
      <DatePicker
        {...field}
        {...props}
        selected={((field.value && new Date(field.value)) || undefined)}
        onChange={value => helpers.setValue(value)}
      />
      {meta.touched && meta.error ? (
        <Label basic color="red">{meta.error}</Label>
      ) : ( undefined )}
    </Form.Field>
  </>
}