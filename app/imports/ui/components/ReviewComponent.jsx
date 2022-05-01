import React from 'react';
import { Modal, Button, Segment, Rating } from 'semantic-ui-react';
import { AutoForm, ErrorsField, HiddenField, LongTextField, SubmitField, TextField } from 'uniforms-semantic';
import PropTypes from 'prop-types';
import { _ } from 'meteor/underscore';
import swal from 'sweetalert';
import { withRouter } from 'react-router-dom';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { Reviews } from '../../api/review/Reviews';

const bridge = new SimpleSchema2Bridge(Reviews.schema);

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class ReviewComponent extends React.Component {
  // On submit, insert the data.
  submit(data, formRef) {
    const { title, rating, review, createdAt, owner, locationId } = data;
    Reviews.collection.insert({ title, rating, review, createdAt, owner, locationId },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Review added successfully', 'success');
          formRef.reset();
        }
      });
  }

  // constructor with different states
  constructor(props) {
    super(props);
    this.state = { open: false };
    this.state = { rating: 0 };
  }

  // updates the rating in the state when the rating field changes
  ratingChanged = (e, { rating }) => {
    this.setState({ rating });
  }

  render() {
    const setOpen = (mopen) => this.setState({ open: mopen });
    let fRef = null;
    return (
      <Modal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={this.state.open}
        trigger={<Button>Review</Button>}
      >
        <Modal.Header>Review</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            {/* the modified part is onSubmit={data => this.submit(_.extend(data, { rating: this.state.rating }) */}
            <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => this.submit(_.extend(data, { rating: this.state.rating }), fRef)} >
              <Segment>
                <TextField label="What would you like to title your review?" name='title'/>
                <LongTextField label="Let's hear about your experience" name='review'/>
                <div>~Leave your rating out of 5~</div>
                <br/>
                {/* adding the onRate will call the ratingChanged function and the state.rating value */}
                <Rating maxRating={5} defaultRating={1} icon='star' size='massive' name='displayedRating' onRate={this.ratingChanged}/>
                <br/>
                <SubmitField value='Submit'/>
                <ErrorsField/>
                <HiddenField name='owner' value={this.props.owner}/>
                {/* this will submit the rating through a Hidden field. Credit to Branden Ogata for all the rating implementation fixes  */}
                <HiddenField id='rating' name='rating' value={this.state.rating} />
                <HiddenField name='locationId' value={this.props.locationId}/>
                <HiddenField name='createdAt' value={new Date()}/>
              </Segment>
            </AutoForm>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    );
  }
}

// Require a document to be passed to this component.
ReviewComponent.propTypes = {
  locationId: PropTypes.string.isRequired,
  owner: PropTypes.string.isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(ReviewComponent);
