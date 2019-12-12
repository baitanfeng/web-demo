let ongoingTouches = new Array;

function colorForTouch(touch) {
    let id = touch.identifier;
    id = id.toString(16); // make it a hex digit
    return "#" + id + id + id;
}

function ongoingTouchIndexById(idToFind) {
    for (let i = 0; i < ongoingTouches.length; i++) {
        let id = ongoingTouches[i].identifier;

        if (id == idToFind) {
            return i;
        }
    }
    return -1; // not found
}

function handleStart(evt) {
    evt.preventDefault();
    let el = document.getElementById("canvas");
    let ctx = el.getContext("2d");
    let touches = evt.changedTouches;

    for (let i = 0; i < touches.length; i++) {
        ongoingTouches.push(touches[i]);
        let color = colorForTouch(touches[i]);
        ctx.fillStyle = color;
        ctx.fillRect(touches[i].pageX - 2, touches[i].pageY - 2, 4, 4);
    }
}

function handleMove(evt) {
    evt.preventDefault();
    let el = document.getElementById("canvas");
    let ctx = el.getContext("2d");
    let touches = evt.changedTouches;

    ctx.lineWidth = 4;

    for (let i = 0; i < touches.length; i++) {
        let color = colorForTouch(touches[i]);
        let idx = ongoingTouchIndexById(touches[i].identifier);

        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.moveTo(ongoingTouches[idx].pageX, ongoingTouches[idx].pageY);
        ctx.lineTo(touches[i].pageX, touches[i].pageY);
        ctx.closePath();
        ctx.stroke();
        ongoingTouches.splice(idx, 1, touches[i]); // swap in the new touch record
    }
}

function handleEnd(evt) {
    evt.preventDefault();
    let el = document.getElementById("canvas");
    let ctx = el.getContext("2d");
    let touches = evt.changedTouches;

    ctx.lineWidth = 4;

    for (let i = 0; i < touches.length; i++) {
        let color = colorForTouch(touches[i]);
        let idx = ongoingTouchIndexById(touches[i].identifier);

        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.moveTo(ongoingTouches[i].pageX, ongoingTouches[i].pageY);
        ctx.lineTo(touches[i].pageX, touches[i].pageY);
        ongoingTouches.splice(i, 1); // remove it; we're done
    }
}

function handleCancel(evt) {
    evt.preventDefault();
    let touches = evt.changedTouches;

    for (let i = 0; i < touches.length; i++) {
        ongoingTouches.splice(i, 1); // remove it; we're done
    }
}


function startup() {
    let el = document.getElementById("canvas");
    el.addEventListener("touchstart", handleStart, false);
    el.addEventListener("touchend", handleEnd, false);
    el.addEventListener("touchcancel", handleCancel, false);
    el.addEventListener("touchleave", handleEnd, false);
    el.addEventListener("touchmove", handleMove, false);
}

document.addEventListener('DOMContentLoaded', startup, false)

document.addEventListener('touchstart', function (evt) {
    evt.preventDefault()
}, {
    passive: false
})
document.addEventListener('touchmove', function (evt) {
    evt.preventDefault()
}, {
    passive: false
})