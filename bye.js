module.exports = client => {
    const channelId = '765356808172208154'
    const targetChannelId = '765356808172208152'
    
    
    
    client.on('guildMemberRemove', (member) => {

        
        
        
        

        const message = `Bye-Bye <@${member.id}>. Hope you come back soon! :)`
        
        
        const channel = member.guild.channels.cache.get(channelId)
        channel.send(message)
        

    })

}