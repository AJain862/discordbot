module.exports = {
    commands: 'invites',
    callback: (message) => {
        const { guild } = message

        guild.fetchInvites().then((invites) => {
            const inviteCounter = {}

            invites.forEach((invite) => {
                const { uses, inviter } = invite
                const { username, discriminator} = inviter

                const name = `${username}#${discriminator}`

                inviteCounter[name] = (invite[name] || 0) + uses

            })

            let replyText = 'Invites:'

            const sortedInvites = Object.keys().sort((a, b) => inviteCounter[b] - inviteCounter[a])

            for (const invite of sortedInvites) {
                const count = inviteCounter[invite]
                replyText += `\n${invite} has invited ${count} member(s)!`
            }

            message.reply(replyText)
        })
    }
}