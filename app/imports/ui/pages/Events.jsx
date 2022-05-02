import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Loader, Comment, Button } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Events } from '../../api/message/Event';
import PlannedEvent from '../components/PlannedEvent';

/** Renders a table containing all of the View documents. Use <CardComponent> to render each row. */
class Event extends React.Component {

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    return (
      <Container id='event-page'>
        <Header as="h2" textAlign="center">Event Board</Header>
        <Comment.Group size="large">
          {this.props.events.map((plannedEvent, index) => <PlannedEvent key={index} bulletinMessage={plannedEvent}/>)}
        </Comment.Group>
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
  const subscription = Meteor.subscribe(Events.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the Stuff documents
  const events = Events.collection.find({}).fetch();
  return {
    events,
    ready,
  };
})(Event);
