let txtObj = document.getElementsByClassName('txt')
for (let i = 0; i < txtObj.length; i++) {
  txtObj[i].ondragstart = handle_start
  txtObj[i].ondrag = handle_drag
  txtObj[i].ondragend = handle_end
}

function handle_start(e) {
  e.dataTransfer.setData('Text', e.target.id)
  console.log('handle_start-拖动开始')
}

function handle_drag(e) {
  console.log('handle_drag-拖动中')
}

function handle_end(e) {
  console.log('handle_end-拖动结束')
}

let target = document.getElementById('right')
target.ondragenter = handle_enter
target.ondragover = handle_over
target.ondragleave = handle_leave
target.ondrop = handle_drop
let leftTarget = document.getElementById('left')
leftTarget.ondragenter = handle_enter
leftTarget.ondragover = handle_over
leftTarget.ondragleave = handle_leave
leftTarget.ondrop = handle_drop

function handle_enter(e) {
  e.preventDefault()
  console.log('handle_enter-进入目的地')
}

function handle_over(e) {
  e.preventDefault()
  let returnObj = e.dataTransfer.getData('Text')
  console.log(returnObj + '-handle_over-在目的地范围内')
}

function handle_leave(e) {
  e.preventDefault()
  let returnObj = e.dataTransfer.getData('Text')
  console.log(returnObj)
  console.log('handle_leave-没有放下就离开目的地')
}

function handle_drop(e) {
  e.stopPropagation(); // 不再派发事件。解决Firefox浏览器，打开新窗口的问题。
  e.preventDefault()
  let returnObj = e.dataTransfer.getData('Text')
  if (returnObj) {
    const element = e.target;
    const className = element.className;
    const insertingNode = document.getElementById(returnObj);
    if (/left|right/.test(className)) {
      element.insertBefore(insertingNode, null);
    } else {
      element.parentNode.insertBefore(insertingNode, element);
    }
  }
  console.log(returnObj + '-handle_drop-在目的地区释放')
}