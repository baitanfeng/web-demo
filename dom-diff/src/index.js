import { createElement, render, renderDom } from './element';

let virtualDom = createElement('ul', {class: 'list'}, [
    createElement('li', {class: 'item'}, ['a']),
    createElement('li', {class: 'item'}, ['b']),
    createElement('li', {class: 'item'}, ['c'])
]);
let el = render(virtualDom);
renderDom(el, document.querySelector('#root'));

console.log(el);
console.log(virtualDom);