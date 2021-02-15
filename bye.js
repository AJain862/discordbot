const Discord = require('discord.js')

module.exports = client => {
    const channelId = '751080642640609401'
    
    
    client.on('guildMemberRemove', (Joinedmember) => {
    const { guild }= Joinedmember

        const joinEmbed = new Discord.MessageEmbed()
            .setColor('#f5f542')
            .setThumbnail(Joinedmember.user.displayAvatarURL())
            .setTitle(`${Joinedmember.user.tag}`)
            .setDescription('Bye, Have a great time still. Hope you come back :slight_smile:');

        
        
        
        

        const message = `<@${Joinedmember.id}> left the Server. ArK now has ${guild.memberCount} members.`
        
        
        const channel = Joinedmember.guild.channels.cache.get(channelId)
        channel.send(message)
        channel.send(joinEmbed)
        

    })

}