import React from 'react';
import { Comment } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { NavLink, withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class BulletinMessage extends React.Component {
  render() {
    return (
      <Comment>
        <Comment.Content>
          <Comment.Author as={NavLink} to={`/User/${this.props.bulletinMessage.name}`}>{this.props.bulletinMessage.name}</Comment.Author>
          <Comment.Metadata>
            <div>{this.props.bulletinMessage.datetime}</div>
          </Comment.Metadata>
          <Comment.Text>{this.props.bulletinMessage.message}</Comment.Text>
        </Comment.Content>
      </Comment>
    );
  }
}

// Require a document to be passed to this component.
BulletinMessage.propTypes = {
  bulletinMessage: PropTypes.shape({
    name: PropTypes.string,
    message: PropTypes.string,
    datetime: PropTypes.string,
  }).isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(BulletinMessage);
