import style from './autoprefixer.scss';

export default function () {
  const root = document.querySelector('#root');
  if (root) {
    const article = document.createElement('div');

    const div = document.createElement('div');
    div.classList.add(style.image);
    article.append(div);

    const input = document.createElement('input');
    input.placeholder = 'please input'
    input.classList.add(style.input);
    article.append(input);

    root.append(article);
  }
}