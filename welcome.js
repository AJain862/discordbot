const Discord = require('discord.js')
const mongo = require('./mongo')
const welcomeSchema = require('./schemas/welcome-schema')
const command = require('./command')
const { DiscordAPIError, User } = require("discord.js")


module.exports = (client) => {

    const cache = {}
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

        cache[guild.id] = [channel.id, text]

        await mongo().then(async(mongoose) => {
            try{
                await welcomeSchema.findOneAndUpdate({
                    _id: guild.id
                }, {

                    _id: guild.id,
                    channelId: channel.id,
                    text: text,
                
                }, {
                    upsert: true,
                })


            }
            finally {
                mongoose.connection.close()

            }
        })



    })
    const onJoin = async member => {
        const { guild } = member

        let data = cache[guild.id]

        if(!data) {
            console.log('FETCHING FROM DATABASE')
            await mongo().then(async (mongoose) => {
                try {
                    const result = await welcomeSchema.findOne({
                        _id: guild.id,

                    })
                    cache[guild.id] = data = [result.channelId, result.text]
                }
                finally {
                    mongoose.connection.close()
                }
            })
        }

        const joinEmbed = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setThumbnail(Joinedmember.user.displayAvatarURL())
            .setTitle(`${Joinedmember.user.tag}`)
            .setDescription('Hello! Welcome To ArK ZR clan. Have Fun!');
        const channelId = data[0]
        const text = data[1]      
        const channel = guild.channels.cache.get(data[0])
        channel.send(text.replace(/<@>/g, `<@${member.id}>`))
        channel.send(joinEmbed)


    }

    command(client, 'simjoin', message=> {
        onJoin(message.member)
    })

    client.on('guildMemberAdd', member => {
        onJoin(member)
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