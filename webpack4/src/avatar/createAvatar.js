import avatar from './avatar.jpg';
import style from './avatar.scss';

function createAvatar() {
    const image = document.createElement('img');
    image.src = avatar;
    image.classList.add(style.abc);
    image.classList.add(style.avatar);
    document.querySelector('#root').append(image);
}

export default createAvatar;
