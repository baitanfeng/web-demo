const acc = document.querySelectorAll(".accordion-title");

for (let i = 0, len = acc.length; i < len; i++) {
    acc[i].addEventListener('click', function() {
        this.classList.toggle("active");
        const panel = this.nextElementSibling;
        panel.classList.toggle('active');
        if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
        } else {
            panel.style.maxHeight = `${panel.scrollHeight}px`;
        }
    })
}

window.onresize = function () {
    window.requestAnimationFrame(handleResize)
}

function handleResize() {
    const panels = document.querySelectorAll(".accordion-body.active");
    panels.forEach(item => {
        item.style.maxHeight = `${item.scrollHeight}px`
    });
}