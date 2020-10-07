const Discord = require('discord.js')
const client = new Discord.Client()

const config = require('./config.json')
const command = require('./command')

client.on('ready', () => {
  console.log('The client is ready!')

  command(client, ['ping', 'test'], (message) => {
    message.channel.send(`PONG! ${client.ws.ping}`)
  })

  command(client, 'servers', (message) => {
    client.guilds.cache.forEach((guild) => {
      message.channel.send(
        `${guild.name} has a total of ${guild.memberCount} members`
      )
    })
  })

  command(client, ['cc', 'clearchannel'], (message) => {
    if (message.member.hasPermission('ADMINISTRATOR')) {
      message.channel.messages.fetch().then((results) => {
        message.channel.bulkDelete(results)
      })
    }
  })

  command(client, 'status', (message) => {
    const content = message.content.replace('status ', '')
    // "!status hello world" -> "hello world"

    client.user.setPresence({
      activity: {
        name: content,
        type: 0,
      },
    })
  })
})

client.login(process.env.token);




















































/*const Discord = require('discord.js');

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

/*client.on('ready', () => {
    console.log('The Official ArK Bot is online!');
    client.user.setActivity('a-help', { type: "PLAYING" })
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


/*command(client, 'servers', message => {
    message.channel.send
})

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




client.on('message', async (message) => {

    if (message.author.bot) return;
    if (!message.guild) return;

    var prefix = 'a-';
    if (!message.content.toLowerCase().startsWith(prefix)) return;

    var args = message.content.split(" ");
    var cmd = args.shift().slice(prefix.length).toLowerCase();
    try {
        var file = require(`./commands/${cmd}.js`);
        file.run(client, message, args);
    } catch (err) {
        console.warn(err);
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






    /*if(command === 'mute'){
        if (message.member.hasPermission('MUTE_MEMBERS')){

            let person = message.guild.member(message.mentions.users.first() || message.guild.members.args[1])

            if(!person) return message.reply('could not find that user.');

            let mainrole = message.guild.roles.cache.find(role => role.name === 'guest')
            let muterole = message.guild.roles.cache.find(role => role.name === 'Muted')
            let time = args[1];
        

            if (mainrole) {
                message.
            } else
            if(!time){
                return message.reply('plz enter a time to mute the user for.');

            }
            person.(mainrole.id);
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


//})

//client.login(process.env.token);

























