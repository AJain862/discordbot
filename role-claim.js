const firstMessage = require('./first-message')
module.exports = (client) => {
    const channelId = '750032729512476682'

    const getEmoji = (emojiName) => client.emojis.cache.find(emoji => emoji.name === emojiName)

    const emojis = {
        uno: 'Guest'
        
    }

    const reactions = []

    let emojiText = 'pls add a reaction to claim a role'
    for (const key in emojis) {
        const emoji = getEmoji(key)
        reactions.push(emoji)

        const role = emojis[key]
        emojiText += `${emoji} = ${role}\n`
    }


    firstMessage(client, channelId, emojiText, reactions )

}

            