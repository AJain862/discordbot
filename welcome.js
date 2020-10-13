const { DiscordAPIError } = require("discord.js")

module.exports = client => {
    const channelId = '765356808172208154'
    const targetChannelId = '765356808172208152'
    const avatar = message.author.avatarURL()
    
    
    client.on('guildMemberAdd', (member) => {

        member.send({embed: { 

        color: "RANDOM",
        description: 'Welcome to the server',
        title: `${member.id}`,
        thumbnail: avatar
        

             }})
        
        

        const message = `Please welcome <@${member.id}> to the server! Please check ${member.guild.channels.cache.get(targetChannelId).toString()}`
        
        
        const channel = member.guild.channels.cache.get(channelId)
        channel.send(message)
        

    })

}