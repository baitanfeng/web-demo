{
    const logInOrder = async urls => {
        const textPromises = urls.map(async url => {
            const res = await fetch(url)
            return res.text()
        })

        for (const textPromise of textPromises) {
            console.log(await textPromise)
        }
    }
}

{
    const logInOrder = async urls => {
        for (const url of urls) {
            const res = await fetch(url)
            console.log(await res.text())
        }
    }
}

{
    const f = async () => {
        await Promise.reject('出错了')
            .catch(e => console.log(e))
        return await Promise.resolve('otfngo')
    }
    f().then(
        res => console.log(res)
    )
}

{
    const f = async () => {
        try {
            await Promise.reject('出错了')
        } catch (e) {

        }
        return await Promise.resolve('otfngo')
    }
    f().then(
        res => console.log(res),
        err => console.log(err)
    )
}

{
    const f = async () => await Promise.reject('出错了')
    f().then(
        res => console.log('正常'),
        err => console.log(err)
    )
}

{
    class Sleep {
        constructor(timeout) {
            this.timeout = timeout
        }
        then(resolve, reject) {
            const startTime = Date.now()
            setTimeout(
                () => resolve(Date.now() - startTime),
                this.timeout
            )
        }
    }

    (async () => {
        const actualTime = await new Sleep(2000)
        console.log(actualTime)
    })()
}

{
    const getTitle = async url => {
        const res = await fetch(url)
        const html = await res.text()
        return html.match(/<title>([\s\S]+)<\/title>/i)[1]
    }

    getTitle('https://tc39.github.io/ecma262/').then(console.log)
}

{
    const f = async () => {
        throw new Error('出错了')
    }
    f().then(
        res => console.log('正常的'),
        err => console.log(err)
    )
}

{
    const f = async () => 'hello world'
    f().then(res => console.log(res))
}

{
    class Storage {
        constructor() {
            this.cachePromise = caches.open('avatars')
        }

        async getAvatar(name) {
            const cache = await this.cachePromise
            return cache.match(`/avatars/${name}.jpg`)
        }
    }

    const storage = new Storage()
    storage.getAvatar('otfngo').then(res => console.log(res))
}

{
    // const timeout = async ms => {
    //   await new Promise(resolve => {
    //     setTimeout(resolve, ms)
    //   })
    // }

    // const asyncPrint = async (value, ms) => {
    //   console.log('start')
    //   await timeout(ms)
    //   console.log(value)
    // }

    // asyncPrint('otfngo', 2000)
}

{
    // const getStockPriceByName = async name => {
    //   const symbol = await getStockSymbol(name)
    //   const stockPrice = await getStockPrice(symbol)
    //   return stockPrice
    // }

    // const getStockSymbol = async name => {
    //   return name
    // }

    // const getStockPrice = async symbol => {
    //   if (symbol) {
    //     return 0.125
    //   }
    //   return 0.000
    // }

    // getStockPriceByName('goog').then(res => {
    //   console.log(res)
    // })
}