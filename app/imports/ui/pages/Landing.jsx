import React from 'react';
import { Container, Grid, Header, Image } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
      <div className='scenic-background-image'>
        <Grid id='landing-page' centered columns={3} divided='vertically' style={{ paddingTop: 100 }}>
          <Grid.Column>
            <Image style={{ width: 500 }}centered circular src='../images/overdarainbow-logo.png'/>
          </Grid.Column>
        </Grid>
        <Container>
          <Grid style={{ padding: 70 }} divided={'vertically'} centered columns={2}>
            <Grid.Row style={{ paddingTop: 70 }}>
              <Grid.Column>
                <Header className={'big-letters'} inverted as='h1'>Discover</Header>
              </Grid.Column>
              <Grid.Column>
                <Header style={{ fontFamily: 'Academy Engraved LET', textAlign: 'center' }} inverted as='h1'>Adventure to new places with friends and classmates</Header>
              </Grid.Column>
            </Grid.Row>

            <Grid.Row style={{ paddingTop: 70 }}>
              <Grid.Column>
                <Header style={{ fontFamily: 'Academy Engraved LET', textAlign: 'center' }} inverted as='h1'>Share your experience and learn about others' by leaving a review</Header>
              </Grid.Column>
              <Grid.Column>
                <Header className={'big-letters'} inverted as='h1'>Review</Header>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </div>

    );
  }
}

export default Landing;
