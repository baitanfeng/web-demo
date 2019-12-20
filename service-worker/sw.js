this.addEventListener('install', evt => {
    console.log('service worker install', this);
});

this.addEventListener('activate', evt => {
    console.log('service worker activate', this);
});

this.addEventListener('message', evt => {
    console.log(evt.data, this);
});