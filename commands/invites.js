module.exports = {
    commands: 'invites',
    callback: (message) => {
        const { guild } = message

        guild.fetchInvites().then((invites) => {
            const inviteCounter = {}

            invites.forEach((invite) => {
                const { uses, inviter } = invite
                const { username, discriminator} = inviter

                console.log(uses, username, discriminator)
            })
        })
    }
}