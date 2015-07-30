var React = require('react'),
    Radium = require('radium');

var ButtonLoader = require('./src/loader/loader.gsap.jsx');

React.render(
  <div>
    <h1 style={{ marginTop: '2em', color: '#03A9F4', fontWeight: 400, textAlign: 'center' }}>Morph Button Loader</h1>
    <p style={{textAlign: 'center', fontSize: 13}}>Warn: current work only Firefox 22+ (gooey not work in webkit)</p>
    <ButtonLoader />
  </div>,
  document.getElementById('example')
);
