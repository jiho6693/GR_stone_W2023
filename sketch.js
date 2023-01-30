// tilt and rotation for enabled devices
// on a desktop nothing will happen, but it wont break
// variables allow motion and ios to be detected.
// further code to detect a compass and tilt hardware on non-ios devices needed

let bg;
let img;
let motion = false;
let ios = false;

// below code is essential for ios13 and above. 
// A click is needed for the device to request permission 
if (typeof DeviceMotionEvent.requestPermission === 'function') {
  document.body.addEventListener('click', function() {
    DeviceMotionEvent.requestPermission()
      .then(function() {
        console.log('DeviceMotionEvent enabled');

        motion = true;
        ios = true;
      })
      .catch(function(error) {
        console.warn('DeviceMotionEvent not enabled', error);
      })
  
  })
} else {
  // we are not on ios13 and above
  // todo
  // add detection for hardware for other devices
  // if(got the hardware) {
  // motion = true;
  // }
}

function setup() {
  bg = loadImage('stone.png');
  img = loadImage('1.png');
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(bg);
  

  // we can use rotationZ, rotationX and rotationY
  // they should be used in this order (apparently - see docs)
  // even though default mode is radians the Z rotation returns degrees unless converted

  // the below code ensures a smooth transition from 0-180 and back
  let zMotion = round(width  * abs(radians(rotationZ) - PI))
  // x and y values moved from the centre point
  let yMotion = round(0 + rotationX * 10)
  let xMotion = round(0 + rotationY * 10)

  // motion affected circle
  image(img, xMotion, yMotion, windowHeight)

 
  // text to provide instructions and
  // document values at the top of the screen
  noStroke()
  textSize(width / 20)
  textFont("'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace")

  fill(255, 100, 50)
  text("Click to read on iOS", windowWidth /2, windowHeight /2)

}
