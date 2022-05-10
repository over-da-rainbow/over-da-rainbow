import React from 'react';
import { Container, Header, Image, Loader, Segment } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

/** Renders a table containing all of the View documents. Use <CardComponent> to render each row. */
class ViewProfile extends React.Component {

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (Meteor.users.findOne({ username: this.props.userName }) != null) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {
    const doc = Meteor.users.findOne({ username: this.props.userName });
    console.log(doc);
    return (
      <Container>
        <Image src={`images/${doc.profile.avatar}.png`} size='medium' circular centered/>
        {/* eslint-disable-next-line react/no-unescaped-entities */}
        <Header as="h2" textAlign="center">{doc.profile.firstName}'s Profile</Header>
        <Header as='h3' attached='top'>
          Bio
        </Header>
        <Segment attached>
          {doc.profile.classYear}
          <br/>
          <br/>
          {doc.profile.bio}
        </Segment>
        <Header as='h3' attached='top'>
          Social Media
        </Header>
        <Segment attached>
          @{doc.profile.insta}
        </Segment>
      </Container>
    );
  }
}

ViewProfile.propTypes = {
  userName: PropTypes.string,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const userName = match.params.userName;
  // Determine if the subscription is ready
  const userSub = Meteor.subscribe('userData');
  const ready = userSub.ready();
  return {
    userName,
    userSub,
    ready,
  };
})(ViewProfile);
