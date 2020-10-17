const path = require('path')
const fs = require('fs')
const { Random } = require("something-random-on-discord")
const translate = require('@k3rn31p4nic/google-translate-api');

const Discord = require('discord.js')
const client = new Discord.Client({
    disableMentions: 'everyone'
})

const config = require('./config.json')
const command = require('./command')
const welcome = require('./welcome')
const roleClaim = require('./role-claim')
const bye = require('./bye')
const { minArgs } = require('./commands/add')
const { error } = require('console')
const { join } = require('path')
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
  bye(client)
  
  command(client, 'ban', message => {
    if(message.author.bot) return
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
    if(message.author.bot) return
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

\`a-help\` - Displays the help menu
\`a-serverinfo\` - Diplays server info
\`a-userinfo\` - Displays user info
\`a-servers\` - Displays which servers I am in
\`a-ping\` - Displays your ping
\`a-cc\` - Bulk Deletes Messages
\`a-kick\` - Kicks specified user
\`a-ban\` - Bans specified user
\`a-nitro\` - GIVES YOU A NITRO
\`a-youtube\` - Gives you content to watch and subscribe to
\`a-lock/unlock\` - Locks/Unlocks a channel
\`a-helpmath\` - Gives you math commands
\`a-created\` - Tells you when server was created.
\`say\` - Have the bot repeat what you say(Do not you prefix only say: say hi)
\`hi ark bot\` - Have a warm greeting from The Official ArK Bot(No Prefix)
\`a-mute/unmute\` - Mutes/Unmutes a member


       
      
      
      `)
  })

  command(client, ['helpmath'], (message) => {
      message.channel.send(`
      These are my supported math commands:

\`**a-add\` - Adds 2 numbers
\`a-sub\` - Subtracts 2 numbers
\`a-mul\` - Multiplies 2 numbers
\`a-div\` - Divides 2 numbers
      `)
  })

  command(client, ['serverinfo'], (message) => {
    const { guild } = message
    //console.log(guild)

    const { name, region, memberCount, owner, createdAt } = guild
    const icon = guild.iconURL()

    const embed = new Discord.MessageEmbed()
        .setTitle(`Server Info for "${name}"`)
        .setThumbnail(icon)
        .addFields(
            {
                name: 'Created At',
                value: createdAt,
            },
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
    const { guild, channel, data, client } = message
    //console.log(guild)
    
    

    const user = message.mentions.users.first() || message.member.user
    const member = guild.members.cache.get(user.id)

    const embed = new Discord.MessageEmbed()
    .setColor('RANDOM')
    .setAuthor(`User info for ${user.username}`, user.displayAvatarURL())
    .setThumbnail(message.member.user.displayAvatarURL())
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
    if(message.author.bot) return
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
    if(message.author.bot) return
      message.channel.send('https://discord.gift/dGgudJamz5CVAGwjZNDBCTTb')
  })
  command(client, 'youtube', (message) => {
    if(message.author.bot) return
    message.channel.send('EVERYONE SUB TO THESE CHANNEL RIGHT NOW https://www.youtube.com/channel/UCXRiJN3oM8m7f4VEQn2WXLQ https://www.youtube.com/channel/UC90Ag_otCdOUZfkqoQ202HA https://www.youtube.com/channel/UCespFobOYUasa9gBKYdvCbA https://www.youtube.com/channel/UCQvYT2WC9Ub7vvjV_-oOLwQ https://www.youtube.com/channel/UC49qUd_YFnpkx_-A7NVSKaA?view_as=subscriber')
})
   


  
})

const prefix = 'a-'
const cmember = '765356807895384072'

client.on('message', (message) => {
    let args = message.content.slice(prefix.length).trim().split(/ + /g);
    let cmd = args.shift().toLowerCase();
    if(cmd === 'lock') {
        if(message.author.bot) return
        if(!cmember) return message.reply(`Cannot find role:[--Community Member--]`)
        if(!message.member.permissions.has('ADMINISTRATOR')) return message.reply('You do not have permission to use this command.')
        message.channel.send('Channel has been locked')
        message.channel.createOverwrite(cmember, {
            SEND_MESSAGES: false
        }, `lock requested`);
    } 
})


client.on('message', (message) => {
    let args = message.content.slice(prefix.length).trim().split(/ + /g);
    let cmd = args.shift().toLowerCase();
    if(cmd === 'unlock') {
        if(message.author.bot) return
        if(!cmember) return message.reply(`Cannot find role:[--Community Member--]`)
        if(!message.member.permissions.has('ADMINISTRATOR')) return message.reply('You do not have permission to use this command.')
        message.channel.send('Channel has been unlocked')
        message.channel.createOverwrite(cmember, {
            SEND_MESSAGES: null
            
        }, `unlock requested`);
    }
    
})









client.on('message', (message) =>{
    let args = message.content.slice(prefix.length).split(" ");
    let cmd = args.shift().toLowerCase();
    if(cmd === 'mute') {
        if(message.author.bot) return
        if(!message.member.hasPermission(['BAN_MEMBERS'])) return message.reply('You do not have permission to use this command')
        const role = message.guild.roles.cache.find(role => role.name === 'Muted')
        if(role){
            const mention = message.mentions.members.first()
        if(mention){
            mention.roles.add(role)
            message.channel.send(`${mention}, has been muted.`)

        }
        else {
            message.reply('This user does not exist.')
        }

        }
        else {
            message.reply('Muted Role not found.')
        }
        
        

    }

})

client.on('message', (message) =>{
    let args = message.content.slice(prefix.length).split(" ");
    let cmd = args.shift().toLowerCase();
    if(cmd === 'unmute') {
        if(message.author.bot) return
        if(!message.member.hasPermission(['BAN_MEMBERS'])) return message.reply('You do not have permission to use this command')
        const role = message.guild.roles.cache.find(role => role.name === 'Muted')
        if(role){
            const mention = message.mentions.members.first()
        if(mention){
            mention.roles.remove(role)
            message.channel.send(`${mention}, has been unmuted.`)

        } else {
            message.reply('This user does not exist.')
        }

        }
        else{
            message.reply('Muted Role not found')
        }
        
        

    }

})
client.on('message', (message) => {
    
    let args = message.content.slice(prefix.length).split(" ");
    let cmd = args.shift().toLowerCase();
    if(cmd === 'slow') {
        if(message.author.bot) return
        const { channel } = message
        
        if(!message.member.hasPermission('ADMINISTRATOR')) return message.reply('You do not have permission to use this command.')
        let duration = args
       
        if(isNaN(duration)) {
            message.reply('Please provide a number of seconds, or 0 to turn it off.')
            return
        }
        channel.setRateLimitPerUser(parseInt(duration))
        message.reply(`The slowmode for this channel has been set to ${duration}`)
    }
})
client.on("message", async message => {
    if (message.content === "a-meme") {
        if(message.author.bot) return
      const random = new Random();
          let data = await random.getMeme()
      message.channel.send(data)
    }
  });

  client.on("message", async message => {
    if (message.content === "a-joke") {
        if(message.author.bot) return
      const random = new Random();
          let data = await random.getJoke()
      message.channel.send(data)
    }
  });
client.on('message', async message => {
    
    const { MessageEmbed } = require('discord.js');
    let args = message.content.slice(prefix.length).split(" ");
    let cmd = args.shift().toLowerCase();
    if(cmd === 'translate') {
        if(message.author.bot) return
        try {
            if (args.length < 2) {
              return message.reply("Command Usage: `translate <Language> <Text>`")
            }
      
            const result = await translate(args.slice(1).join(' '), { to: args[0] });
      
            const embed = new MessageEmbed()
              .setColor('#68b64a')
              .setDescription(result.text)
              .setFooter(`Translation from ${result.from.language.iso.toUpperCase()} to ${args[0].toUpperCase()}`);
            message.channel.send({ embed });
          } catch (err) {
            return message.reply(`Oh no, an error occurred: \`${err.message}\`.`);
          }
        }
})
client.on('message', message => {
    if(message.content.toLowerCase() === 'hi ark bot') {
        let person = message.author.username
        message.channel.send(`hi ${person}`)
        
    } else{
        return
    }
})
client.on('message', message => {
    let bob = 'im '
    let joe = message.content.slice(bob.length)
    
    
    if(message.content.startsWith('im ')) {
        
        message.channel.send(`hi ${joe}, im the official ArK bot `)
    } else {
        return
    }
})
client.on('message', message => {
    let pre = 'say '
    let cont = message.content.slice(pre.length)
    if(message.content.startsWith('say ')) {
        message.channel.send(`${cont}\n\n **-${message.member.user.tag}**`)
    }

})
client.on('message', message => {
    let args = message.content.slice(prefix.length).split(" ");
    let cmd = args.shift().toLowerCase();
    if(cmd === 'created') {
        message.channel.send(`${message.guild.name} was created on ${message.channel.createdAt}`)

    } else {
        return
    }
        

})
client.on('message', message => {
    let args = message.content.slice(prefix.length).split(" ");
    let cmd = args.shift().toLowerCase();
    if(cmd === 'invite') {
        if(message.author.bot) return 
        message.channel.send('https://discord.com/oauth2/authorize?client_id=761283809144471552&scope=bot&permissions=2146958847')
    }
})

 


/*client.on('message', (message) => {
    const { mentions, member } = message
    let args = message.content.slice(prefix.length).trim().split(/ + /g);
    let cmd = args.shift().toLowerCase();
    if(cmd === 'mut') {
        if(!message.member.hasPermission(['BAN_MEMBERS', "MANAGE_MESSAGES"])){
            message.channel.send('You dont have permission to use that command.')
        }
        else {
            const memberId = mentions.users.first()
            console.log(memberId)
            
            if(memberId) {
                
                

                

                
                
                 
                //const mutedRole = message.guild.roles.cache.get('765356807928414233');
                
                    
                    //if(mutedRole) {
                       // member.roles.add(mutedRole)
                        //message.channel.send(`That user was muted.`)
                    //}
                    //else {
                        //message.channel.send('Muted Role not found')
                    //}
                
            }
            else {
                message.channel.send('Please specify someone to ban');
            }
        }
    }
})*/



/*client.on('message', (message) => {
    let args = message.content.slice(prefix.length).trim().split(/ + /g);
    let cmd = args.shift().toLowerCase();
    if(cmd === 'warn') {
    async function f() {
        if(!message.member.hasPermission("ADMINISTRATOR"))return message.reply('You cannot usse this command!')
        
        var user = message.mentions.users.first();

        if(!user) return message.reply('You did not mention anyone!');

        var member;

        try {
            member = await message.guild.members.fetch(user);


        }catch(err) {
            member = null
        }

        if(!member) return message.reply('This person is not in the server!')

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

        try{
            user.send(embed)

        }catch(err) {
            console.warn(err)
        }
        message.channel.send(`**${user}** has been warned by **${message.author}**`)

    }
}
})*/

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

























