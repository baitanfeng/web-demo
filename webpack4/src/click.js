import './click.css';

function handleClick() {
  const element = document.createElement('div');
  element.innerHTML = 'mufeng';
  document.querySelector('#root').append(element);
}

export default handleClick;