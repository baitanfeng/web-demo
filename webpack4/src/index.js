import avatar from './component/avatar/avatar';
import iconfont from './component/iconfont/iconfont';
import HMR from './component/HMR/HMR';
import {
  add,
  minus
} from './utils/math';
import _ from 'lodash-es';

import './index.css';
import autoprefixer from './component/autoprefixer/autoprefixer';

avatar();
iconfont();
HMR();
autoprefixer();

add(1, 2);
console.log(_.join([1, 2, 3]));

document.addEventListener('click', async () => {
  try {
    const module = await import( /* webpackPrefetch: true */ './component/prefetch/prefetch' );
    module.default();
  } catch (error) {
    console.error(error)
  }
});