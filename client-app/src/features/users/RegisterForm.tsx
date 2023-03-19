import { ErrorMessage, Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { Button, Header } from "semantic-ui-react";
import MyTextInput from "../../app/common/form/MyTextInput";
import { useStore } from "../../app/stores/store";
import * as Yup from 'yup';
import ValidationError from "../errors/ValidationError";

export interface iProps {}

export default observer(function RegisterForm(props: iProps) {
  const {userStore} = useStore();

  return <>
    <Formik 
      initialValues={{displayName: '', username: '', email: '', password: '', error: undefined}}
      validationSchema={Yup.object({
        displayName: Yup.string().required(),
        username: Yup.string().required(),
        email: Yup.string().required(),
        password: Yup.string().required(),
      })}
      onSubmit={(values, {setErrors}) => {
        userStore.register(values).catch(error => setErrors({error}));
      }} >
        {({handleSubmit, isSubmitting, errors, isValid, dirty}) => <>
          <Form className="ui form error" onSubmit={handleSubmit} autoComplete="off">
            <Header as="h2" content="Sign Up to Reactivities" color="teal" textAlign="center" />
            <MyTextInput placeholder="Display Name" name="displayName" />
            <MyTextInput placeholder="User Name" name="username" />
            <MyTextInput placeholder="Email" name="email" />
            <MyTextInput placeholder="Password" name="password" type="password" />
            <ErrorMessage name="error" render={() =>
              <ValidationError errors={errors.error} />
            } />
            <Button disabled={!isValid || !dirty || isSubmitting} loading={isSubmitting} positive content="Register" type="submit" fluid />
          </Form>
        </>}
    </Formik>
  </>
})