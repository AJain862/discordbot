const path = require('path')

const fs = require('fs')


const Discord = require('discord.js')
const client = new Discord.Client()

const config = require('./config.json')
const command = require('./command')
const welcome = require('./welcome')
const roleClaim = require('./role-claim')
const { minArgs } = require('./commands/add')






client.on('ready', async () => {
  console.log('The client is ready!')

  

  const baseFile = 'command-base.js'
  const commandBase = require(`./commands/${baseFile}`)

  const readCommands = (dir) => {
    const files = fs.readdirSync(path.join(__dirname, dir))
    for (const file of files) {
      const stat = fs.lstatSync(path.join(__dirname, dir, file))
      if (stat.isDirectory()) {
        readCommands(path.join(dir, file))
      } else if (file !== baseFile) {
        const option = require(path.join(__dirname, dir, file))
        commandBase(client, option)
      }
    }
  }

  readCommands('commands')


  welcome(client)
  roleClaim(client)

  
  

  

  command(client, 'ban', message => {
      const { member, mentions } = message
      const tag = `<@${member.id}>`
      if(
          member.hasPermission('ADMINISTRATOR') || 
          member.hasPermission('BAN_MEMBERS')
          ) {
              const target = mentions.users.first()
              if (target) {
                  const targetMember = message.guild.members.cache.get(target.id)
                  targetMember.ban()
                  message.channel.send(`${tag} That user has been banned.`)

              } else {
                  message.channel.send(`${tag} Please specify someone to ban `)
              }

      }else {
          message.channel.send(`${tag} You do not have permission to use this command`)
      }
  })

  command(client, 'kick', message => {
    const { member, mentions } = message
    const tag = `<@${member.id}>`
    if(
        member.hasPermission('ADMINISTRATOR') || 
        member.hasPermission('KICK_MEMBERS')
        ) {
            const target = mentions.users.first()
            if (target) {
                const targetMember = message.guild.members.cache.get(target.id)
                targetMember.kick()
                message.channel.send(`${tag} That user has been kicked.`)

            } else {
                message.channel.send(`${tag} Please specify someone to kick `)
            }

    }else {
        message.channel.send(`${tag} You do not have permission to use this command`)
    }
})

  const { prefix } = config

  
  client.user.setPresence({
      activity: {
          name: `Use ${prefix}help`
      }
  })

  command(client, 'help', message => {
      message.channel.send(`
    These are my supported commands:

**a-help** - Displays the help menu
**a-serverinfo** - Diplays server info
**a-userinfo** - Displays user info
**a-servers** - Displays which servers I am in
**a-ping** - Displays your ping
**a-cc** - Bulk Deletes Messages
**a-kick** - Kicks specified user
**a-ban** - Bans specified user
**a-nitro** - GIVES YOU A NITRO
**a-youtube** - Gives you content to watch and subscribe to
       
      
      
      `)
  })

  command(client, ['help math'], (message) => {
      message.channel.send(`
      HIYA
      `)
  })

  command(client, ['serverinfo'], (message) => {
    const { guild } = message
    //console.log(guild)

    const { name, region, memberCount, owner } = guild
    const icon = guild.iconURL()

    const embed = new Discord.MessageEmbed()
        .setTitle(`Server Info for "${name}"`)
        .setThumbnail(icon)
        .addFields(
            {
                name: 'Members',
                value: memberCount,
            },
            {
                name: 'Owner',
                value: owner.user.tag,
            },
            {
                name: 'Region',
                value: region,
            },
            
        )

    message.channel.send(embed)
    
  })

  command(client, ['userinfo','whois'], (message) => {
    const { guild, channel } = message
    //console.log(guild)

    const user = message.mentions.users.first() || message.member.user
    const member = guild.members.cache.get(user.id)

    const embed = new Discord.MessageEmbed()
    .setAuthor(`User info for ${user.username}`, user.displayAvatarURL())
    .addFields(
      {
        name: 'User tag',
        value: user.tag,
      },
      {
        name: 'Is bot',
        value: user.bot,
      },
      {
        name: 'Nickname',
        value: member.nickname || 'None',
      },
      {
        name: 'Joined Server',
        value: new Date(member.joinedTimestamp).toLocaleDateString(),
      },
      {
        name: 'Joined Discord',
        value: new Date(user.createdTimestamp).toLocaleDateString(),
      },
      {
        name: 'Roles',
        value: member.roles.cache.size - 1,
      }
    )


    channel.send(embed)
    
  })

  command(client, ['ping', 'test'], (message) => {
    message.channel.send(`PONG! ${client.ws.ping}ms`)
  })

  command(client, 'servers', (message) => {
    client.guilds.cache.forEach((guild) => {
      message.channel.send(
        `${guild.name} has a total of ${guild.memberCount} members`
      )
    })
  })

  command(client, ['cc', 'clearchannel'], (message) => {
    const { member, mentions } = message
    
    const tag = `<@${member.id}>`
  
      
        if (message.member.hasPermission('ADMINISTRATOR')) {
            message.channel.messages.fetch().then((results) => {
              message.channel.bulkDelete(results)
            })
          }

       else {
          message.channel.send(`${tag} You do not have permission to use this command.`)
      }
    
  })

  command(client, 'nitro', (message) => {
      message.channel.send('https://discord.gift/dGgudJamz5CVAGwjZNDBCTTb')
  })
  command(client, 'youtube', (message) => {
    message.channel.send('EVERYONE SUB TO THESE CHANNEL RIGHT NOW https://www.youtube.com/channel/UCXRiJN3oM8m7f4VEQn2WXLQ https://www.youtube.com/channel/UC90Ag_otCdOUZfkqoQ202HA https://www.youtube.com/channel/UCespFobOYUasa9gBKYdvCbA https://www.youtube.com/channel/UCQvYT2WC9Ub7vvjV_-oOLwQ https://www.youtube.com/channel/UC49qUd_YFnpkx_-A7NVSKaA?view_as=subscriber')
})
   


  
})

const prefix = 'a-'
const cmember = '765356807895384072'

client.on('message', (message) => {
    let args = message.content.slice(prefix.length).trim().split(/ + /g);
    let cmd = args.shift().toLowerCase();
    if(cmd === 'lock') {
        if(!message.member.permissions.has('ADMINISTRATOR')) return;
        message.channel.createOverwrite(cmember, {
            SEND_MESSAGES: false
        }, `lock requested`);
    } 
})


client.on('message', (message) => {
    let args = message.content.slice(prefix.length).trim().split(/ + /g);
    let cmd = args.shift().toLowerCase();
    if(cmd === 'unlock') {
        if(!message.member.permissions.has('ADMINISTRATOR')) return;
        message.channel.send('Channel has been unlocked')
        message.channel.createOverwrite(cmember, {
            SEND_MESSAGES: true
            
        }, `unlock requested`);
    }
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

*/


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

























