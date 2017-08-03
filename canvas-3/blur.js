window.onload = function(){
  let canvasWidth = window.innerWidth;
  let canvasHeight = window.innerHeight;

  let canvas = document.getElementById("canvas");
  let context = canvas.getContext("2d");

  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
  canvas.addEventListener('touchstart', e => e.preventDefault(), false);

  let radius = 50;
  let clippingRegion = {x: -1, y: -1, r: radius};
  let leftMargin = 0,
    topMargin = 0;

  let image = new Image();
  image.src = "image.jpg";
  image.onload = function(){
    let imageWidth=image.width,
      imageHeight=image.height;

    if(imageWidth/imageHeight>canvasWidth/canvasHeight){
      image.width=canvasWidth;
      image.height=(canvasWidth/imageWidth)*imageHeight;
    }else{
      image.height=canvasHeight;
      image.width=(canvasHeight/imageHeight)*imageWidth;
    }

    let blurDiv = document.getElementById('blur-div');
    blurDiv.style.width = `${canvas.width}px`;
    blurDiv.style.height = `${canvas.height}px`;

    let blurImage = document.getElementById('blur-image');
    blurImage.style.width = `${image.width}px`;
    blurImage.style.height = `${image.height}px`;

    leftMargin = (image.width - canvas.width) / 2;
    topMargin = (image.height - canvas.height) / 2;

    blurImage.style.top = `${-topMargin}px`;
    blurImage.style.left = `${-leftMargin}px`;

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
    let dx = canvas.width / 2 - image.width / 2,
      dy = canvas.height / 2 - image.height / 2;
    context.drawImage(image, dx, dy, image.width, image.height);
    context.restore();
  }

  function setClippingRegion(clippingRegion){
    context.beginPath();
    context.arc(clippingRegion.x, clippingRegion.y, clippingRegion.r, 0, Math.PI * 2, false);
    context.clip();
  }

  document.getElementById('reset-button').addEventListener('click', reset, false);
  document.getElementById('show-button').addEventListener('click', show, false);

  let interval;

  function reset(){
    clearInterval(interval);
    initCanvas();
  }

  function show(){
    interval = setInterval(function(){
      clippingRegion.r += 15;
      if(clippingRegion.r > Math.max(canvas.width, canvas.height) * 2) {
        clearInterval(interval);
      }
      draw(image, clippingRegion);
    }, 30)
  }
};
