const Discord = require('discord.js')

module.exports = client => {
    const channelId = '751080642640609401'
    const targetChannelId = '732716744736505977'
    
    
    
    client.on('guildMemberRemove', (Joinedmember) => {
        const joinEmbed = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setThumbnail(Joinedmember.user.displayAvatarURL())
            .setTitle(`${Joinedmember.user.tag}`)
            .setDescription('Bye, Have a great time still. Hope you come back :slight_smile:');

        
        
        
        

        const message = `<@${Joinedmember.id}> left the Server`
        
        
        const channel = Joinedmember.guild.channels.cache.get(channelId)
        
        

    })

}