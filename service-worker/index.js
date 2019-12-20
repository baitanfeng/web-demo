navigator.serviceWorker.register('./sw.js', {
        scope: './'
    })
    .then(reg => {
        console.log('success', reg);
        return new Promise(resolve => {
            const interval = setInterval(() => {
                if (reg.active) {
                    clearInterval(interval);
                    resolve(reg.active);
                }
            }, 100);
        });
    })
    .then(activeReg => {
        activeReg.postMessage('this message is from page to sw');
    })
    .catch(err => {
        console.log('fail', err);
    });