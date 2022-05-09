import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Loader, Feed, Button, Divider } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Events } from '../../api/message/Event';
import PlannedEvent from '../components/PlannedEvent';
import { Beaches } from '../../api/location/Beach';
import { Hikes } from '../../api/location/Hike';
import { Spots } from '../../api/location/Spot';
import { Views } from '../../api/location/View';
import { Volunteer } from '../../api/location/Volunteer';

/** Renders a table containing all of the View documents. Use <CardComponent> to render each row. */
class Event extends React.Component {

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    return (
      <Container textAlign={'center'} id='event-page'>
        <Divider horizontal className={'page-divider-size'}>Events</Divider>
        <Feed size="large">
          {this.props.events.map((plannedEvent, index) => <PlannedEvent key={index} plannedEvent={plannedEvent}/>)}
        </Feed>
        <Button as={NavLink} to={'/addevent'}>Plan an Event</Button>
      </Container>
    );
  }
}

// Require an array of Stuff documents in the props.
Event.propTypes = {
  events: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Stuff documents.
  const eventsub = Meteor.subscribe(Events.userPublicationName);
  const beachsub = Meteor.subscribe(Beaches.userPublicationName);
  const hikesub = Meteor.subscribe(Hikes.userPublicationName);
  const spotsub = Meteor.subscribe(Spots.userPublicationName);
  const viewsub = Meteor.subscribe(Views.userPublicationName);
  const volunteersub = Meteor.subscribe(Volunteer.userPublicationName);
  // Determine if the subscription is ready
  const ready = eventsub.ready() && beachsub.ready() && hikesub.ready() && spotsub.ready() && viewsub.ready() && volunteersub.ready();
  // Get the Stuff documents
  const events = Events.collection.find({}).fetch();
  return {
    events,
    ready,
  };
})(Event);
