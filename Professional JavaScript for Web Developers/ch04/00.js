var color = "blue"

function getColor() {
  var color = "red"
  return color
}

var temp = getColor

// console.log(getColor(), temp())
console.log(temp())

var arr = ["red", "green", "blue"]
console.log(arr.toString())
console.log(arr.valueOf())
console.log(arr)

{
  let arr = []
  arr.unshift("red", "green")
  arr.unshift("blue")
  console.log(arr)
}

{
  let arr = [1, 5, 10, 15, 20]
  let res = arr.sort()
  console.log(res)
  console.log(arr)
  res = arr.reverse()
  console.log(res)
  console.log(arr)
}

{
  let arr = [1, 5, 10, 15, 20]
  let arr2 = arr.slice()
  console.log(arr)
  console.log(arr2)
}

{
  let arr = [{
      a: 1,
      b: 2
    },
    {
      c: 3,
      d: 4
    }
  ]
  let arr2 = arr.slice()
  console.log(arr)
  console.log(arr2)
  arr[0].a = 2
  console.log(arr)
  console.log(arr2)
}

{
  let arr = [{
      a: 1,
      b: 2
    },
    {
      c: 3,
      d: 4
    }
  ]
  let arr2 = arr.concat()
  console.log(arr)
  console.log(arr2)
  arr[0].a = 2
  console.log(arr)
  console.log(arr2)
}

{
  let arr = [{
      a: 1,
      b: 2
    },
    {
      c: 3,
      d: 4
    }
  ]
  let arr2 = [...arr]
  console.log(arr)
  console.log(arr2)
  arr[0].a = 2
  console.log(arr)
  console.log(arr2)
}

{
  let arr = [{
      a: 1,
      b: 2
    },
    {
      c: 3,
      d: 4
    }
  ]
  let arr2 = Object.assign([], arr)
  console.log(arr)
  console.log(arr2)
  arr[0].a = 2
  console.log(arr)
  console.log(arr2)
}

{
  let arr = [{
      a: 1,
      b: 2
    },
    {
      c: 3,
      d: 4
    }
  ]
  let arr2 = []
  for (const iterator of arr) {
    arr2[arr2.length] = iterator
  }
  console.log(arr)
  console.log(arr2)
  arr[0].a = 2
  console.log(arr)
  console.log(arr2)
}

{
  console.time('for loop')
  let arr = []
  for (let i = 0; i < 100000; i++) {
    arr[i] = i + 1
  }
  console.timeEnd('for loop')
}

{
  function* fibonacci() {
    let [prev, curr] = [0, 1]
    while (true) {
      [prev, curr] = [curr, prev + curr]
      yield curr
    }
  }

  for (const iterator of fibonacci()) {
    console.log(iterator)

    if (iterator > 10) {
      break
    }
  }
}

{
  Object.prototype.objCustom = function () {};
  Array.prototype.arrCustom = function () {};

  let iterable = [3, 5, 7];
  iterable.foo = 'hello';

  for (let i in iterable) {
    console.log(i);
  }

  for (let i in iterable) {
    if (iterable.hasOwnProperty(i)) {
      console.log(i);
    }
  }
}