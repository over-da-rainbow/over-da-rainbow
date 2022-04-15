import { Meteor } from 'meteor/meteor';
import { Stuffs } from '../../api/stuff/Stuff.js';
import { Beaches } from '../../api/location/Beach';
import { Hikes } from '../../api/location/Hike';
import { Spots } from '../../api/location/Spot';
import { Views } from '../../api/location/View';
import { Volunteer } from '../../api/location/Volunteer';

/* eslint-disable no-console */

// Initialize the database with a default data document.
function addData(data) {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Stuffs.collection.insert(data);
}

function addBeach(data) {
  console.log(`  Adding: ${data.name}`);
  Beaches.collection.insert(data);
}

function addHike(data) {
  console.log(`  Adding: ${data.name}`);
  Hikes.collection.insert(data);
}

function addSpot(data) {
  console.log(`  Adding: ${data.name}`);
  Spots.collection.insert(data);
}

function addView(data) {
  console.log(`  Adding: ${data.name}`);
  Views.collection.insert(data);
}

function addVolunteer(data) {
  console.log(`  Adding: ${data.name}`);
  Volunteer.collection.insert(data);
}

// Initialize the StuffsCollection if empty.
if (Stuffs.collection.find().count() === 0) {
  if (Meteor.settings.defaultData) {
    console.log('Creating default data.');
    Meteor.settings.defaultData.map(data => addData(data));
  }
}

if (Beaches.collection.find().count() === 0) {
  if (Meteor.settings.defaultBeaches) {
    console.log('Creating Beach data.');
    Meteor.settings.defaultBeaches.map(data => addBeach(data));
  }
}

if (Hikes.collection.find().count() === 0) {
  if (Meteor.settings.defaultHikes) {
    console.log('Creating Hike data.');
    Meteor.settings.defaultHikes.map(data => addHike(data));
  }
}

if (Spots.collection.find().count() === 0) {
  if (Meteor.settings.defaultSpots) {
    console.log('Creating Spot data.');
    Meteor.settings.defaultSpots.map(data => addSpot(data));
  }
}

if (Views.collection.find().count() === 0) {
  if (Meteor.settings.defaultViews) {
    console.log('Creating View data.');
    Meteor.settings.defaultViews.map(data => addView(data));
  }
}

if (Volunteer.collection.find().count() === 0) {
  if (Meteor.settings.defaultVolunteer) {
    console.log('Creating Volunteer data.');
    Meteor.settings.defaultVolunteer.map(data => addVolunteer(data));
  }
}
