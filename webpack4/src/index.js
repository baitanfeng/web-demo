// const Header = require('./header.js');

import Header from './header.js';
import createAvatar from './avatar/createAvatar';
import {
  add,
  minus
} from './math';
// import _ from 'lodash';
// import _ from 'lodash-es';

// import './index.css';
import 'src/index.css'

new Header();
createAvatar();
add(1, 2);
// console.log(_.join([1, 2, 3]));

const root = document.querySelector('#root');

const div = document.createElement('div');
div.innerHTML = '<span class="iconfont iconcomponent"></span><span class="iconfont iconbussiness-man"></span>'
root.append(div);

const btn = document.createElement('button');
btn.innerHTML = 'add';
root.append(btn);
btn.addEventListener('click', () => {
  const div = document.createElement('div');
  div.innerHTML = 'item';
  div.classList.add('HMR')
  root.append(div);
});

const arr = [1, 2, 3];
if (arr.includes(2)) {
  () => console.log('ok');
}

// async function getComponent() {
//   const {
//     default: _
//   } = await import('lodash-es');
//   const element = document.createElement('div');
//   element.innerHTML = _.join(['mu', 'feng']);
//   return element;
// }

// document.addEventListener('click', () => {
//   getComponent().then(element => {
//     root.append(element);
//   });
// });

document.addEventListener('click', () => {
  import(/* webpackPrefetch: true */'./click').then(({default: fn}) => {
    fn();
  })
})
