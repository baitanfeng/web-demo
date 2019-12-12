const stop = document.querySelector('.stop')

const worker = new Worker('./worker.js')
worker.postMessage('post message to worker')

worker.addEventListener('message', e => {
    console.log(e.data)
})

stop.addEventListener('click', e => worker.terminate())