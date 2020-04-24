function Header() {
    const dom = document.querySelector('#root');
    const el = document.createElement('div');
    el.innerHTML = 'header';
    dom.append(el);
}

export default Header;
// module.exports = Header;