let canvasWidth = window.innerWidth;
let canvasHeight = window.innerHeight;

let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");

canvas.width = canvasWidth;
canvas.height = canvasHeight;

let radius = 50;
let clippingRegion = {x: -1, y: -1, r: radius};
let leftMargin = 0,
  topMargin = 0;

let image = new Image();
image.src = "image.jpg";
image.onload = function(){
  $("#blur-div").css({
    width: `${canvas.width}px`,
    height: `${canvas.height}px`
  });

  $('#blur-image').css({
    width: `${image.width}px`,
    height: `${image.height}px`
  });

  leftMargin = (image.width - canvas.width) / 2;
  topMargin = (image.height - canvas.height) / 2;

  $('#blur-image').css({
    top: `${-topMargin}px`,
    left: `${-leftMargin}px`
  });

  initCanvas();
};

function initCanvas(){
  let theLeft = leftMargin < 0 ? -leftMargin : 0;
  let theTop = topMargin < 0 ? -topMargin : 0;
  clippingRegion = {
    x: Math.random() * (canvas.width - radius * 2 - theLeft * 2) + radius + theLeft,
    y: Math.random() * (canvas.height - radius * 2 - theTop * 2) + radius + theTop,
    r: radius
  };
  draw(image, clippingRegion);
}

function draw(image, clippingRegion){
  context.clearRect(0, 0, canvas.width, canvas.height);

  context.save();
  setClippingRegion(clippingRegion);
  context.drawImage(image,
    Math.max(leftMargin, 0), Math.max(topMargin, 0),
    Math.min(canvas.width, image.width), Math.min(canvas.height, image.height),
    leftMargin < 0 ? -leftMargin : 0, topMargin < 0 ? -topMargin : 0,
    Math.min(canvas.width, image.width), Math.min(canvas.height, image.height));
  context.restore();
}

function setClippingRegion(clippingRegion){
  context.beginPath();
  context.arc(clippingRegion.x, clippingRegion.y, clippingRegion.r, 0, Math.PI * 2, false);
  context.clip();
}

let interval;

function reset(){
  clearInterval(interval);
  initCanvas();
}

function show(){
  interval = setInterval(function(){
    clippingRegion.r += 15;
    if(clippingRegion.r > Math.max(canvas.width, canvas.height) * 2){
      clearInterval(interval);
    }
    draw(image, clippingRegion);
  }, 30)
}