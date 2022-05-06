import React from 'react';
import { Feed } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class PlannedEvent extends React.Component {
  render() {
    return (
      <Feed.Event>
        <Feed.Content>
          <Feed.User as='a'>{this.props.plannedEvent.name}&apos;s Event</Feed.User>
          <Feed.Date>{this.props.plannedEvent.datetime}</Feed.Date>
          <Feed.Meta>
            <div>Location: {this.props.plannedEvent.location}</div>
            <div>{this.props.plannedEvent.title}</div>
          </Feed.Meta>
        </Feed.Content>
      </Feed.Event>
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
