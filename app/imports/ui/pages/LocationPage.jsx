import React from 'react';
import { Container, Header, Loader, Image, Icon, CommentGroup, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Roles } from 'meteor/alanning:roles';
import { NavLink } from 'react-router-dom';
import { Beaches } from '../../api/location/Beach';
import { Hikes } from '../../api/location/Hike';
import { Spots } from '../../api/location/Spot';
import { Views } from '../../api/location/View';
import { Volunteer } from '../../api/location/Volunteer';
import ReviewComponent from '../components/ReviewComponent';
import { Reviews } from '../../api/review/Reviews';
import LocationReviews from '../components/LocationReviews';

/** Renders a table containing all of the View documents. Use <CardComponent> to render each row. */
class LocationPage extends React.Component {

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  delete() {
    if (Beaches.collection.findOne(this.props.documentId) != null) {
      Beaches.collection.remove({ _id: this.props.documentId });
    } else if (Hikes.collection.findOne(this.props.documentId) != null) {
      Hikes.collection.remove({ _id: this.props.documentId });
    } else if (Spots.collection.findOne(this.props.documentId) != null) {
      Spots.collection.remove({ _id: this.props.documentId });
    } else if (Views.collection.findOne(this.props.documentId) != null) {
      Views.collection.remove({ _id: this.props.documentId });
    } else if (Volunteer.collection.findOne(this.props.documentId) != null) {
      Volunteer.collection.remove({ _id: this.props.documentId });
    }
  }

  renderPage() {
    let doc = null;
    let redir = null;
    if (Beaches.collection.findOne(this.props.documentId) != null) {
      doc = Beaches.collection.findOne(this.props.documentId);
      redir = '/beach';
    } else if (Hikes.collection.findOne(this.props.documentId) != null) {
      doc = Hikes.collection.findOne(this.props.documentId);
      redir = '/hike';
    } else if (Spots.collection.findOne(this.props.documentId) != null) {
      doc = Spots.collection.findOne(this.props.documentId);
      redir = '/spot';
    } else if (Views.collection.findOne(this.props.documentId) != null) {
      doc = Views.collection.findOne(this.props.documentId);
      redir = '/view';
    } else if (Volunteer.collection.findOne(this.props.documentId) != null) {
      doc = Volunteer.collection.findOne(this.props.documentId);
      redir = '/volunteer';
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
        <ul>
          <li>DO read all the signs in the area</li>
          <li>DO respect the locals</li>
        </ul>
        <ul>
          <li>DON&apos;T litter</li>
          <li>DON&apos;T touch the animals</li>
        </ul>
        <Header as="h4">Tags</Header>
        {Roles.userIsInRole(Meteor.userId(), 'admin') ? (
          <div>
            <Button as={NavLink} to={`/edit/${doc._id}`}>Edit Location</Button>
            <Button as={NavLink} to={redir} onClick={() => this.delete()}>Delete Location</Button>
          </div>
        ) : ''}
        <Header as="h4"><Icon name="user"/>{doc.visited} Visits</Header>
        <hr/>
        <Header as="h4">Reviews</Header>
        <ReviewComponent owner={Meteor.user().username} locationId={this.props.documentId} right/>
        <CommentGroup>
          {this.props.reviews.map((Review, index) => <LocationReviews
            key={index}
            Review={Review}/>)}
        </CommentGroup>
      </Container>
    );
  }
}

LocationPage.propTypes = {
  documentId: PropTypes.string,
  ready: PropTypes.bool.isRequired,
  reviews: PropTypes.array.isRequired,
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
  const reviewsub = Meteor.subscribe(Reviews.userPublicationName);
  // Determine if the subscription is ready
  const ready = beachsub.ready() && hikesub.ready() && spotsub.ready() && viewsub.ready() && volunteersub.ready() && reviewsub.ready();
  const reviews = Reviews.collection.find({ locationId: documentId }).fetch();
  return {
    documentId,
    ready,
    reviews,
  };
})(LocationPage);
