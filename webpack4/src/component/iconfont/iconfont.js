export default function () {
  const root = document.querySelector('#root');
  if (root) {
    const div = document.createElement('div');
    div.innerHTML = `
      <span class="iconfont iconcomponent"></span>
      <span class="iconfont iconbussiness-man"></span>
    `;
    root.append(div);
  }
}