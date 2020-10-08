module.exports = client => {
    const channelId = '749999326805098576'
    const targetChannelId = '749998454817816666'
    client.on('guildMemberAdd', (member) => {

        const message = `Please welcome <@${member.id}> to the server! Please check ${member.guild.channels.cache.get(targetChannelId).toString()}`

        const channel = member.guild.channels.get(channelId)
        channel.send(message)

    })

}