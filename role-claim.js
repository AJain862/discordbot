const firstMessage = require('./first-message')
module.exports = (client) => {
    const channelId = '765289064772927490'

    const getEmoji = (emojiName) => client.emojis.cache.find(emoji => emoji.name === emojiName)

    const emojis = {
        memeber: '[—Community Members—]'
        
    }

    const reactions = []

    let emojiText = ''
    for (const key in emojis) {
        const emoji = getEmoji(key)
        reactions.push(emoji)

        const role = emojis[key]
        emojiText += `${emoji} = ${role}\n`
    }


    firstMessage(client, channelId, emojiText, [])

}

            