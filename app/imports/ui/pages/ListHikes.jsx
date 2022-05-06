import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Loader, Card, Divider, Grid } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Hikes } from '../../api/location/Hike';
import LocationCard from '../components/LocationCard';

/** Renders a table containing all of the View documents. Use <CardComponent> to render each row. */
class ListHikes extends React.Component {

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    return (
      <Container textAlign={'center'} id='hike-page'>
        <Divider horizontal className={'page-divider-size'}>Hikes</Divider>
        <Grid centered columns={1}>
          <Grid.Column className={'centered-custom-column-spacing'}>
            <Card.Group style={{ padding: 20 }}>
              {this.props.hikes.map((locationCard, index) => <LocationCard key={index} locationCard={locationCard}/>)}
            </Card.Group>
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

// Require an array of Stuff documents in the props.
ListHikes.propTypes = {
  hikes: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Hikes.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the Stuff documents
  const hikes = Hikes.collection.find({}).fetch();
  return {
    hikes,
    ready,
  };
})(ListHikes);
