document.body.addEventListener("click", function () {
    const audio = document.getElementById("backgroundMusic");
    audio.currentTime = 20;
    audio.play();
  });

  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  class Sprite {
    constructor({ position, imageSrc, scale = 1, framesMax = 1, offset = { x: 0, y: 0 }, width, height, opacity = 1 }) {
  this.position = position;
      this.width = width;
  this.height = height;
      this.image = new Image();
      this.image.src = imageSrc;
      this.scale = scale;
      this.framesMax = framesMax;
      this.framesCurrent = 0;
      this.framesElapsed = 0;
      this.framesHold = 5;
      this.offset = offset;
  this.opacity = opacity;
    }

    draw() {
  ctx.globalAlpha = this.opacity;
  ctx.drawImage(
    this.image,
    this.framesCurrent * (this.image.width / this.framesMax),
    0,
    this.image.width / this.framesMax,
    this.image.height,
    this.position.x - this.offset.x,
    this.position.y - this.offset.y,
    (this.image.width / this.framesMax) * this.scale,
    this.image.height * this.scale
      )
      }

  animateFrames() {
  this.framesElapsed++

  if (this.framesElapsed % this.framesHold === 0) {
    if (this.framesCurrent < this.framesMax - 1) {
      this.framesCurrent++
    } else {
      this.framesCurrent = 0
    }
  }
}

update() {
  this.draw()
  this.animateFrames()
}
}
  const fire = new Sprite({
height: 100,
width: 100,
position: {
    x: this.canvas.width / 2 - 107.5,
    y: this.canvas.height - 400
},
    imageSrc: "./sprites/burning_loop_1.png",
    framesMax: 8,
    scale: 10
  });

  const fireLeft = new Sprite({
    height: 100,
    width: 100,
    position: {
        x: this.canvas.width / 2 - 210.5,
        y: this.canvas.height - 400
    },
        imageSrc: "./sprites/burning_loop_1.png",
        framesMax: 8,
        scale: 10
   });

   const fireRight = new Sprite({
    height: 100,
    width: 100,
    position: {
        x: this.canvas.width / 2 - 0.5,
        y: this.canvas.height - 400
    },
        imageSrc: "./sprites/burning_loop_1.png",
        framesMax: 8,
        scale: 10
      });
    

  const icon1 = new Sprite({
height: 100,
width: 100,
position: {
    x: this.canvas.width / 2 - 50,
    y: this.canvas.height - 600
},
    imageSrc: "./sprites/icon.svg",
    framesMax: 1,
    scale: 0.5,
opacity: 1
  });

  const icon2 = new Sprite({
height: 100,
width: 100,
position: {
    x: this.canvas.width / 2 - 50,
    y: this.canvas.height - 215
},
    imageSrc: "./sprites/icon2.svg",
    framesMax: 1,
    scale: 0.5,
opacity: 0
  });

  let startTime;
  let durationOne = 17000; // icon1 animation length
  let durationTwo = 40000; // icon2 animation length
  let startOffsetOne = 599; //this.canvas.height - 155; // y-axis distance between icon1 and icon2 at start
  let endOffsetOne = 215; // y-axis animation ending position.
  let startOffsetTwo = 90; // y-axis distance between icon2 and icon1 at start
  let endOffsetTwo = 649; // y-axis animation ending position for icon2

  console.log('canvas', this.canvas.height);

  function animate() {
    window.requestAnimationFrame(animate);
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    icon1.update();
    icon2.update();
    fire.update();
    fireLeft.update();
    fireRight.update();
  }

//when setTimeout timer triggers at 5 seconds, browser automatically passes value to callback function
//from window.requestAnimationFrame(moveIcon1), so any arg can be used for moveIcon1, but timestamp
//makes sense
  function moveIcon1(timestamp) {
    if (!startTime) {
    startTime = timestamp;
    }

    let progress = timestamp - startTime; //calculates time from startTime
    let ratio = progress / durationOne;
    let yOffset = startOffsetOne - ratio * (startOffsetOne - endOffsetOne);
    icon1.position.y = canvas.height - yOffset;

    if (progress < durationOne) {
    window.requestAnimationFrame(moveIcon1);
    } else {
        icon1.opacity = 0;
    }
  }

  function moveIcon2(timestamp) {
    if (!startTime) {
    startTime = timestamp;
    console.log('timestamp2', timestamp);
    }

    icon2.opacity = 1;
    let progress = timestamp - startTime; //calculates time from startTime
    let ratio = progress / durationTwo;
    console.log('ratio2', ratio);
    let yOffset = startOffsetTwo + ratio * (startOffsetTwo - endOffsetTwo);
    console.log('yOffset2', yOffset);

    icon2.position.y = canvas.height + yOffset;
    console.log('position2', icon2.position.y);

    if (progress < durationTwo) {
    window.requestAnimationFrame(moveIcon2);
    }
  }

  setTimeout(() => {
     window.requestAnimationFrame(moveIcon1);
  }, 5000);

  setTimeout(() => {
    window.requestAnimationFrame(moveIcon2);
  }, 26000)

  animate();