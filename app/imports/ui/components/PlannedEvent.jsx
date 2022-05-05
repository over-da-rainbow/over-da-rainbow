import React from 'react';
import { Comment } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class PlannedEvent extends React.Component {
  render() {
    return (
      <Comment>
        <Comment.Content>
          <Comment.Author as='a'>{this.props.plannedEvent.name}'s Event</Comment.Author>
          <Comment.Metadata>
            <div>Location: {this.props.plannedEvent.location}</div>
            <div>Date/Time: {this.props.plannedEvent.datetime}</div>
          </Comment.Metadata>
          <Comment.Text>{this.props.plannedEvent.title}</Comment.Text>
        </Comment.Content>
      </Comment>
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
