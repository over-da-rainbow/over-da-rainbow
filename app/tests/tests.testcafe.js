import { landingPage } from './landing.page';
import { signinPage } from './signin.page';
import { signoutPage } from './signout.page';
import { profilePage } from './profile.page';
import { navBar } from './navbar.component';
import { bulletinPage } from './bulletin.page';
import { eventPage } from './events.page';
import { beachPage } from './beach.page';
import { hikePage } from './hike.page';
import { addLocationPage } from './addLocation.page';
import { viewPage } from './view.page';
import { volunteerPage } from './volunteer.page';
import { campusPage } from './campus.page';

/* global fixture:false, test:false */

/** Credentials for one of the sample users defined in settings.development.json. */
const credentials = { username: 'john@foo.com', password: 'changeme' };
const admin = { username: 'admin@foo.com', password: 'changeme' };

fixture('meteor-application-template-react localhost test with default db')
  .page('http://localhost:3000');

test('Test that landing page shows up', async (testController) => {
  await landingPage.isDisplayed(testController);
});

test('Test that signin and signout work', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});

test('Test that signin and signout work for admin', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, admin.username, admin.password);
  await navBar.isLoggedIn(testController, admin.username);
  await navBar.logout(testController);
});

test('Test that addLocation page shows up', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, admin.username, admin.password);
  await navBar.isLoggedIn(testController, admin.username);
  await navBar.gotoAddLocationPage(testController);
  await addLocationPage.isDisplayed(testController);
  await navBar.logout(testController);
});

test('Test that the profile page shows up', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, admin.username, admin.password);
  await navBar.isLoggedIn(testController, admin.username);
  await navBar.gotoProfilePage(testController);
  await profilePage.isDisplayed(testController);
  await navBar.logout(testController);
});

test('Test that bulletin page shows up', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, admin.username, admin.password);
  await navBar.isLoggedIn(testController, admin.username);
  await navBar.gotoBulletinPage(testController);
  await bulletinPage.isDisplayed(testController);
  await navBar.logout(testController);
});

test('Test that events page shows up', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, admin.username, admin.password);
  await navBar.isLoggedIn(testController, admin.username);
  await navBar.gotoEventsPage(testController);
  await eventPage.isDisplayed(testController);
  await navBar.logout(testController);
});

test('Test that beach page and cards shows up', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, admin.username, admin.password);
  await navBar.isLoggedIn(testController, admin.username);
  await navBar.gotoBeachPage(testController);
  await beachPage.isDisplayed(testController);
  await beachPage.cardOpens(testController);
  await navBar.logout(testController);
});

test('Test that hike page and cards shows up', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, admin.username, admin.password);
  await navBar.isLoggedIn(testController, admin.username);
  await navBar.gotoHikePage(testController);
  await hikePage.isDisplayed(testController);
  await hikePage.cardOpens(testController);
  await navBar.logout(testController);
});

test('Test that view page and cards shows up', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, admin.username, admin.password);
  await navBar.isLoggedIn(testController, admin.username);
  await navBar.gotoViewPage(testController);
  await viewPage.isDisplayed(testController);
  await viewPage.cardOpens(testController);
  await navBar.logout(testController);
});

test('Test that volunteer page and cards shows up', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, admin.username, admin.password);
  await navBar.isLoggedIn(testController, admin.username);
  await navBar.gotoVolunteerPage(testController);
  await volunteerPage.isDisplayed(testController);
  await volunteerPage.cardOpens(testController);
  await navBar.logout(testController);
});

test('Test that campus page shows up', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, admin.username, admin.password);
  await navBar.isLoggedIn(testController, admin.username);
  await navBar.gotoCampusPage(testController);
  await campusPage.isDisplayed(testController);
  await campusPage.cardOpens(testController);
  await navBar.logout(testController);
});
