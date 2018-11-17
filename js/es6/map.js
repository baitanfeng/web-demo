const map = new Map()

map.set(1, ['a', 'b'])
map.set(2, ['c', 'd'])

console.log(map)
console.log(Array.from(map))

const map2 = new Map([
  [1, ['a', 'b']],
  [2, ['c', 'd']]
])

console.log(map2)
console.log(Array.from(map2))

// const actions = new Map([
//   ['guest_1', () => {/*do sth*/ }],
//   ['guest_2', () => {/*do sth*/ }],
//   ['guest_3', () => {/*do sth*/ }],
//   ['guest_4', () => {/*do sth*/ }],
//   ['guest_5', () => {/*do sth*/ }],
//   ['master_1', () => {/*do sth*/ }],
//   ['master_2', () => {/*do sth*/ }],
//   ['master_3', () => {/*do sth*/ }],
//   ['master_4', () => {/*do sth*/ }],
//   ['master_5', () => {/*do sth*/ }],
//   ['default_0', () => {/*do sth*/ }],
// ])

// /**
//  * 按钮点击事件
//  * @param {string} identity 身份标识：guest客态 master主态
//  * @param {number} status 活动状态：1 开团进行中 2 开团失败 3 开团成功 4 商品售罄 5 有库存未开团
//  */
// const onButtonClick = (identity = 'default', status = 0) => {
//   const action = actions.get(`${identity}_${status}`)
//   action.call(this)
// }

const actions = new Map([
  [{ identity: 'guest', status: 1 }, () => {/*do sth*/ }],
  [{ identity: 'guest', status: 2 }, () => {/*do sth*/ }],
  //...
])

const onButtonClick = (identity, status) => {
  const action = [...actions].filter(([key, value]) => (key.identity === identity && key.status === status))
  action.forEach(([key, value]) => value.call(this))
}