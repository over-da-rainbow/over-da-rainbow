import React from 'react';
import { Container, Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a table containing all of the View documents. Use <CardComponent> to render each row. */
class LocationPage extends React.Component {

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (
      <Container>
        <Header as="h2" textAlign="center">{this.props.locationPage.name}</Header>
      </Container>
    );
  }

}

// Require an array of Stuff documents in the props.
LocationPage.propTypes = {
  locationPage: PropTypes.shape({
    name: PropTypes.string,
    visited: PropTypes.number,
    image: PropTypes.string,
    description: PropTypes.string,
    location: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export default withRouter(LocationPage);
