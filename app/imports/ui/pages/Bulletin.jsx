import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Divider, Loader, Comment, Segment } from 'semantic-ui-react';
import { AutoForm, LongTextField, SubmitField } from 'uniforms-semantic';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import swal from 'sweetalert';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { Messages } from '../../api/message/Message';
import BulletinMessage from '../components/BulletinMessage';

const formSchema = new SimpleSchema({
  message: String,
});

const bridge = new SimpleSchema2Bridge(formSchema);

/** Renders a table containing all of the View documents. Use <CardComponent> to render each row. */
class Bulletin extends React.Component {

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  submit(data, formRef) {
    const { message } = data;
    const name = Meteor.user().username;
    const today = new Date();
    const date = `${(today.getMonth() + 1)}/${today.getDate()}/${today.getFullYear()}`;
    const time = `${today.getHours()}:${today.getMinutes()}`;
    const datetime = `${date} at ${time}`;
    Messages.collection.insert({ name, message, datetime },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Item added successfully', 'success');
          formRef.reset();
        }
      });
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    let fRef = null;
    return (
      <Container id='bulletin-page'>
        <Divider textAlign={'center'} horizontal className={'page-divider-size'}>Message Board</Divider>
        <Comment.Group size="large">
          {this.props.messages.map((bulletinMessage, index) => <BulletinMessage key={index} bulletinMessage={bulletinMessage}/>)}
        </Comment.Group>
        <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => this.submit(data, fRef)} >
          <Segment>
            <LongTextField name="message" />
            <SubmitField value="Post"/>
          </Segment>
        </AutoForm>
      </Container>
    );
  }
}

// Require an array of Stuff documents in the props.
Bulletin.propTypes = {
  messages: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Messages.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the Stuff documents
  const messages = Messages.collection.find({}).fetch();
  return {
    messages,
    ready,
  };
})(Bulletin);
