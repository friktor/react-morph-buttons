module.exports = {
  extend (src, obj) {
     for (var i in obj) if (obj.hasOwnProperty(i)) src[i] = obj[i];
     return src;
  },
  AnimationRequest: class {
    constructor(fn) {
      /* binding methods with global scope */
      this.stop = this.stop.bind(this);
      this.loop = this.loop.bind(this);
      this.fn = fn;
      /* start loop after create new instance */
      this.id = window.requestAnimationFrame(this.loop);
    }

    /* main loop with cb function */
    loop() { this.fn(); this.id = window.requestAnimationFrame(this.loop); }

    /* stop loop animation from instance */
    stop() { window.cancelAnimationFrame(this.id); }
  }
}
