// https://ke.qq.com/course/367589?taid=2972108779264997

import MVVM from './mvvm.js';

new MVVM({
    el: '#app',
    data: {
        message: 'hello',
        count: 0
    },
    methods: {
        add() {
            this.count++;
        }
    }
});