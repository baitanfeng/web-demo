let acc = document.querySelectorAll(".accordion-title");
for (let i = 0, len = acc.length; i < len; i++) {
  acc[i].onclick = function () {
    this.classList.toggle("active");
    let panel = this.nextElementSibling;
    panel.classList.toggle("active");
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = `${panel.scrollHeight}px`;
    }
  }
}

window.onresize = function () {
  let panel = document.querySelectorAll(".accordion-body.active");
  panel.forEach(item => {
    item.style.maxHeight = `${item.scrollHeight}px`
  });
}