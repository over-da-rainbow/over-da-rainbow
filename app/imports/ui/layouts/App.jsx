import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import 'semantic-ui-css/semantic.css';
import { Roles } from 'meteor/alanning:roles';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import Landing from '../pages/Landing';
import ListStuff from '../pages/ListStuff';
import ListStuffAdmin from '../pages/ListStuffAdmin';
import ListBeaches from '../pages/ListBeaches';
import ListHikes from '../pages/ListHikes';
import ListViews from '../pages/ListViews';
import ListSpots from '../pages/ListSpots';
import ListVolunteer from '../pages/ListVolunteer';
import AddLocation from '../pages/AddLocation';
import NotFound from '../pages/NotFound';
import Signin from '../pages/Signin';
import Signup from '../pages/Signup';
import Signout from '../pages/Signout';
import LocationPage from '../pages/LocationPage';
import Bulletin from '../pages/Bulletin';
import EditLocation from '../pages/EditLocation';
import UserProfile from '../pages/UserProfile';
import Event from '../pages/Events';
import AddEvent from '../pages/AddEvent';
import ViewProfile from '../pages/ViewProfile';

/** Top-level layout component for this application. Called in imports/startup/client/startup.jsx. */
class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <NavBar/>
          <Switch>
            <Route exact path="/" component={Landing}/>
            <Route path="/signin" component={Signin}/>
            <Route path="/signup" component={Signup}/>
            <Route path="/signout" component={Signout}/>
            <Route path="/location/:_id" component={LocationPage}/>
            <Route path="/User/:userName" component={ViewProfile}/>
            <ProtectedRoute path="/list" component={ListStuff}/>
            <ProtectedRoute path="/profile" component={UserProfile}/>
            <ProtectedRoute path="/beach" component={ListBeaches}/>
            <ProtectedRoute path="/hike" component={ListHikes}/>
            <ProtectedRoute path="/view" component={ListViews}/>
            <ProtectedRoute path="/spot" component={ListSpots}/>
            <ProtectedRoute path="/volunteer" component={ListVolunteer}/>
            <ProtectedRoute path="/edit/:_id" component={EditLocation}/>
            <ProtectedRoute path="/message" component={Bulletin}/>
            <ProtectedRoute path="/event" component={Event}/>
            <ProtectedRoute path="/addevent" component={AddEvent}/>
            <AdminProtectedRoute path="/admin" component={ListStuffAdmin}/>
            <AdminProtectedRoute path="/addlocation" component={AddLocation}/>
            <Route component={NotFound}/>
          </Switch>
          <Footer/>
        </div>
      </Router>
    );
  }
}

/**
 * ProtectedRoute (see React Router v4 sample)
 * Checks for Meteor login before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      const isLogged = Meteor.userId() !== null;
      return isLogged ?
        (<Component {...props} />) :
        (<Redirect to={{ pathname: '/signin', state: { from: props.location } }}/>
        );
    }}
  />
);

/**
 * AdminProtectedRoute (see React Router v4 sample)
 * Checks for Meteor login and admin role before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const AdminProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      const isLogged = Meteor.userId() !== null;
      const isAdmin = Roles.userIsInRole(Meteor.userId(), 'admin');
      return (isLogged && isAdmin) ?
        (<Component {...props} />) :
        (<Redirect to={{ pathname: '/signin', state: { from: props.location } }}/>
        );
    }}
  />
);

// Require a component and location to be passed to each ProtectedRoute.
ProtectedRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  location: PropTypes.object,
};

// Require a component and location to be passed to each AdminProtectedRoute.
AdminProtectedRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  location: PropTypes.object,
};

export default App;
