let scale = 1;
let active = false;
let currentX = 0;
let currentY=0;
let initialX;
let initialY;
let xOffset = 0;
let yOffset = 0;
let imgItem;
let container;
let startDist = 0;

window.addEventListener('DOMContentLoaded',()=>{
  container = document.querySelector(".img-box");

  container.addEventListener("touchstart", dragStart, false);
  container.addEventListener("touchend", dragEnd, false);
  container.addEventListener("touchmove", drag, false);

  container.addEventListener("mousedown", dragStart, false);
  container.addEventListener("mouseup", dragEnd, false);
  container.addEventListener("mousemove", drag, false);

});


function zoom(event) {
  const maxZoom = window.innerWidth < 1024? 4 : 3;
  scale += event.deltaY / 2 * -0.01;
  scale = Math.min(Math.max(1, scale), maxZoom);
  imgItem.style.transform = `scale(${scale}) translate3d(${currentX}px, ${currentY}px, 0)`;
  if (scale === 1){
    currentX = 0;
    currentY = 0;
    initialX =0;
    initialY = 0;
    xOffset = 0;
    yOffset = 0;
  }
  setCursor();
}

function dragStart(e) {
  if (e.type === "touchstart") {
    if (e.touches.length === 2){
      startDist = getTouchPointsDistance(e.touches);
    }
    initialX = e.touches[0].clientX - xOffset;
    initialY = e.touches[0].clientY - yOffset;
  } else {
    initialX = e.clientX - xOffset;
    initialY = e.clientY - yOffset;
  }

  if (e.target === imgItem && scale > 1) {
    active = true;
  }
}

function dragEnd(e) {
  initialX = currentX;
  initialY = currentY;

  active = false;
}

function drag(e) {
  const maxX = container.getBoundingClientRect().width / 3;
  const maxY = container.getBoundingClientRect().height / 3;

  if (e.type === "touchmove") {
    if (e.touches.length === 2) {
      const newDist = getTouchPointsDistance(e.touches);
      const zoomValue = newDist - startDist;
      const zoomObj = {
        deltaY: zoomValue < 0 ? Math.abs(zoomValue) : zoomValue * -1
      };

      zoom(zoomObj);
      return;
    }
  }

  if (active) {

    e.preventDefault();

    if (e.type === "touchmove") {
        if (Math.abs(e.touches[0].clientX - initialX) <= maxX && Math.abs(e.touches[0].clientY - initialY) <= maxY) {
          currentX = e.touches[0].clientX - initialX;
          currentY = e.touches[0].clientY - initialY;
        }
    } else {
      if (Math.abs(e.clientX - initialX)<=maxX && Math.abs(e.clientY - initialY)<=maxY){
        currentX = e.clientX - initialX;
        currentY = e.clientY - initialY;
      }
    }

    xOffset = currentX;
    yOffset = currentY;

    setTranslate(currentX, currentY, imgItem);
  }
}

function setTranslate(xPos, yPos, el) {
  el.style.transform = "scale("+scale+") translate3d(" + xPos + "px, " + yPos + "px, 0)";
}

function getTouchPointsDistance(touches) {
  const touch0 = touches[0];
  const touch1 = touches[1];
  return Math.sqrt(Math.pow(touch1.pageX - touch0.pageX, 2) + Math.pow(touch1.pageY - touch0.pageY, 2));
}

function setCursor () {
  if (scale > 1){
    imgItem.style.cursor = 'grab';
  } else {
    imgItem.style.cursor = 'default';
  }
}
