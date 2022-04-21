import React from 'react';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
class Footer extends React.Component {
  render() {
    const divStyle = { paddingTop: '15px' };
    return (
      <Footer inverted borderless>
        <div style={divStyle} className="ui center aligned container">
          <hr />
          Over Da Rainbow Members: <a href="https://rubegen.github.io/">Ruben Jacobo, </a>
          <a href="https://cole-house.github.io/">Cole House, </a>
          <a href="https://kaleinah.github.io/">Kevin Nahinu, </a>
          <a href="https://timothyro.github.io">Timothy Ro</a> <br />
          University of Hawaii<br />
          Honolulu, HI 96822 <br />
          <a href="https://over-da-rainbow.github.io">Over Da Rainbow Home Page</a>
        </div>
      </Footer>
    );
  }
}

export default Footer;
