import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Loader, Card } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Beaches } from '../../api/location/Beach';
import LocationCard from '../components/LocationCard';

/** Renders a table containing all of the View documents. Use <CardComponent> to render each row. */
class ListBeaches extends React.Component {

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    return (
      <Container>
        <Header as="h2" textAlign="center">Beach Page</Header>
        <Card.Group>
          {this.props.beaches.map((place, index) => <LocationCard key={index} place={place}/>)}
        </Card.Group>
      </Container>
    );
  }
}

// Require an array of Stuff documents in the props.
ListBeaches.propTypes = {
  beaches: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Beaches.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the Stuff documents
  const beaches = Beaches.collection.find({}).fetch();
  console.log(beaches);
  return {
    beaches,
    ready,
  };
})(ListBeaches);
