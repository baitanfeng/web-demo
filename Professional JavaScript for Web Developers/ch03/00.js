// 无论在什么情况下都没有必要把一个变量的值显式地设置为 undefined ，可是同样的规则对 null 却不适用。换句话说，只要意在保存对象的变量还没有真正保存对象，就应该明确地让该变量保存 null 值。这样做不仅可以体现 null 作为空对象指针的惯例，而且也有助于进一步区分 null 和 undefined 。

let o = {
  valueOf: () => -1
}

function setName(obj) {
  obj.name = 'ootfngoo'
  obj = {}
  obj.name = 'otfngo'
}

let person = {}
setName(person)
console.log(person.name)

let obj1 = {}
let obj2 = obj1
// obj2.name = "ootfngoo"
obj2 = {}
obj2.name = "otfngo"
console.log(obj1.name)