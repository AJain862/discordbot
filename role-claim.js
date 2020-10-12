const add = require('./commands/add')
const firstMessage = require('./first-message')
module.exports = (client) => {
    const channelId = '765356808172208152'

    const getEmoji = (emojiName) => client.emojis.cache.find(emoji => emoji.name === emojiName)

    const emojis = {
        ark: '[—Community Members—]'
        
    }

    const reactions = []

    let emojiText = 'pls add a reaction to claim a role\n\n'
    for (const key in emojis) {
        const emoji = getEmoji(key)
        reactions.push(emoji)

        const role = emojis[key]
        emojiText += `${emoji} = ${role}\n`
    }


    firstMessage(client, channelId, emojiText, reactions )

    const handleReaction = (reaction,user,add) => {
        if (user.id === '761283809144471552') {
            return
        }
        const emoji = reaction._emoji.name

        const { guild } = reaction.message

        const roleName = emojis[emoji]
        if(!roleName) {
            return
        }

        const role = guild.roles.cache.find(role => role.name === roleName)
        const member = guild .members.cache.find((member) => member.id === user.id)

        if (add) {
            member.roles.add(role)
        }
        else {
            member.roles.remove(role)
        }

    }

    client.on('messageReactionAdd', (reaction, user) => {
        if(reaction.message.channel.id === channelId) {
            handleReaction(reaction, user, true)
        }

    })

    client.on('messageReactionRemove', (reaction, user) => {
        if(reaction.message.channel.id === channelId) {
            handleReaction(reaction, user, false)
        }
    })

}

            