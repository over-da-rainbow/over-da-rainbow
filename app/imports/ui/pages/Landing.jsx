import React from 'react';
import { Container, Grid, Header, Image } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
      <div className='scenic-background-image'>
        <Grid id='landing-page' centered columns={3} divided='vertically' style={{ paddingTop: 100 }}>
          <Grid.Column>
            <Image style={{ width: 500 }}centered circular src='../images/overdarainbow_v2.png'/>
          </Grid.Column>
        </Grid>
        <Container>
          <Grid style={{ padding: 70 }} divided={'vertically'} centered columns={2}>
            <Grid.Row style={{ paddingTop: 70 }}>
              <Grid.Column>
                <Header className={'big-letters'} inverted as='h1'>Discover</Header>
              </Grid.Column>
              <Grid.Column>
                <Header style={{ fontFamily: 'Academy Engraved LET', textAlign: 'center' }} inverted as='h1'>Adventure to Oahu&apos;s best spots with friends and classmates</Header>
              </Grid.Column>
            </Grid.Row>

            <Grid.Row style={{ paddingTop: 70 }}>
              <Grid.Column>
                <Header style={{ fontFamily: 'Academy Engraved LET', textAlign: 'center' }} inverted as='h1'>Share your experiences and give feedback for future explorers</Header>
              </Grid.Column>
              <Grid.Column>
                <Header className={'big-letters'} inverted as='h1'>Review</Header>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row style={{ paddingTop: 70 }}>
              <Grid.Column>
                <Header className={'big-letters'} inverted as='h1'>Interact</Header>
              </Grid.Column>
              <Grid.Column>
                <Header style={{ fontFamily: 'Academy Engraved LET', textAlign: 'center' }} inverted as='h1'>Feel free to interact with others by posting messages and planning future social events on the Bulletin!</Header>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </div>

    );
  }
}

export default Landing;
