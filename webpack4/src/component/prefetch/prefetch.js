import './prefetch.scss';

export default function () {
  const root = document.querySelector('#root');
  if (root) {
    const element = document.createElement('div');
    element.innerHTML = 'mufeng';
    root.append(element);
  }
}