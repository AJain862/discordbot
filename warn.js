var Discord = require('discord.js')

module.exports =  (member), async (client, message, args) => {
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply('You cannot usse this command!')

    var user = message.mentions.users.first();

    if (!user) return message.reply('You did not mention anyone!');

    var member;

    try {
        member = await message.guild.members.fetch(user);


    } catch (err) {
        member = null
    }

    if (!member) return message.reply('This person is not in the server!')

    var reason = args.splice(1).join(' ');

    var channel = message.guild.channels.cache.find(c => c.name === 'general')

    var log = new Discord.MessageEmbed()
        .setTitle('User Warned')
        .addField('User:', user, true)
        .addField('By:', message.author, user)
        .addField('Reason:', reason)
    channel.send(log);

    var embed = new Discord.MessageEmbed()
        .setTitle('You were warned!')
        .setDescription(reason)

    try {
        user.send(embed)

    } catch (err) {
        console.warn(err)
    }
    message.channel.send(`**${user}** has been warned by **${message.author}**`)

}