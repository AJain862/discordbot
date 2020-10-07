const Discord = require('discord.js');

const client = new Discord.Client({
    disableMentions: 'everyone'
})


const prefix = 'a-';

/*const fs = require('fs');
const { send } = require('process');

client.commands = new Discord.Collection();

const commandfiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for (const file of commandfiles) {
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command)
}*/

client.on('ready', () => {
    console.log('The Official ArK Bot is online!');
    client.user.setActivity('a-help', { type: "PLAYING"})
        .then(presence => console.log(`Activity set to ${presence.activities[0].name}`))
        .catch(console.error);
   
});

/*client.on('message', async (msg) => {
    if (msg.content === 'a-lock') {
        if (!msg.member.hasPermission("ADMINISTRATOR")) return msg.channel.send('Sorry, you do not have permissiont to use this command!')
        if (!msg.guild.me.hasPermission('ADMINISTRATOR')) return msg.channel.send('Please give me admin perms.')
        await msg.channel.send(`We are Locking ${msg.channel.id} channels! It will take 1 second per channel`)
        
        msg.guild.channe(async (c) => {
           
            await c.createOverwrite(msg.guild.channels.id, {
                SEND_MESSAGES: false
            })
            await msg.edit(`locked all channels in your guild (${msg.guild.channels.cache.size} channels!)`)

        })


    }
    if (msg.content === 'a-unlock') {
        if (!msg.member.hasPermission('ADMINISTRATOR')) return msg.channel.send('Sorry, you do not have permission to use this command.')
        if (!msg.guild.me.hasPermission('ADMINISTRATOR')) return msg.channel.send('Please give me admin perms.')
        await msg.channel.send(`Unlocking all channels in your guild!(${msg.guild.channels.cache.size} channels) it will take 1 second per channel.`)
        msg.guild.channels.cache.forEach(async (c) => {
            
            await c.createOverwrite(msg.guild.id, {
                SEND_MESSAGES: true
            })
            await msg.edit(`Unlocked all channels is your guild! (${msg.guild.channels.cache.size} channels!)`)
        })
    }

})*/




client.on('guildMemberAdd', member => {
    const welcomeChannel = member.guild.channels.cache.find(ch => ch.name.includes('welcome-leave'));
    const welcomeText = `Welcome <@${member.user.id}> to ${member.guild.name} enjoy your stay!`

    if (!welcomeChannel) {
        console.log('could not find welcome channel, so I am making one');
        member.guild.channels.create('welcome', {
            type: 'test',
            position: 0,
            topic: 'Welcome Channel for New Users',
            permissionOverwrites: [{
                id: member.guild.id,
                allow: ['READ_MESSAGE_HISTORY', 'READ_MESSAGES', 'VIEW_CHANNEL'],
                deny: ['SEND_MESSAGES']
            }]

        }).then(console.log('welcome channel created')).catch(console.error);
    }

    Promise.resolve(welcomeText).then(function (welcomeText) {
        welcomeChannel.send(welcomeText);
    })
})




client.on('message', message => {




    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/g);
    const command = args.shift().toLocaleLowerCase();


    if (command === 'ping') {
        message.channel.send('PONG!');
    }
    else if (command == 'youtube') {
        message.channel.send('EVERYONE SUB TO THESE CHANNEL RIGHT NOW https://www.youtube.com/channel/UC90Ag_otCdOUZfkqoQ202HA https://www.youtube.com/channel/UCespFobOYUasa9gBKYdvCbA https://www.youtube.com/channel/UCQvYT2WC9Ub7vvjV_-oOLwQ https://www.youtube.com/channel/UCDpMIB8DvcPxSprCpWxlhbw');

    }

    else if (command == 'nitro') {
        message.channel.send('https://discord.gift/dGgudJamz5CVAGwjZNDBCTTb');
    }

    else if (command == 'nitroclassic') {
        message.channel.send('https://discord.gift/bRJCprbeXrsXbA96')
    }
    else if (command == 'help') {
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

    } else
        if (command === 'ban') {
            if (message.member.hasPermission("BAN_MEMBERS")) {
                const userBan = message.mentions.users.first();

                if (userBan) {
                    var member = message.guild.member(userBan);

                    if (member) {
                        member.ban({
                            reason: 'you broke the rules.'
                        }).then(() => {
                            message.reply(`${userBan.tag} was banned from the server.`)

                        })
                    } else {
                        message.reply('that user is not in the server.');

                    }
                } else {
                    message.reply('you need to state a user to ban.')
                }
            } else {
                message.reply('Hey you cannot use that.')
            }




        }
        else if (command == 'kick') {
            if (message.member.hasPermission("KICK_MEMBERS")) {
                const userKick = message.mentions.users.first()

                if (userKick) {
                    var member = message.guild.member(userKick);

                    if (member) {
                        member.kick('you have been kicked for breaking the rules').then(() => {
                            message.reply(`kicked user ${userKick.tag}!`);
                        }).catch(err => {
                            message.reply('I was not able to kick that user.')
                            console.log(err);
                        })
                    } else {
                        message.reply('that user is not in the server.')
                    }
                } else {
                    message.reply('you need to state the person you want to kick.')
                }
            } else {
                message.reply('Hey you cannot use that.')
            }
        }


})

client.login(process.env.token);

























