exports.run = async (client, message, args) => {
    if (message.member.hasPermission("KICK_MEMBERS")) {
        const userKick = message.mentions.users.first()

        if (userKick) {
            var member = message.guild.member(userKick);

            if (member) {
                member.kick('you have been kicked for breaking the rules').then(() => {
                    message.reply(`kicked user ${userKick.tag}!`);
                }).catch(err => {
                    message.reply('I was not able to kick that user.')
                    console.log(err);
                })
            } else {
                message.reply('that user is not in the server.')
            }
        } else {
            message.reply('you need to state the person you want to kick.')
        }
    } else {
        message.reply('Hey you cannot use that.')
    }
}