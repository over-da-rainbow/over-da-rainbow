import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Image, Segment } from 'semantic-ui-react';

class UserProfile extends React.Component {
  render() {
    return (
      <Container>
        {/* eslint-disable-next-line no-template-curly-in-string */}
        <Image src={`images/${Meteor.user().profile.avatar}.png`} size='medium' circular centered/>
        {/* eslint-disable-next-line react/no-unescaped-entities */}
        <Header as="h2" textAlign="center">{Meteor.user().profile.firstName}'s Profile </Header>
        <Header as='h3' attached='top'>
          Bio
        </Header>
        <Segment attached>
          {Meteor.user().profile.classYear}
          <br/>
          <br/>
          {Meteor.user().profile.bio}
        </Segment>
        <Header as='h3' attached='top'>
          Social Media
        </Header>
        <Segment attached>
          @{Meteor.user().profile.insta}
        </Segment>
      </Container>
    );
  }
}

export default UserProfile;
