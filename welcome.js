const { DiscordAPIError, User } = require("discord.js")


module.exports = client => {
    const channelId = '765356808172208154'
    const targetChannelId = '765356808172208152'
    
    
    
    
    client.on('guildMemberAdd', (member) => {
        let avatar = member.displayAvatarURL()
        const embed = new Discord.MessageEmbed()
            .setThumbnail(avatar)

        
        
        
        

        const message = `Please welcome <@${member.id}> to the server! Please check ${member.guild.channels.cache.get(targetChannelId).toString()}`
        
        
        const channel = member.guild.channels.cache.get(channelId)
        channel.send(message)
        channel.send(embed)
        

    })

}