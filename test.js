const excludes = [5, 0]
let quoteTimeoutId = 0

quoteTimeoutId && clearInterval(quoteTimeoutId)

quoteTimeoutId = setInterval(() => {
  if (excludes.includes(new Date().getDay())) {
    console.log('excludes')
    return
  }
  console.log('正常')
}, 1000)
