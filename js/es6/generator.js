const fs = require('fs')

const readFile = fileName => {
  return new Promise((resolve, reject) => {
    fs.readFile(fileName, (err, data) => {
      if (err) {
        return reject(err)
      }
      resolve(data)
    })
  })
}

const gen = function* () {
  const f1 = yield readFile('/etc/fstab')
  const f2 = yield readFile('/etc/shells')
  console.log(f1.toString())
  console.log(f2.toString())
}

const asyncReadFile = async () => {
  const f1 = await readFile('/etc/fstab')
  const f2 = await readFile('/etc/shells')
  console.log(f1.toString())
  console.log(f2.toString())
}