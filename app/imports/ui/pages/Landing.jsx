import React from 'react';
import {Container, Grid, Header, Image } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
      <div>
        <div className='scenic-background-image'>
          <Grid id='landing-page' centered columns={3} divided='vertically' style={{ paddingTop: 50 }}>
            <Grid.Column>
              <Image circular src='https://cdn-icons-png.flaticon.com/512/2067/2067602.png'/>
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
                <Header as='h1'>paragraph for discover</Header>
              </Grid.Column>
            </Grid.Row>

            <Grid.Row>
              <Grid.Column>
                <Header as='h1'>paragraph for review</Header>
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
