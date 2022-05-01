import React from 'react';
import { Grid, Segment, Header, Loader } from 'semantic-ui-react';
import { AutoForm, ErrorsField, SelectField, SubmitField, TextField } from 'uniforms-semantic';
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
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
class EditLocation extends React.Component {

  // On submit, insert the data.
  submit(data) {
    const { type, name, description, location, image, _id } = data;
    if (type === 'Beach') {
      Beaches.collection.update(_id, { $set: { name, description, location, image } }, (error) => (error ?
        swal('Error', error.message, 'error') :
        swal('Success', 'Item updated successfully', 'success')));
    }
    if (type === 'Hike') {
      Hikes.collection.update(_id, { $set: { name, description, location, image } }, (error) => (error ?
        swal('Error', error.message, 'error') :
        swal('Success', 'Item updated successfully', 'success')));
    }
    if (type === 'Spot') {
      Spots.collection.update(_id, { $set: { name, description, location, image } }, (error) => (error ?
        swal('Error', error.message, 'error') :
        swal('Success', 'Item updated successfully', 'success')));
    }
    if (type === 'View') {
      Views.collection.update(_id, { $set: { name, description, location, image } }, (error) => (error ?
        swal('Error', error.message, 'error') :
        swal('Success', 'Item updated successfully', 'success')));
    }
    if (type === 'Volunteer') {
      Volunteer.collection.update(_id, { $set: { name, description, location, image } }, (error) => (error ?
        swal('Error', error.message, 'error') :
        swal('Success', 'Item updated successfully', 'success')));
    }

  }

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {
    let doc = null;
    let defType = '';
    if (Beaches.collection.findOne(this.props.documentId) != null) {
      doc = Beaches.collection.findOne(this.props.documentId);
      defType = 'Beach';
    } else if (Hikes.collection.findOne(this.props.documentId) != null) {
      doc = Hikes.collection.findOne(this.props.documentId);
      defType = 'Hike';
    } else if (Spots.collection.findOne(this.props.documentId) != null) {
      doc = Spots.collection.findOne(this.props.documentId);
      defType = 'Spot';
    } else if (Views.collection.findOne(this.props.documentId) != null) {
      doc = Views.collection.findOne(this.props.documentId);
      defType = 'View';
    } else if (Volunteer.collection.findOne(this.props.documentId) != null) {
      doc = Volunteer.collection.findOne(this.props.documentId);
      defType = 'Volunteer';
    }
    return (
      <Grid container centered id='EditLocation-page' >
        <Grid.Column>
          <Header as="h2" textAlign="center">Edit Location</Header>
          <AutoForm schema={bridge} onSubmit={data => this.submit(data)} model={doc}>
            <Segment>
              <TextField name='name'/>
              <SelectField name='type' value={defType}/>
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

EditLocation.propTypes = {
  documentId: PropTypes.string,
  model: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const documentId = match.params._id;
  // Get access to Stuff documents.
  const beachsub = Meteor.subscribe(Beaches.userPublicationName);
  const hikesub = Meteor.subscribe(Hikes.userPublicationName);
  const spotsub = Meteor.subscribe(Spots.userPublicationName);
  const viewsub = Meteor.subscribe(Views.userPublicationName);
  const volunteersub = Meteor.subscribe(Volunteer.userPublicationName);
  // Determine if the subscription is ready
  const ready = beachsub.ready() && hikesub.ready() && spotsub.ready() && viewsub.ready() && volunteersub.ready();
  return {
    documentId,
    ready,
  };
})(EditLocation);
