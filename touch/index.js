let timer;

const usual = document.querySelector('.usual');

usual.addEventListener('touchstart', handleTouchStart, false);
usual.addEventListener('touchmove', handleTouchMove, false);
usual.addEventListener('touchcancel', handleTouchCancel, false);
usual.addEventListener('touchend', handleTouchEnd, false);

function handleTouchStart(e) {
  clearTimeout(timer);
  console.log('handleTouchStart', e);
}

function handleTouchMove(e) {
  if (!timer) {
    timer = setTimeout(() => {
      timer = null;
      // console.log('handleTouchMove', e);
    }, 1000);
  }
}

function handleTouchCancel(e) {
  clearTimeout(timer);
  console.log('handleTouchCancel', e);
}

function handleTouchEnd(e) {
  e.stopPropagation();
  clearTimeout(timer);
  console.log('handleTouchEnd', e);
}