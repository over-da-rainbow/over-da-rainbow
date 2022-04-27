import React from 'react';
import { Grid, Segment, Header } from 'semantic-ui-react';
import { AutoForm, ErrorsField, SelectField, SubmitField, TextField } from 'uniforms-semantic';
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Beaches } from '../../api/location/Beach';
import { Hikes } from '../../api/location/Hike';
import { Views } from '../../api/location/View';
import { Spots } from '../../api/location/Spot';
import { Volunteer } from '../../api/location/Volunteer';

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  type: {
    type: String,
    allowedValues: ['Beach', 'Hike', 'View', 'Spot', 'Volunteer'],
  },
  name: String,
  description: String,
  location: String,
  image: String,
});

const bridge = new SimpleSchema2Bridge(formSchema);

/** Renders the Page for adding a document. */
class AddLocation extends React.Component {

  // On submit, insert the data.
  submit(data, formRef) {
    const { type, name, description, location, image } = data;
    const visited = 0;
    if (type === 'Beach') {
      Beaches.collection.insert({ name, description, location, image, visited },
        (error) => {
          if (error) {
            swal('Error', error.message, 'error');
          } else {
            swal('Success', 'Location added successfully', 'success');
            formRef.reset();
          }
        });
    }
    if (type === 'Hike') {
      Hikes.collection.insert({ name, description, location, image, visited },
        (error) => {
          if (error) {
            swal('Error', error.message, 'error');
          } else {
            swal('Success', 'Location added successfully', 'success');
            formRef.reset();
          }
        });
    }
    if (type === 'Spot') {
      Spots.collection.insert({ name, description, location, image, visited },
        (error) => {
          if (error) {
            swal('Error', error.message, 'error');
          } else {
            swal('Success', 'Location added successfully', 'success');
            formRef.reset();
          }
        });
    }
    if (type === 'View') {
      Views.collection.insert({ name, description, location, image, visited },
        (error) => {
          if (error) {
            swal('Error', error.message, 'error');
          } else {
            swal('Success', 'Location added successfully', 'success');
            formRef.reset();
          }
        });
    }
    if (type === 'Volunteer') {
      Volunteer.collection.insert({ name, description, location, image, visited },
        (error) => {
          if (error) {
            swal('Error', error.message, 'error');
          } else {
            swal('Success', 'Location added successfully', 'success');
            formRef.reset();
          }
        });
    }

  }

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  render() {
    let fRef = null;
    return (
      <Grid container centered id='addLocation-page' >
        <Grid.Column>
          <Header as="h2" textAlign="center">Add Location</Header>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => this.submit(data, fRef)} >
            <Segment>
              <TextField name='name'/>
              <SelectField name='type'/>
              <TextField name='description'/>
              <TextField name='location'/>
              <TextField name='image'/>
              <SubmitField value='Submit'/>
              <ErrorsField/>
            </Segment>
          </AutoForm>
        </Grid.Column>
      </Grid>
    );
  }
}

export default AddLocation;
