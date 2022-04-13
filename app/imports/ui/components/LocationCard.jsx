import React from 'react';
import { Card, Icon, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class LocationCard extends React.Component {
  render() {
    return (
      <Card>
        <Image src={this.props.locationCard.image} wrapped ui={false} />
        <Card.Content>
          <Card.Header>{this.props.locationCard.name}</Card.Header>
          <Card.Meta>
            <span>{this.props.locationCard.image}</span>
          </Card.Meta>
          <Card.Description>
            {this.props.locationCard.image}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <a>
            <Icon name='user' />
            {this.props.locationCard.visited} visits
          </a>
        </Card.Content>
      </Card>
    );
  }
}

// Require a document to be passed to this component.
LocationCard.propTypes = {
  locationCard: PropTypes.object.isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(LocationCard);
