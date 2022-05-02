import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter, NavLink } from 'react-router-dom';
import { Menu, Dropdown, Header, Image } from 'semantic-ui-react';
import { Roles } from 'meteor/alanning:roles';

/** The NavBar appears at the top of every page. Rendered by the App Layout component. */
class NavBar extends React.Component {
  render() {
    const menuStyle = { marginBottom: '10px' };
    return (
      <Menu className='navbar-color-spacing' style={menuStyle} attached="top" fluid widths={8} borderless inverted>
        <Menu.Item as={NavLink} activeClassName="" exact to="/">
          <Image size='tiny' src="/images/logo-v1.png"/>
        </Menu.Item>
        {this.props.currentUser ? (
          [
            <Menu.Item key="bulletin">
              <Dropdown as="h3" id="bulletin-dropdown" text="Bulletin">
                <Dropdown.Menu>
                  <Dropdown.Item id="bulletin-dropdown-messages" text="Messages" as={NavLink} exact to="/message"/>
                  <Dropdown.Item id="login-dropdown-sign-up" text="Events" as={NavLink} exact to="/event"/>
                </Dropdown.Menu>
              </Dropdown>
            </Menu.Item>,
            <Menu.Item id='navbar-beach' as={NavLink} activeClassName="active" exact to="/beach" key="beaches">
              <Header inverted as='h3'>Beaches</Header>
            </Menu.Item>,
            <Menu.Item id='navbar-hike' as={NavLink} activeClassName="active" exact to="/hike" key="hikes">
              <Header inverted as='h3'>Hikes</Header>
            </Menu.Item>,
            <Menu.Item id='navbar-view' as={NavLink} activeClassName="" exact to="/view" key="views">
              <Header inverted as='h3'>Scenic Views</Header>
            </Menu.Item>,
            <Menu.Item id='navbar-campus' as={NavLink} activeClassName="" exact to="/spot" key="spots">
              <Header inverted as='h3'>On Campus</Header>
            </Menu.Item>,
            <Menu.Item id='navbar-volunteer' as={NavLink} activeClassName="" exact to="/volunteer" key="volunteer">
              <Header inverted as='h3'>Volunteer</Header>
            </Menu.Item>]
        ) : ''}

        <Menu.Item position="right">
          {this.props.currentUser === '' ? (
            <Dropdown id="login-dropdown" text="Login" pointing="top right" icon={'user'}>
              <Dropdown.Menu>
                <Dropdown.Item id="login-dropdown-sign-in" icon="user" text="Sign In" as={NavLink} exact to="/signin"/>
                <Dropdown.Item id="login-dropdown-sign-up" icon="add user" text="Sign Up" as={NavLink} exact to="/signup"/>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <Dropdown id="navbar-current-user" text={this.props.currentUser} pointing="top right" icon={'user'}>
              <Dropdown.Menu>
                {Roles.userIsInRole(Meteor.userId(), 'admin') ? (
                  <Dropdown.Item id='navbar-addLocation' as={NavLink} activeClassName="active" exact to="/addlocation" key='addlocation'>
                    <Header as='h4'>Add Location</Header>
                  </Dropdown.Item>
                ) : ''}
                <Dropdown.Item id="navbar-sign-out" icon="sign out" text="Sign Out" as={NavLink} exact to="/signout"/>
              </Dropdown.Menu>
            </Dropdown>
          )}
        </Menu.Item>
      </Menu>
    );
  }
}

// Declare the types of all properties.
NavBar.propTypes = {
  currentUser: PropTypes.string,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
const NavBarContainer = withTracker(() => ({
  currentUser: Meteor.user() ? Meteor.user().username : '',
}))(NavBar);

// Enable ReactRouter for this component. https://reacttraining.com/react-router/web/api/withRouter
export default withRouter(NavBarContainer);
