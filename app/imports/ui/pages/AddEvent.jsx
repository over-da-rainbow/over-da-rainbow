import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Grid, Segment, Header, Loader } from 'semantic-ui-react';
import { AutoForm, ErrorsField, DateField, SubmitField, TextField, SelectField } from 'uniforms-semantic';
import swal from 'sweetalert';
import { withTracker } from 'meteor/react-meteor-data';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import PropTypes from 'prop-types';
import { Events } from '../../api/message/Event';
import { Beaches } from '../../api/location/Beach';
import { Hikes } from '../../api/location/Hike';
import { Spots } from '../../api/location/Spot';
import { Views } from '../../api/location/View';
import { Volunteer } from '../../api/location/Volunteer';

// Create a schema to specify the structure of the data to appear in the form.

/** Renders the Page for adding a document. */
class AddEvent extends React.Component {

  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // On submit, insert the data.
  submit(data, formRef) {
    const name = Meteor.user().username;
    const { title, datetimea, location } = data;
    const datetimex = new Date(datetimea);
    const datetime = datetimex.toLocaleString('en-US', { timeZone: 'Etc/GMT' });
    Events.collection.insert({ name, title, datetime, location },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Event added successfully', 'success');
          formRef.reset();
        }
      });
  }

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  renderPage() {
    let fRef = null;
    const locations = [...this.props.beaches, ...this.props.hikes, ...this.props.spots, ...this.props.views, ...this.props.volunteer];
    const names = [];
    for (let i = 0; i < locations.length; i++) {
      names.push(locations[i].name);
    }
    // check for duplicate names when adding locations
    const formSchema = new SimpleSchema({
      title: String,
      datetimea: String,
      location: {
        type: String,
        allowedValues: names,
      },
    });

    const bridge = new SimpleSchema2Bridge(formSchema);
    return (
      <Grid container centered id='addEvent-page' >
        <Grid.Column>
          <Header as="h2" textAlign="center">Add Event</Header>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => this.submit(data, fRef)} >
            <Segment>
              <TextField name='title'/>
              <DateField name='datetimea'/>
              <SelectField name='location'/>
              <SubmitField value='Create Event'/>
              <ErrorsField/>
            </Segment>
          </AutoForm>
        </Grid.Column>
      </Grid>
    );
  }
}

AddEvent.propTypes = {
  beaches: PropTypes.array,
  hikes: PropTypes.array,
  spots: PropTypes.array,
  views: PropTypes.array,
  volunteer: PropTypes.array,
  model: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  // Get access to Stuff documents.
  const beachsub = Meteor.subscribe(Beaches.userPublicationName);
  const hikesub = Meteor.subscribe(Hikes.userPublicationName);
  const spotsub = Meteor.subscribe(Spots.userPublicationName);
  const viewsub = Meteor.subscribe(Views.userPublicationName);
  const volunteersub = Meteor.subscribe(Volunteer.userPublicationName);
  // Determine if the subscription is ready
  const ready = beachsub.ready() && hikesub.ready() && spotsub.ready() && viewsub.ready() && volunteersub.ready();
  const beaches = Beaches.collection.find({}).fetch();
  const hikes = Hikes.collection.find({}).fetch();
  const spots = Spots.collection.find({}).fetch();
  const views = Views.collection.find({}).fetch();
  const volunteer = Volunteer.collection.find({}).fetch();
  return {
    beaches,
    hikes,
    spots,
    views,
    volunteer,
    ready,
  };
})(AddEvent);
