exports.run = async (client, message, args) => {
    const help = new Discord.MessageEmbed()
        .setColor(0x6509ed)
        .setTitle('Help Requested')
        .setDescription('testing...')
        .setAuthor(message.author.username)
        .setDescription('Help is on its way.')
        .setTimestamp()
        .addField('this embed works i guess')
        .setFooter('i hope this helped you')




    try {
        message.author.send(help);
    } catch {
        message.reply(`Sorry @${message.author.username} I cannot do this. Make sure your dm's are public.`);
    }
}