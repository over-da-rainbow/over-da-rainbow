import React from 'react';
import { Card, Icon, Image, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, NavLink } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class LocationCard extends React.Component {
  render() {
    return (
      <Button id='card' as={NavLink} to={`/location/${this.props.locationCard._id}`}><Card>
        <Image src={this.props.locationCard.image} wrapped ui={false}/>
        <Card.Content>
          <Card.Header>{this.props.locationCard.name}</Card.Header>
          <Card.Meta>
            <span>{this.props.locationCard.location}</span>
          </Card.Meta>
          <Card.Description>
            {this.props.locationCard.description}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Icon name='user'/>
          {this.props.locationCard.visited} visits
        </Card.Content>
      </Card></Button>
    );
  }
}

// Require a document to be passed to this component.
LocationCard.propTypes = {
  locationCard: PropTypes.shape({
    name: PropTypes.string,
    visited: PropTypes.number,
    image: PropTypes.string,
    description: PropTypes.string,
    location: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(LocationCard);
