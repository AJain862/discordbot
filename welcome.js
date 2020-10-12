module.exports = client => {
    const channelId = '765280692455211013'
    const targetChannelId = '765280692455211011'
    client.on('guildMemberAdd', (member) => {

        const message = `Please welcome <@${member.id}> to the server! Please check ${member.guild.channels.cache.get(targetChannelId).toString()}`

        const channel = member.guild.channels.cache.get(channelId)
        channel.send(message)

    })

}