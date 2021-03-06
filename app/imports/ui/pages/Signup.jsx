import React from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { Container, Dropdown, Form, FormGroup, Grid, Header, Label, Message, Segment, TextArea } from 'semantic-ui-react';
import { Accounts } from 'meteor/accounts-base';

/**
 * Signup component is similar to signin component, but we create a new user instead.
 */
const avatarOptions = [
  {
    key: 'Boar',
    text: 'Boar',
    value: 'boar',
    image: { avatar: true, src: 'images/boar.png' },
  },
  {
    key: 'Kolea',
    text: 'Kolea',
    value: 'kolea',
    image: { avatar: true, src: 'images/kolea.png' },
  },
  {
    key: 'Nene',
    text: 'Nene',
    value: 'nene',
    image: { avatar: true, src: 'images/nene.png' },
  },
  {
    key: 'Monk Seal',
    text: 'Monk Seal',
    value: 'monk-seal',
    image: { avatar: true, src: 'images/monk-seal.png' },
  },
  {
    key: 'Honu',
    text: 'Honu',
    value: 'honu',
    image: { avatar: true, src: 'images/honu.png' },
  },
];

const classOptions = [
  {
    key: 'Freshman',
    text: 'Freshman',
    value: 'Freshman',
  },
  {
    key: 'Sophomore',
    text: 'Sophomore',
    value: 'Sophomore',
  },
  {
    key: 'Junior',
    text: 'Junior',
    value: 'Junior',
  },
  {
    key: 'Senior',
    text: 'Senior',
    value: 'Senior',
  },
];

class Signup extends React.Component {
  /* Initialize state fields. */
  constructor(props) {
    super(props);
    this.state = { email: '', password: '', error: '', redirectToReferer: false };
  }

  /* Update the form controls each time the user interacts with them. */
  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  }

  /* Handle Signup submission. Create user account and a profile entry, then redirect to the home page. */
  submit = () => {
    const { email, password, firstName, lastName, classYear, avatar, bio, insta } = this.state;
    Accounts.createUser({ email, username: email, password, profile: {
      firstName: firstName,
      lastName: lastName,
      classYear: classYear,
      avatar: avatar,
      bio: bio,
      insta: insta,
    } }, (err) => {
      if (err) {
        this.setState({ error: err.reason });
      } else {
        this.setState({ error: '', redirectToReferer: true });
      }
    });
    console.log(email);
    console.log(firstName);
    console.log(lastName);
    console.log(classYear);
    console.log(avatar);
    console.log(bio);
    console.log(insta);
  }

  /* Display the signup form. Redirect to add page after successful registration and login. */
  render() {
    if (this.state.redirectToReferer) {
      return <Redirect to={'/'}/>;
    }
    return (
      <Container id="signup-page">
        <Grid textAlign="center" verticalAlign="middle" centered columns={2}>
          <Grid.Column>
            <Header as="h2" textAlign="center">
              Register your account and Setup Profile
            </Header>
            <Form onSubmit={this.submit}>
              <Segment stacked>
                <Form.Input
                  label="Email (will also be username)"
                  id="signup-form-email"
                  icon="user"
                  iconPosition="left"
                  name="email"
                  type="email"
                  placeholder="E-mail address"
                  onChange={this.handleChange}
                />
                <Form.Input
                  label="Password"
                  id="signup-form-password"
                  icon="lock"
                  iconPosition="left"
                  name="password"
                  placeholder="Password"
                  type="password"
                  onChange={this.handleChange}
                />
                <FormGroup widths='equal'>
                  <Form.Input
                    label="First Name"
                    id="signup-form-firstName"
                    name="firstName"
                    type="firstName"
                    placeholder="John"
                    onChange={this.handleChange}
                  />
                  <Form.Input
                    label="Last Name"
                    id="signup-form-lastName"
                    name="lastName"
                    placeholder="Doe"
                    type="lastName"
                    onChange={this.handleChange}
                  />
                </FormGroup>
                <Label>Please select appropriate class</Label>
                <Dropdown
                  id="signup-form-classYear"
                  name="classYear"
                  type="classYear"
                  onChange={this.handleChange}
                  placeholder='Freshman'
                  fluid
                  selection
                  options={classOptions}
                />
                <br/>
                <Label>Please choose avatar</Label>
                <Dropdown
                  id="signup-form-avatar"
                  name="avatar"
                  type="avatar"
                  onChange={this.handleChange}
                  placeholder='Avatars'
                  fluid
                  selection
                  options={avatarOptions}
                />
                <br/>
                <Form.Input
                  label="Instagram Username"
                  id="signup-form-insta"
                  icon="address book"
                  iconPosition="left"
                  name="insta"
                  type="insta"
                  placeholder="This is suggested to easily message other users"
                  onChange={this.handleChange}
                />
                <Form.Field
                  id="signup-form-bio"
                  name="bio"
                  type="bio"
                  onChange={this.handleChange}
                  control={TextArea}
                  label='Bio'
                  placeholder='Tell us a little about yourself and what you enjoy about the outdoors!'
                />
                <Form.Button id="signup-form-submit" content="Submit"/>
              </Segment>
            </Form>
            <Message>
              Already have an account? Login <Link to="/signin">here</Link>
            </Message>
            {this.state.error === '' ? (
              ''
            ) : (
              <Message
                error
                header="Registration was not successful"
                content={this.state.error}
              />
            )}
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

/* Ensure that the React Router location object is available in case we need to redirect. */
Signup.propTypes = {
  location: PropTypes.object,
};

export default Signup;
