import React from 'react';
import { Comment, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

class LocationReviews extends React.Component {
  render() {
    return (
      <Comment>
        <Comment.Avatar as='a' src='images/greenUser.png' />
        <Comment.Content>
          <Comment.Author>{this.props.Review.owner}</Comment.Author>
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          <Comment.Author>"{this.props.Review.title}"</Comment.Author>
          <Comment.Metadata>
            <div>{this.props.Review.createdAt.toLocaleDateString('en-US')}</div>
            <div>
              <Icon name='star' />{this.props.Review.rating} rating
            </div>
          </Comment.Metadata>
          <Comment.Text>
            {this.props.Review.review}
          </Comment.Text>
        </Comment.Content>
      </Comment>
    );
  }
}

// Require a document to be passed to this component.
LocationReviews.propTypes = {
  Review: PropTypes.object.isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(LocationReviews);
