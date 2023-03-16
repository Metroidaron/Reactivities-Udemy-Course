import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Header, Segment } from 'semantic-ui-react';
import { LoadingComponent } from '../../../app/layout/LoadingComponent';
import { Activity } from '../../../app/models/activity';
import { useStore } from '../../../app/stores/store';
import {v4 as uuid} from 'uuid';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import MyTextInput from '../../../app/common/form/MyTextInput';
import MyTextArea from '../../../app/common/form/MyTextArea';
import MySelectInput from '../../../app/common/form/MySelectInput';
import { categoryOptions } from '../../../app/common/options/CategoryOptions';
import MyDateInput from '../../../app/common/form/MyDateInput';

export interface iProps {}

export default observer(function ActivityForm (props: iProps) {
  const [activity, setActivity] = React.useState<Activity>({
    id: '',
    title: '',
    category: '',
    description: '',
    date: undefined,
    city: '',
    venue: ''
  });
  const {activityStore} = useStore();
  const {id} = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (activity: Activity) => {
    if(!activity.id) {
      activity.id = uuid();
      await activityStore.createActivity(activity);
      navigate(`/activities/${activity.id}`);
    } else {
      await activityStore.updateActivity(activity);
      navigate(`/activities/${activity.id}`);
    }
  }

  const validationSchema = Yup.object({
    title: Yup.string().required('The Activity Title is Required'),
    description: Yup.string().required('The Activity Description is Required'),
    category: Yup.string().required(),
    date: Yup.string().required("Date is Required"),
    venue: Yup.string().required(),
    city: Yup.string().required()
  })

  React.useEffect(()=>{
    if(id) {
      activityStore.loadActivity(id).then(activity => setActivity(activity!))
    }
  },[id, activityStore, activityStore.loadActivity]);

  if(activityStore.loadingInitial) return <LoadingComponent />

  return <>
    <Segment clearing>
      <Header content="Activity Details" color="teal" />
      <Formik 
        validationSchema={validationSchema} 
        enableReinitialize 
        initialValues={activity} 
        onSubmit={values => handleSubmit(values)}>
        {({handleSubmit, isValid, isSubmitting, dirty}) => (
          <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
            <MyTextInput placeholder="Title" name="title" />
            <MyTextArea placeholder="Description" name="description" rows={3} />
            <MySelectInput placeholder="Category" name="category" options={categoryOptions} />
            <MyDateInput
              placeholderText="Date" 
              name="date"
              showTimeSelect
              timeCaption='time'
              dateFormat={`MMMM d, yyyy h:mm aa`}
              />
            <Header content="Location Details" color="teal" />
            <MyTextInput placeholder="City" name="city" />
            <MyTextInput placeholder="Venue" name="venue" />
            <Button loading={activityStore.loading} 
              disabled={isSubmitting || !dirty || !isValid}
              content="Submit" 
              floated='right' 
              positive 
              type="submit" />
            <Button 
              content="Cancel"
              as={Link} to="/activities"
              disabled={activityStore.loading} 
              floated='right' 
              positive 
              type="button" />
          </Form>
        )}
      </Formik>
    </Segment>
  </>
});