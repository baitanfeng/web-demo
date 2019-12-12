const refreshText = document.querySelector('.refresh-text')
const refreshContainer = document.querySelector('.refresh-container')
const loadmoreText = document.querySelector('.loadmore-text')

const containerStyle = refreshContainer.style

const frag = document.createDocumentFragment()
for (let i = 0; i < 20; i++) {
    const p = document.createElement('p')
    p.innerText = `${i + 1}`
    frag.appendChild(p)
}
refreshContainer.appendChild(frag)

let startY = 0
let transitionHeight = 0

refreshContainer.addEventListener('touchstart', event => {
    startY = event.touches[0].clientY
    containerStyle.transition = 'transform 0s'
}, false)

refreshContainer.addEventListener('touchmove', event => {
    transitionHeight = event.touches[0].clientY - startY
    containerStyle.transform = `translateY(${transitionHeight}px)`

    if (transitionHeight > 0 && transitionHeight <= 50) {
        refreshText.innerText = '下拉刷新'
    } else if (transitionHeight > 50) {
        refreshText.innerText = '释放更新'
    }
}, false)

refreshContainer.addEventListener('touchend', event => {
    const deltaY = event.changedTouches[0].clientY - startY

    containerStyle.transform = 'translateY(0)'
    if (deltaY > 50) {
        containerStyle.transition = 'transform 0.5s ease 1s'
        refreshText.innerText = '更新中...'
    } else {
        containerStyle.transition = 'transform 0.5s ease'
    }
}, false)

function getScrollTop() {
    let scrollTop = 0

    if (document.documentElement && document.documentElement.scrollTop) {
        scrollTop = document.documentElement.scrollTop
    } else if (document.body) {
        scrollTop = document.body.scrollTop
    }

    return scrollTop
}

function getClientHeight() {
    let clientHeight = 0

    if (document.body.clientHeight && document.documentElement.clientHeight) {
        clientHeight = Math.min(
            document.body.clientHeight,
            document.documentElement.clientHeight
        )
    } else {
        clientHeight = Math.max(
            document.body.clientHeight,
            document.documentElement.clientHeight
        )
    }

    return clientHeight
}

function getScrollHeight() {
    return Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight
    )
}

function throttle(method, context) {
    window.clearTimeout(method.timeoutId)
    method.timeoutId = window.setTimeout(() => {
        method.call(context)
    }, 300)
}

function fetchData() {
    window.setTimeout(() => {
        refreshContainer.insertAdjacentHTML(
            'beforeend',
            `<p>${+new Date()}</p>`
        )
    }, 1000)
}

window.addEventListener(
    'scroll',
    () => {
        if (getScrollTop() + getClientHeight() === getScrollHeight()) {
            loadmoreText.innerText = '加载中...'
            throttle(fetchData)
        }
    },
    false
)