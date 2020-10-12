module.exports = client => {
    const channelId = '765289064772927493'
    const targetChannelId = '765289064772927490'
    client.on('guildMemberAdd', (member) => {

        const message = `Please welcome <@${member.id}> to the server! Please check ${member.guild.channels.cache.get(targetChannelId).toString()}`

        const channel = member.guild.channels.cache.get(channelId)
        channel.send(message)

    })

}