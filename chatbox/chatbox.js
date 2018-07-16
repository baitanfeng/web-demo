(() => {
  if (!CSS.supports('overscroll-behavior-y', 'contain')) {
    alert("Your browser doesn't support overscroll-behavior :(");
  }
  // Define <chat-window> custom element.
  customElements.define('chat-window', class extends HTMLElement {
    constructor() {
      super();

      const shadowRoot = this.attachShadow({
        mode: 'open'
      });
      const tmpl = document.querySelector('#chat-window-template');
      shadowRoot.appendChild(tmpl.content.cloneNode(true));

      shadowRoot.querySelector('#title').textContent = this.title;

      const closeButton = shadowRoot.querySelector('#close');
      closeButton.addEventListener('click', e => {
        this.remove();
      });

      this.msgs = shadowRoot.querySelector('.msgs');

      this.input = shadowRoot.querySelector('input');
      this.input.addEventListener('keypress', e => {
        if (e.code === 'Enter' && this.input.value) {
          const msg = document.createElement('div');
          msg.classList.add('msg');
          msg.textContent = this.input.value;
          this.appendChild(msg);
          e.target.value = null;
          this._scrollToBottom();
        }
      });

      const toolbar = shadowRoot.querySelector('.toolbar');
      toolbar.addEventListener('click', e => {
        this.open = !this.open;
        if (this.open) {
          this.input.focus();
        } else {
          this.input.blur();
          this.blur();
        }
      });

      this.tabIndex = 0;
      this.open = this.hasAttribute('open');
    }

    get open() {
      return this._open;
    }

    set open(val) {
      this._open = val;
      if (this._open) {
        this.setAttribute('open', '');
        this._scrollToBottom();
      } else {
        this.removeAttribute('open');
      }
    }

    _scrollToBottom() {
      this.msgs.scrollTop = this.msgs.scrollHeight;
    }
  });
  async function simulateRefreshAction() {
    const sleep = (timeout) => new Promise(resolve => setTimeout(resolve, timeout));
    const transitionEnd = function (propertyName, node) {
      return new Promise(resolve => {
        function callback(e) {
          e.stopPropagation();
          if (e.propertyName === propertyName) {
            node.removeEventListener('transitionend', callback);
            resolve(e);
          }
        }
        node.addEventListener('transitionend', callback);
      });
    }
    const refresher = document.querySelector('.refresher');
    document.body.classList.add('refreshing');
    await sleep(2000);
    refresher.classList.add('shrink');
    await transitionEnd('transform', refresher);
    refresher.classList.add('done');
    refresher.classList.remove('shrink');
    document.body.classList.remove('refreshing');
    await sleep(0); // let new styles settle.
    refresher.classList.remove('done');
  }

  function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function formatDateBasedOnToday(date) {
    const today = new Date();
    const opts = {};
    if (date.getDay() === today.getDay()) {
      opts.minute = 'numeric';
      opts.hour = 'numeric';
    } else {
      opts.month = 'short';
      opts.day = 'numeric';
    }
    return new Intl.DateTimeFormat('en-US', opts).format(date);
  }

  function populatePage(inbox) {
    const frag = new DocumentFragment();
    let date = new Date();
    for (let i = 0; i < NUM_EMAILs; ++i) {
      date.setMinutes(date.getMinutes() - getRandomIntInclusive(1, 10));
      const div = document.createElement('div');
      div.innerHTML = `<span class="label">Email</span></span>${formatDateBasedOnToday(date)}</span>`;
      frag.appendChild(div);
    }
    inbox.appendChild(frag);
  }
  const NUM_EMAILs = 100;
  let _startY = 0;
  const inbox = document.querySelector('#inbox');
  inbox.addEventListener('touchstart', e => {
    _startY = e.touches[0].pageY;
  }, {
    passive: true
  });
  inbox.addEventListener('touchmove', e => {
    const y = e.touches[0].pageY;
    // Activate custom pull-to-refresh effects when at the top fo the container
    // and user is scrolling up.
    if (document.scrollingElement.scrollTop === 0 && y > _startY &&
      !document.body.classList.contains('refreshing')) {
      simulateRefreshAction();
    }
  }, {
    passive: true
  });
  populatePage(inbox);
})();