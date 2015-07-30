var styles = {
  send: {
    root: {
      height: 200, width:200,
    	position: 'relative',
    	margin: '0 auto'
    },

    button : {
    	marginLeft: -40, marginTop: -40,
    	border: 'none', color: '#fff',
    	backgroundColor: '#2196F3',
    	fontSize: 30, padding: 0,
    	left: '50%', top: '50%',
    	height: 80, width: 80,
    	position: 'absolute',
    	borderRadius: '50%',
    	overflow: 'hidden',

      transition: 'all 0.2s ease-in-out',
    },

    bg: {
    	height: '100%', width: '100%',
    	position: 'absolute',
    	left: 0, top: 0,
    	opacity: 0
    },

    icon: {
    	margin: '-2px 0 0 -2px',
    	position: 'relative',
    	fontSize: 28
    },

    indicator: {
    	left: '50%', top: '50%',
    	position: 'absolute'
    },
  },

  /* Styles Indicator Dot*/
  sid: {
    a: { transform: 'scale(0.80, 0.80)', background: '#03a9f4' },
    b: { transform: 'scale(0.85, 0.85)', background: '#5af158' },
    c: { transform: 'scale(0.90, 0.90)', background: '#ffc107' },
    d: { transform: 'scale(0.70, 0.70)', background: '#3F51B5' },
    e: { transform: 'scale(0.95, 0.95)', background: '#f44336' },
    root: {
    	marginLeft: -20, marginTop: -20,
    	height: 40, width: 40,
    	position: 'absolute',
    	borderRadius: '50%'
    },
  }
};

module.exports = {
  styles : styles,
};
