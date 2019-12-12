const request = require('request')
const dateFormat = require('dateformat')
const WebSocket = require('ws')

const wss = new WebSocket.Server({
    port: 8090,
    path: '/guest'
})

wss.on('connection', ws => {
    ws.on('message', message => {
        console.log(`received: ${message}`)
    })
    sendInfo(ws)
})

function sendInfo(ws) {
    request('http://uinames.com/api?region=china', (err, res, body) => {
        if (err) {
            return
        }
        if (res.statusCode === 200) {
            body = JSON.parse(body)
            const guestInfo = {
                guest: `${body.name}${body.surname}`,
                time: dateFormat(new Date(), 'HH:MM:ss')
            }

            if (ws.readyState === WebSocket.OPEN) {
                ws.send(JSON.stringify(guestInfo))
                setTimeout(() => {
                    sendInfo(ws)
                }, (Math.random() * 3 + 1) * 1000)
            }
        }
    })
}