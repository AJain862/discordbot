const firstMessage = require('./first-message')
module.exports = client => {
    const channelId = '765259740590374925'

    firstMessage(client, channelId, 'hello world', [])

}

            