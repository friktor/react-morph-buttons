/*
* Morph Button Loader
* @description: button loader, with gooey effect, based on svg filters.
* @version: 0.1, alpha based on React & Gsap.
* @etc: inspired http://tympanus.net/Development/CreativeGooeyEffects/send.html.
*/

/* Warn: current work only Firefox 22+ (gooey not work in webkit)*/

var React = require('react'),
    Radium = require('radium'),
    TweenMax = require('gsap');

var {styles, animate} = require('./styles.jsx');
var {extend, AnimationRequest} = require('../utils.jsx');

@Radium
class ButtonLoader extends React.Component {

  /* form class element, initial state, bind methods*/
  constructor(props) {
    super(props);

    this.componentDidMount = this.componentDidMount.bind(this);
    this.setFilter = this.setFilter.bind(this);

    this.animate = this.animate.bind(this);
    this.setup = this.setup.bind(this);
    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);

    this.state = {
      locked: false,
      frames: [],
      dots: [],
    };
  }

  /* Apply started filter, save elem`s in scope instanse */
  componentDidMount() {
    this.elems = {
      dots : this.refs.dots.getDOMNode(),
      button : this.refs.button.getDOMNode(),
      icon : this.refs.icon.getDOMNode(),
      bg : this.refs.bg.getDOMNode(),
    };

    this.setFilter('goo');
  }


  /* Escaped filters & apply to root element */
  setFilter(filter) {
    var escaped = btoa(`
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo" />
            <feComposite in="SourceGraphic" in2="goo" operator="atop"/>
          </filter>
          <filter id="goo-no-comp">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo" />
          </filter>
        </defs>
      </svg>
    `);
    var element = this.refs.send.getDOMNode();
    element.style.filter = `url(data:image/svg+xml;base64,${escaped}#${filter}`;
  }

  /* Methods for start load & start animation loader */
  start() {
    var { dots, button, icon, bg } = this.elems;
    var dots = dots.children, self = this;

    if (this.state.locked) return;
    this.setState({ locked: true });

    /* Hide icon */
    TweenMax.to(icon, 0.3, {
      ease: Quad.easeIn,
      x: 100, y: -100,
      onComplete() {
        self.setFilter('goo-no-comp');
      }
    });

    /* hide buttons */
    TweenMax.to(button, 0.5, {
      ease: Linear.easeInOut,
      x: -50, y: 35,
      scale: 0.2,
      opacity: 0
    });

    var bubbles = []; /* clearfix, elems to array*/
    for (var i = 0; i<dots.length; i++) bubbles.push(dots[i]);

    /* run animation */
    for (var i = 0; i < bubbles.length; i++) {
      let element = bubbles[i];
      this.animate(element, i, 50, 0.1, {
        loop  : 1.1+(i*0.3),
        start : 1+(i*0.2),
      });
    }

    /* Stop after timeout */
    setTimeout(() => {
      self.stop();
    }, 3000);
  }

  /*
  * element - html object
  * id - id elem in state
  * radius - radius number
  * delay - delay of start
  * duration - object {start, loop}
  */
  animate(element, id, radius, delay, duration) {
    var self = this; self.setup(element, id);

    /* initial as gsap*/
    TweenMax.to(self.state.dots[id], duration.start, {
      ease: Quad.easeInOut,
      radius: radius,
      delay: delay,
    });

    /* run loop as states data*/
    TweenMax.to(this.state.dots[id], duration.loop, {
			ease:Linear.easeNone,
			angle:Math.PI*2,
      delay:delay,
			repeat:-1,
    });
  }

  /* setup elem before animation */
  setup(element, id) {
    var self = this;

    if (typeof(self.state.dots[id]) == "undefined") {
      self.state.dots[id] = { radius: 0, angle: 0 };

      /* loop animation function
      *  at each iteration, it reads data
      *  from state to obtain current position */

      function updatePos() {
        var circle = this.state.dots[id];

        TweenMax.set(element, {
          x:Math.cos(circle.angle)*circle.radius,
          y:Math.sin(circle.angle)*circle.radius,
        });
      };

      self.state.frames[id] = new AnimationRequest(updatePos.bind(self));
    }
  }

  /* Method for stop animation */
  stop() {
    var { dots, button, icon, bg } = this.elems; self = this;

    this.setFilter('goo');

    /* collect dots and remove the instance of animation */
    for (var i = 0; i < self.state.dots.length; i++) {
      let index = i, dot = self.state.dots[i], duration = 0.8+(i*0.1);

      TweenMax.to(dot, duration, {
  			ease: Quad.easeInOut, radius:0,
        onComplete () {
          self.state.frames[index].stop();
          TweenMax.killTweensOf(dot);
        }
      });
    }

    /* show icon (main transition) */
    TweenMax.fromTo(icon, 1.5,
      { display: 'inline-block', opacity: 0, scale: 0.1 },
      { ease: Elastic.easeOut, scale: 1, opacity: 1, x: 0, y: 0 }
    );

    /* resize & move button to normal*/
    TweenMax.to(button, 0.5, { x: 0, y: 0, scale: 1, ease: Back.easeOut, opacity: 1, onComplete() {
      self.setState({ locked: false });
    }});
  }

  /* Main render method with mockup element loader */
  render() {
    var sid = styles.sid, state = this.state;

    return (
      <div>
  			<div style={styles.send.root} ref="send">
  				<div ref="dots" style={styles.send.indicator}>
  					<div style={[sid.root, sid.a]}></div>
  					<div style={[sid.root, sid.b]}></div>
  					<div style={[sid.root, sid.c]}></div>
  					<div style={[sid.root, sid.d]}></div>
            <div style={[sid.root, sid.e]}></div>
  				</div>
  				<button ref="button" key="$sendButton"
            style={[ styles.send.button, this.state.button?this.state.button:{} ]}
            onClick={this.start}>
    					<div ref="bg" style={styles.send.bg}></div>
    					<i className="fa fa-camera-retro"
                 style={[styles.send.icon, state.icon?state.icon:{}]}
                 ref="icon">
              </i>
  				</button>
  			</div>
      </div>
    )
  }
}

module.exports = ButtonLoader;
