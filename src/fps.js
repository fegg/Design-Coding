/**
 * window.performance 性能 API
 */

function FpsControl(fps, callback) {
  let delay = 1000 / fps;
  let time = null;
  let frame = -1;
  let tref = null;

  function loop(timestamp) {
    if (time === null) {
      time = timestamp;
    }

    const seg = Math.floor(timestamp - time) / delay;

    if (seg > frame) {
      frame = seg;
			callback({
				time: timestamp,
				frame: frame
			});
    }

    tref = requestAnimationFrame(loop)
  }

  this.isPlaying = false;
  this.frameRate = function (newFps) {
    if (!newFps) {
      return fps;
    }

		fps = newFps;
		delay = 1000 / fps;
		frame = -1;
		time = null;
  };
  this.start = function() {
		if (!this.isPlaying) {
			this.isPlaying = true;
			tref = requestAnimationFrame(loop);
		}
	};
  this.pause = function() {
		if (this.isPlaying) {
			cancelAnimationFrame(tref);
			this.isPlaying = false;
			time = null;
			frame = -1;
		}
	};
}

let ctx = c.getContext("2d"),
  pTime = 0,
  mTime = 0,
  x = 0;

ctx.font = "20px sans-serif";

const fps = new FpsControl(1, function(e) {
	ctx.clearRect(0, 0, c.width, c.height);
	ctx.fillText(
    "FPS: " + fps.frameRate() + 
    " Frame: " + e.frame.toFixed(1) + 
    " Time: " + (e.time - pTime).toFixed(1), 
    4, 
    30
  );
	pTime = e.time;

  const x = (pTime - mTime) * 0.1;
	if (x > c.width) mTime = pTime;
	ctx.fillRect(x, 50, 10, 10)
});

// start the loop
fps.start();

// UI
bState.onclick = function() {
	fps.isPlaying ? fps.pause() : fps.start();
};

sFPS.onchange = function() {
	fps.frameRate(+this.value)
};