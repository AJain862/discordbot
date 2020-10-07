const Discord = require('discord.js');

const client = new Discord.Client();



const ms = require('ms');


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
    
})

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




client.on('message', async(message) => {

    if(message.author.bot) return;
    if(!message.guild) return;

    var prefix = 'a-';
    if(!message.content.toLowerCase().startsWith(prefix)) return;

    var args = message.content.split(" ");
    var cmd = args.shift().slice(prefix.length).toLowerCase();
    try {
        var file = require(`./commands/${cmd}.js`);
        file.run(client, message, args);
    } catch(err) {
        console.warn(err);
    }

    


    if (command === 'ping') {
        message.channel.send(`PONG! ${client.ws.ping}ms`);
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
        
        
        
        
        
        
        
        
        
        /*else
        if (command === 'mute') {
            
            let person = message.guild.member(message.mentions.users.first() || message.guild.member.arguments[1])
            if(!person) return message.reply('Could not find that user');

            let mainrole = message.guild.roles.find(role => role.name === "guest" );
            let muterole = message.guild.roles.find(role => role.name === "Muted" );

            if(!muterole) return message.reply('could not find the mute role');

            let time = args[2];

            if(!time){
                return message.reply('you did not give a time, plz give one k?');
                
            }
            person.removeRole(mainrole.id);
            person.addRole(muterole.id);

            message.channel.send(`@${person.user.tag} has now been muted for ${ms(ms(time))}`);








            
        }*/
        
        
        
        
        
        //else
        /*if(command === 'mute'){
            if (message.member.hasPermission('MUTE_MEMBERS')){

                let person = message.guild.member(message.mentions.users.first() || message.guild.members.args[1])

                if(!person) return message.reply('could not find that user.');

                let mainrole = message.guild.roles.fetch(role => role.name === 'guest')
                let muterole = message.guild.roles.fetch(role => role.name === 'Muted')
                let time = args[1];

                if (mainrole) {
                    message.
                }else
                if(!time){
                    return message.reply('plz enter a time to mute the user for.');

                }
                person.permissions.remove.role(mainrole.id);
                person.permissions.add.role(muterole.id);
                message.channel.send(`@${person.user.username} has been muted for ${ms(ms(time))}`);
                setTimeout(function () {
                    person.permissions.add.role(mainrole.id);
                    person.permissions.remove.role(muterole.id);
                    message.channel.send(`@${person.user.username} has been unmuted.`)
                }, ms(time));

                
                

                

            } else {
                message.reply('you don\'t have permession to use this command.')
            }
        }*/


})

client.login(process.env.token);

























