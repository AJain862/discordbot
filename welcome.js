const Discord = require('discord.js')
const mongo = require('./mongo')
const welcomeSchema = require('./schemas/welcome-schema')
const command = require('./command')
const { DiscordAPIError, User } = require("discord.js")


module.exports = (client) => {
    command(client, 'setwelcome', async (message) => {
        const { member, channel, content, guild } = message
        
        if (!member.hasPermission('ADMINISTRATOR')) return channel.send('You do not have permission to use this command.')
        let text = content
        const split = text.split(' ')

        if(split.length < 2) {
            channel.send('Please provide a welcome message')
            return
        }

        split.shift()

        text = split.join(' ')

        await mongo().then(async(mongoose) => {
            try{
                await new welcomeSchema({
                    _id: guild.id,
                    channelId: channel.id,
                    text: text,
                }).save()


            }
            finally {
                mongoose.connection.close()

            }
        })



    })
}






















/*module.exports = client => {
    const channelId = '765356808172208154'
    const targetChannelId = '765356808172208152'




    client.on('guildMemberAdd', (Joinedmember) => {
        const joinEmbed = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setThumbnail(Joinedmember.user.displayAvatarURL())
            .setTitle(`${Joinedmember.user.tag}`)
            .setDescription('Hello! Welcome To ArK ZR clan. Have Fun!');






        const message = `Welcome, <@${Joinedmember.id}> to [ArK] Attackerz ZR!!! We hope you have a wonderful time here make sure to read the ${Joinedmember.guild.channels.cache.get(targetChannelId).toString()} and have fun!!!`


        const channel = Joinedmember.guild.channels.cache.get(channelId)
        channel.send(message)
        channel.send(joinEmbed)




    })

}*/