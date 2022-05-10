import React from 'react';
import { Feed, Segment } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, NavLink } from 'react-router-dom';
import { Beaches } from '../../api/location/Beach';
import { Hikes } from '../../api/location/Hike';
import { Spots } from '../../api/location/Spot';
import { Views } from '../../api/location/View';
import { Volunteer } from '../../api/location/Volunteer';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class PlannedEvent extends React.Component {
  render() {
    let doc = null;
    if (Beaches.collection.findOne({ name: this.props.plannedEvent.location }) != null) {
      doc = Beaches.collection.findOne({ name: this.props.plannedEvent.location });
    } else if (Hikes.collection.findOne({ name: this.props.plannedEvent.location }) != null) {
      doc = Hikes.collection.findOne({ name: this.props.plannedEvent.location });
    } else if (Spots.collection.findOne({ name: this.props.plannedEvent.location }) != null) {
      doc = Spots.collection.findOne({ name: this.props.plannedEvent.location });
    } else if (Views.collection.findOne({ name: this.props.plannedEvent.location }) != null) {
      doc = Views.collection.findOne({ name: this.props.plannedEvent.location });
    } else if (Volunteer.collection.findOne({ name: this.props.plannedEvent.location }) != null) {
      doc = Volunteer.collection.findOne({ name: this.props.plannedEvent.location });
    }
    return (
      <Segment vertical><Feed.Event>
        <Feed.Content>
          <Feed.Summary>
            <Feed.User as={NavLink} to={`/User/${this.props.plannedEvent.name}`}>{this.props.plannedEvent.name}</Feed.User>&apos;s Event
            <Feed.Date>{this.props.plannedEvent.datetime}</Feed.Date>
          </Feed.Summary>
          <Feed.Meta>
            <h4>{this.props.plannedEvent.title}</h4>
            <NavLink to={`/location/${doc._id}`}>Location: {this.props.plannedEvent.location}</NavLink>
          </Feed.Meta>
        </Feed.Content>
      </Feed.Event></Segment>
    );
  }
}

// Require a document to be passed to this component.
PlannedEvent.propTypes = {
  plannedEvent: PropTypes.shape({
    name: PropTypes.string,
    title: PropTypes.string,
    datetime: PropTypes.string,
    location: PropTypes.string,
  }).isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(PlannedEvent);
