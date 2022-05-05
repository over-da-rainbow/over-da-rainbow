import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header } from 'semantic-ui-react';

class UserProfile extends React.Component {
  render() {
    return (
      <Container>
        {/* eslint-disable-next-line react/no-unescaped-entities */}
        <Header as="h2" textAlign="center">{Meteor.user().username}'s Profile </Header>
      </Container>
    );
  }
}

export default UserProfile;
