import style from './HMR.scss';

export default function () {
  const root = document.querySelector('#root');
  if (root) {
    const article = document.createElement('div');
    const btn = document.createElement('button');

    btn.innerHTML = 'add';
    btn.addEventListener('click', () => {
      const div = document.createElement('div');
      div.innerHTML = 'HMR';
      div.classList.add(style.HMR)
      article.append(div);
    });
    article.append(btn);
    
    root.append(article);
  }
}