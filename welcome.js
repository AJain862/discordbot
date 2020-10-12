module.exports = client => {
    const channelId = '765259740590374927'
    const targetChannelId = '765259740590374925'
    client.on('guildMemberAdd', (member) => {

        const message = `Please welcome <@${member.id}> to the server! Please check ${member.guild.channels.cache.get(targetChannelId).toString()}`

        const channel = member.guild.channels.cache.get(channelId)
        channel.send(message)

    })

}