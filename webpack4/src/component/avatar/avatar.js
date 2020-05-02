import avatar from './avatar.jpg';
import style from './avatar.scss';

export default function () {
  const root = document.querySelector('#root');
  if (root) {
    const article = document.createElement('div');
    const image = document.createElement('img');

    image.src = avatar;
    image.classList.add(style.abc, style.avatar);
    article.append(image);
    
    root.append(article);
  }
}