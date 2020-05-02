import avatar from './component/avatar/avatar';
import iconfont from './component/iconfont/iconfont';
import HMR from './component/HMR/HMR';
import {
  add,
  minus
} from './utils/math';
import _ from 'lodash-es';

import './index.css';

avatar();
iconfont();
HMR();

add(1, 2);
console.log(_.join([1, 2, 3]));

document.addEventListener('click', () => {
  import( /* webpackPrefetch: true */ './component/prefetch/prefetch').then(({
    default: fn
  }) => {
    fn();
  })
})