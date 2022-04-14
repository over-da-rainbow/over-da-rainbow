import React from 'react';
import { Container, Grid, Header, Image } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (

      <div>
        <div className='scenic-background-image'>
          <Grid id='landing-page' centered columns={3} divided='vertically' style={{ paddingTop: 100 }}>
            <Grid.Column>
              <Image style={{ width: 500 }}centered circular src='../images/overdarainbow-logo.png'/>
            </Grid.Column>
          </Grid>
        </div>
        <Container centered>
          <Grid divided={'vertically'} centered columns={2}>
            <Grid.Row>
              <Grid.Column>
                <Header as='h1'>Discover</Header>
              </Grid.Column>
              <Grid.Column>
                <Header as='h2'>Adventure to new places with friends and classmates</Header>
              </Grid.Column>
            </Grid.Row>

            <Grid.Row>
              <Grid.Column>
                <Header as='h2'>Share your review and input with friends</Header>
              </Grid.Column>
              <Grid.Column>
                <Header as='h1'>Review</Header>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </div>

    );
  }
}

export default Landing;
