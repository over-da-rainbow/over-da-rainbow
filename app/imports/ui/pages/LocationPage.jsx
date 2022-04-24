import React from 'react';
import { Container, Header, Loader, Image, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Beaches } from '../../api/location/Beach';
import { Hikes } from '../../api/location/Hike';
import { Spots } from '../../api/location/Spot';
import { Views } from '../../api/location/View';
import { Volunteer } from '../../api/location/Volunteer';

/** Renders a table containing all of the View documents. Use <CardComponent> to render each row. */
class LocationPage extends React.Component {

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {
    let doc = null;
    if (Beaches.collection.findOne(this.props.documentId) != null) {
      doc = Beaches.collection.findOne(this.props.documentId);
    } else if (Hikes.collection.findOne(this.props.documentId) != null) {
      doc = Hikes.collection.findOne(this.props.documentId);
    } else if (Spots.collection.findOne(this.props.documentId) != null) {
      doc = Spots.collection.findOne(this.props.documentId);
    } else if (Views.collection.findOne(this.props.documentId) != null) {
      doc = Views.collection.findOne(this.props.documentId);
    } else if (Volunteer.collection.findOne(this.props.documentId) != null) {
      doc = Volunteer.collection.findOne(this.props.documentId);
    }
    return (
      <Container>
        <Header as="h2" textAlign="center">{doc.name}</Header>
        <Image centered src={doc.image} size="large"/>
        <Header as="h4">Location</Header>
        <p>{doc.location}</p>
        <Header as="h4">Description</Header>
        <p>{doc.description}</p>
        <Header as="h4">Do&apos;s and Don&apos;t&apos;s</Header>
        <p>...</p>
        <Header as="h4">Tags</Header>
        <Header as="h4"><Icon name="user"/>{doc.visited} Visits</Header>
        <hr/>
        <Header as="h4">Reviews</Header>
      </Container>
    );
  }
}

LocationPage.propTypes = {
  documentId: PropTypes.string,
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
})(LocationPage);
