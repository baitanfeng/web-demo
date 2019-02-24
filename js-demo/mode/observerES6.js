// 观察者模式（发布订阅模式）

class Pubsub {
  constructor() {
    this.handles = {}
  }
  on(type, handle) {
    if (!this.handles[type]) {
      this.handles[type] = []
    }
    this.handles[type].push(handle)
  }
  emit(...args) {
    const type = args.shift()

    if (!this.handles[type]) {
      return false
    }
    for (let i = 0, len = this.handles[type].length; i < len; i++) {
      const handle = this.handles[type][i]
      handle(...args)
    }
  }
  off(type, handle) {
    const handles = this.handles[type]
    if (!handles) {
      return false
    }
    if (!handle) {
      handles.length = 0
      return true
    }
    for (let i = 0, len = handles.length; i < len; i++) {
      if (handles[i] === handle) {
        handles.splice(i, 1)
      }
    }
    return true
  }
}

const pb1 = new Pubsub()
pb1.on('click', msg => console.log(`on click, ${msg}`))
pb1.emit('click', 'from emit click')
