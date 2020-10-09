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

            for (const invite in inviteCounter) {
                const count = inviteCounter[invite]
                replyText += `\n${invite} has invited ${count} member(s)!`
            }

            message.reply(replyText)
        })
    }
}