import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Roles } from 'meteor/alanning:roles';
import { Stuffs } from '../../api/stuff/Stuff';
import { Beaches } from '../../api/location/Beach';
import { Hikes } from '../../api/location/Hike';
import { Views } from '../../api/location/View';
import { Spots } from '../../api/location/Spot';
import { Volunteer } from '../../api/location/Volunteer';
import { Reviews } from '../../api/review/Reviews';
import { Messages } from '../../api/message/Message';
import { Events } from '../../api/message/Event';

// User-level publication.
// If logged in, then publish documents owned by this user. Otherwise publish nothing.
Meteor.publish(Beaches.userPublicationName, function () {
  if (this.userId) {
    return Beaches.collection.find();
  }
  return this.ready();
});

Meteor.publish(Hikes.userPublicationName, function () {
  if (this.userId) {
    return Hikes.collection.find();
  }
  return this.ready();
});

Meteor.publish(Views.userPublicationName, function () {
  if (this.userId) {
    return Views.collection.find();
  }
  return this.ready();
});

Meteor.publish(Spots.userPublicationName, function () {
  if (this.userId) {
    return Spots.collection.find();
  }
  return this.ready();
});

Meteor.publish(Volunteer.userPublicationName, function () {
  if (this.userId) {
    return Volunteer.collection.find();
  }
  return this.ready();
});

Meteor.publish(Reviews.userPublicationName, function () {
  if (this.userId) {
    return Reviews.collection.find();
  }
  return this.ready();
});

Meteor.publish(Messages.userPublicationName, function () {
  if (this.userId) {
    return Messages.collection.find();
  }
  return this.ready();
});

Meteor.publish(Events.userPublicationName, function () {
  if (this.userId) {
    return Events.collection.find();
  }
  return this.ready();
});

// Admin-level publication.
// If logged in and with admin role, then publish all documents from all users. Otherwise publish nothing.
Meteor.publish(Stuffs.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Stuffs.collection.find();
  }
  return this.ready();
});

// alanning:roles publication
// Recommended code to publish roles for each user.
Meteor.publish(null, function () {
  if (this.userId) {
    return Meteor.roleAssignment.find({ 'user._id': this.userId });
  }
  return this.ready();
});

Meteor.publish('userData', function () {
  if (this.userId) {
    return Meteor.users.find();
  }
  this.ready();

});
