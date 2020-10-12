const firstMessage = require('./first-message')
module.exports = client => {
    const channelId = '765280692455211011'

    firstMessage(client, channelId, 'hello world', [])

}

            