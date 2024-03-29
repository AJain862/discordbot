const Discord = require('discord.js')
const client = new Discord.Client({
    disableMentions: 'everyone'
}).setMaxListeners(1000000000)
const mongo = require('./mongo')

const path = require('path')
const level = require('./levels')
const fs = require('fs')
const ms = require('ms')
const config = require('./config.json')
client.config = config;
const { Random } = require("something-random-on-discord")
const translate = require('@k3rn31p4nic/google-translate-api');
const { GiveawaysManager } = require('discord-giveaways')




client.giveawaysManager = new GiveawaysManager(client, {
    storage: "./giveaways.json",
    updateCountdownEvery: 5000,
    default: {
        botsCanWin: false,
        exemptPermissions: ['MANAGE_MESSAGES', 'ADMINISTRATOR'],
        embedColor: 'RANDOM',
        reaction: '🎉'
    }
});

const command = require('./command')
const welcome = require('./welcome')

const bye = require('./bye')
const { minArgs } = require('./commands/math/add')
const { error } = require('console')
const { join } = require('path')

client.on('ready', async () => {
    console.log('The client is ready!')
    const { prefix } = config
    client.user.setPresence({
        status: 'dnd',
        activity: {

            type: 'PLAYING',
            name: `Use ${prefix}help`,
        },


    })
    await mongo().then(mongoose => {
        try {
            console.log('Connected to mongo!')

        }

        finally {
            mongoose.connection.close

        }

    })
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

    bye(client)
    



    /*command(client, 'ban', message => {
      if(message.author.bot) return
        const { member, mentions, guild } = message
        const tag = `<@${member.id}>`
        if(
            member.hasPermission('ADMINISTRATOR') || 
            member.hasPermission('BAN_MEMBERS')
            ) {
                const target = mentions.users.first() 
                const target1 =  
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
    })*/

    command(client, 'kick', message => {
        if (message.author.bot) return
        if (message.channel.type === 'dm') return
        const { member, mentions } = message
        const tag = `<@${member.id}>`
        if (
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

        } else {
            message.channel.send(`${tag} You do not have permission to use this command`)
        }
    })







    command(client, 'help', message => {
        message.channel.send(`
    These are my supported commands:

\`a-help\` - Displays the help menu
\`a-serverinfo\` - Diplays server info
\`a-userinfo\` - Displays user info
\`a-members\` - Displays how many members are in the server
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
\`a-currency\` - Shows currency commands
\`a-giveaway\` - Starts a giveaway
\`a-translate\` - Translates language
\`a-slow\` - Changes the slowmode for a channel
\`a-meme\` - Shows you a meme
\`a-joke\` - Makes you laugh with a funny joke
\`a-ark\` - THERE IS NO NEED TO TELL! YOU PROBABLY ALREADY KNOW!!! 


       
      
      
      `)
    })

    command(client, ['helpmath'], (message) => {
        message.channel.send(`
      These are my supported math commands:

\`a-add\` - Adds 2 numbers
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

    command(client, ['userinfo', 'whois'], (message) => {
        const { guild, channel, data, client } = message
        //console.log(guild)



        const user = message.mentions.users.first() || message.member.user
        const member = guild.members.cache.get(user.id)

        const embed = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setAuthor(`User info for ${user.username}`, user.displayAvatarURL())
            .setThumbnail(user.displayAvatarURL())
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

    command(client, 'members', (message) => {
        const { guild } = message
        message.channel.send(
            `${guild.name} has a total of ${guild.memberCount} members`
        )

    })

    command(client, ['cc', 'clearchannel'], (message) => {
        const { member, mentions } = message
        if (message.author.bot) return
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
        if (message.author.bot) return
        message.channel.send('https://discord.gift/A6rq9qvcN3TnF4qK')
    })
    command(client, 'youtube', (message) => {
        if (message.author.bot) return
        message.channel.send('EVERYONE SUB TO THESE CHANNEL RIGHT NOW https://www.youtube.com/channel/UCXRiJN3oM8m7f4VEQn2WXLQ https://www.youtube.com/channel/UC1GX5r4-u-Y-h1OiRzJ9kGw/featured https://www.youtube.com/channel/UCQvYT2WC9Ub7vvjV_-oOLwQ https://www.youtube.com/channel/UCewIrSr1iCXjquPLG3CwnYQ https://www.youtube.com/channel/UCDlz86XkvbtvMYRiafzoxfQ')
    })




})

const prefix = 'a-'



client.on('message', (message) => {
    const cmember = message.guild.roles.cache.find(role => role.name === '[—Community Members—]')
    let args = message.content.slice(prefix.length).trim().split(/ + /g);
    let cmd = args.shift().toLowerCase();
    if (cmd === 'lock') {
        if (message.author.bot) return
        if (!cmember) return message.reply(`Cannot find role:[-Community Member-]`)
        if (!message.member.permissions.has('MANAGE_ROLES')) return message.reply('You do not have permission to use this command.')
        message.channel.send('Channel has been locked')
        message.channel.createOverwrite(cmember, {
            SEND_MESSAGES: false,

        }, `lock requested`);
    }
})


client.on('message', (message) => {
    const cmember = message.guild.roles.cache.find(role => role.name === '[—Community Members—]')
    let args = message.content.slice(prefix.length).trim().split(/ + /g);
    let cmd = args.shift().toLowerCase();
    if (cmd === 'unlock') {
        if (message.author.bot) return
        if (!cmember) return message.reply(`Cannot find role:[--Community Member--]`)
        if (!message.member.permissions.has('MANAGE_ROLES')) return message.reply('You do not have permission to use this command.')
        message.channel.send('Channel has been unlocked')
        message.channel.createOverwrite(cmember, {
            SEND_MESSAGES: null,


        }, `unlock requested`);
    }

})









client.on('message', (message) => {
    let args = message.content.slice(prefix.length).split(" ");
    let cmd = args.shift().toLowerCase();
    if (cmd === 'mute') {
        if (message.author.bot) return
        if (!message.member.hasPermission(['MANAGE_ROLES'])) return message.reply('You do not have permission to use this command')
        const role = message.guild.roles.cache.find(role => role.name === 'Muted')
        if (role) {
            const mention = message.mentions.members.first()
            if (mention) {
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

client.on('message', (message) => {
    let args = message.content.slice(prefix.length).split(" ");
    let cmd = args.shift().toLowerCase();
    if (cmd === 'unmute') {
        if (message.author.bot) return
        if (!message.member.hasPermission(['MANAGE_ROLES'])) return message.reply('You do not have permission to use this command')
        const role = message.guild.roles.cache.find(role => role.name === 'Muted')
        if (role) {
            const mention = message.mentions.members.first()
            if (mention) {
                mention.roles.remove(role)
                message.channel.send(`${mention}, has been unmuted.`)

            } else {
                message.reply('This user does not exist.')
            }

        }
        else {
            message.reply('Muted Role not found')
        }



    }

})
client.on('message', (message) => {

    let args = message.content.slice(prefix.length).split(" ");
    let cmd = args.shift().toLowerCase();
    if (cmd === 'slow') {
        if (message.author.bot) return
        const { channel } = message

        if (!message.member.hasPermission('ADMINISTRATOR')) return message.reply('You do not have permission to use this command.')
        let duration = args

        if (isNaN(duration)) {
            message.reply('Please provide a number of seconds, or 0 to turn it off.')
            return
        }
        channel.setRateLimitPerUser(parseInt(duration))
        message.reply(`The slowmode for this channel has been set to ${duration}`)
    }
})
client.on("message", async message => {
    if (message.content === "a-meme") {
        if (message.author.bot) return
        const random = new Random();
        let data = await random.getMeme()
        message.channel.send(data)
    }
});

client.on("message", async message => {
    if (message.content === "a-joke") {
        if (message.author.bot) return
        const random = new Random();
        let data = await random.getJoke()
        message.channel.send(data)
    }
});
client.on('message', async message => {

    const { MessageEmbed } = require('discord.js');
    let args = message.content.slice(prefix.length).split(" ");
    let cmd = args.shift().toLowerCase();
    if (cmd === 'translate') {
        if (message.author.bot) return
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
    if (message.content.toLowerCase() === 'hi ark bot') {
        let person = message.author.username
        message.channel.send(`hi ${person}`)

    } else {
        return
    }
})
client.on('message', message => {
    if(message.author.bot) return
    let bob = 'im '
    let joe = message.content.slice(bob.length)


    if (message.content.startsWith('im ')) {

        message.channel.send(`hi ${joe}, im the official ArK bot `)
    } else {
        return
    }
})
client.on('message', message => {
    if(message.author.bot) return
    let pre = 'say '
    let cont = message.content.slice(pre.length)
    if (message.content.startsWith('say ')) {
        message.channel.send(`${cont}\n\n **-${message.member.user.tag}**`)
    }

})
client.on('message', message => {
    let args = message.content.slice(prefix.length).split(" ");
    let cmd = args.shift().toLowerCase();
    if (cmd === 'created') {
        message.channel.send(`${message.guild.name} was created on ${message.guild.createdAt}`)

    } else {
        return
    }


})
client.on('message', message => {
    let args = message.content.slice(prefix.length).split(" ");
    let cmd = args.shift().toLowerCase();
    if (cmd === 'invite') {
        if (message.author.bot) return
        if (!message.member.hasPermission('ADMINISTRATOR')) return message.reply('You do not have permissiont to use this command!')
        message.channel.send('https://discord.com/oauth2/authorize?client_id=761283809144471552&scope=bot&permissions=2146958847')
    }
})
client.on('message', message => {
    let args = message.content.slice(prefix.length).split(" ");
    let cmd = args.shift().toLowerCase();
    if (cmd === 'win') {
        message.channel.send('https://media.discordapp.net/attachments/750221276265709568/767117444870307870/Untitled_design_2.png')

    }
})

client.on('message', message => {
    if (message.channel.type === 'dm') return
    let args = message.content.slice(prefix.length).split(" ");
    let cmd = args.shift().toLowerCase();
    if (cmd === 'giveaway') {
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply('You do not have permission to use this command')

        const channel = message.mentions.channels.first();

        if (!channel) return message.reply('Please provide a channel')

        let giveawayDuration = args[1]
        if (!giveawayDuration || isNaN(ms(giveawayDuration))) return message.reply('Please provide a valid giveaway duration!')








        let giveawayWinners = args[2];
        if (isNaN(giveawayWinners) || (parseInt(giveawayWinners) < - 0)) return message.reply('Please provide a valid number of winners!')

        let giveawayPrize = args.slice(3).join(" ");

        if (!giveawayPrize) return message.channel.send('Ok then, I will giveaway nothing');

        client.giveawaysManager.start(channel, {
            time: ms(giveawayDuration),
            prize: giveawayPrize,
            winnerCount: giveawayWinners,
            hostedBy: client.config.hostedBy ? message.author : null,
            messages: {
                giveaway: (client.config.everyoneMention ? "@everyone\n\n" : "") + "GIVEAWAY",
                giveawayEnded: (client.config.everyoneMention ? "@everyone\n\n" : "") + "GIVEAWAY ENDED",
                timeRemaining: "Time remaining: **{duration}** ",
                inviteToParticipate: "React with 🎉 to enter",
                winMessage: "Congrats {winners}, you won **{prize}**",
                embedFooter: "Giveaway Time!",
                noWinner: "Could not determine a winner",
                hostedBy: "Hosted by {user}",
                winners: "winner(s)",
                endedAt: "Ends at",
                units: {
                    seconds: "seconds",
                    minutes: "minutes",
                    hours: "hours",
                    days: "days",

                    pluralS: false,

                }

            }
        })

        message.channel.send(`Giveaway starting in ${channel}`)



    }
})

client.on('message', message => {
    if (message.channel.type === 'dm') return
    let args = message.content.slice(prefix.length).split(" ");
    let cmd = args.shift().toLowerCase();
    if (cmd === 'reroll') {
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('You do not have permision to use this command')

        if (!args[0]) return message.channel.send('No giveaway ID provided')
        let giveaway = client.giveawaysManager.giveaways.find((g) => g.prize === args.join(" ")) || client.giveawaysManager.giveaways.find((g) => g.messageID === args[0]);

        if (!giveaway) return message.channel.send("Could not find a giveaway with that ID")
        client.giveawaysManager.reroll(giveaway.messageID)
            .then(() => {
                message.channel.send("Giveaway rerolled")
            })
            .catch((e) => {
                if (e.startsWith(`Giveaway with ID ${giveaway.messageID} is not ended`)) {
                    message.channel.send('This giveaway has not ended yet')
                } else {
                    console.error(e)
                    message.channel.send('An error occured')
                }
            })
    }


})
client.on('message', message => {
    if (message.channel.type === 'dm') return


    let swearwords = ['nigger']
    let foundInText = false;
    for (var i in swearwords) {
        if (message.content.toLowerCase().includes(swearwords[i].toLowerCase())) foundInText = true;
    }
    if (foundInText) {
        message.delete();
        message.channel.send('NO SWEARING');
    }
})
client.on("message", async message => {
    if (message.author.bot || message.channel.type === "dm") return;


    //args system that is very required!!!!
    let messageArray = message.content.split(" ")
    let args = messageArray.slice(1);

    let cmd = messageArray[0];

    if (cmd === "a-ban") {
        try {
            let toBan = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === args.slice(0).join(" ") || x.user.username === args[0]);

            if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("You need permissions!")
            if (!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send("Bot need permissions!")

            const reason = args[1] || "There was no reason!";

            toBan.ban({
                reason: reason
            })
            message.channel.send(`${toBan} has been banned from the server!\nReason: ${reason}`)
        } catch (e) {
            console.log(e)
        }
    }

    if (cmd === "a-unban") {
        let toBan = await client.users.fetch(args[0])

        if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("You need permissions!")
        if (!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send("Bot need permissions!")

        const reason = args[1] || "There was no reason!";

        message.guild.members.unban(toBan)

        message.channel.send(`${toBan} has been unbanned from the server!`)
    }

})
client.on('message', (message) => {
    if (message.channel.type === 'dm') return
    let args = message.content.slice(prefix.length).split(" ");
    let cmd = args.shift().toLowerCase();
    if (cmd === 'addrole') {
        if (message.author.bot) return
        if (!message.member.hasPermission(['MANAGE_ROLES', 'ADMINISTRATOR'])) return message.reply('You do not have permission to use this command')
        const role = message.guild.roles.cache.find(role => role.name.includes(args[0]))
        if (role) {
            const mention = message.mentions.members.first()
            if (mention) {
                mention.roles.add(role)
                message.channel.send(`The role ${role.name} has been added to ${mention}`)

            }
            else {
                message.reply('This user does not exist.')
            }

        }
        else {
            message.reply(' Role not found.')
        }



    }

})

client.on('message', (message) => {
    if (message.channel.type === 'dm') return
    let args = message.content.slice(prefix.length).split(" ");
    let cmd = args.shift().toLowerCase();
    if (cmd === 'removerole') {
        if (message.author.bot) return
        if (!message.member.hasPermission(['MANAGE_ROLES', 'ADMINISTRATOR'])) return message.reply('You do not have permission to use this command')
        const role = message.guild.roles.cache.find(role => role.name.includes(args[0]))
        if (role) {
            const mention = message.mentions.members.first()
            if (mention) {

                mention.roles.remove(role)
                message.channel.send(`The role ${role.name} has been removed from ${mention}`)

            }
            else {
                message.reply('This user does not exist.')
            }

        }
        else {
            message.reply(' Role not found.')
        }



    }

})

client.on('message', (message) => {
    if (message.channel.type === 'dm') return
    let args = message.content.slice(prefix.length).split(" ");
    let cmd = args.shift().toLowerCase();
    if (cmd === 'supernova') {
        const embed = new Discord.MessageEmbed()
            .setColor('#1409e6')
            .setTitle('Supernova is the Best <a:blob_vibin:748342920905752658>')

        message.channel.send(embed)
    }
})
client.on('message', (message) => {
    
    if (message.channel.type === 'dm') return
    let args = message.content.slice(prefix.length).split(" ");
    let cmd = args.shift().toLowerCase();
    if (cmd === 'toxicz') {
        if(message.author.id !== '792306882681110539') return
        const embed = new Discord.MessageEmbed()
            .setColor('#1409e6')
            .setTitle('ToxicZ is the Best <a:blob_vibin:748342920905752658>')

        message.channel.send(embed)
    }
})
client.on('message', (message) => {
    if (message.channel.type === 'dm') return
    let args = message.content.slice(prefix.length).split(" ");
    let cmd = args.shift().toLowerCase();
    if (cmd === 'tony') {
        const embed = new Discord.MessageEmbed()
            .setColor('#01f5f5')
            .setTitle('ah yes, Tony The God <a:POG:794979519101927454>')

        message.channel.send(embed)
    }
})
client.on('message', (message) => {
    if (message.channel.type === 'dm') return
    let args = message.content.slice(prefix.length).split(" ");
    let cmd = args.shift().toLowerCase();
    if (cmd === 'soul') {
        const embed = new Discord.MessageEmbed()
            .setColor('#06ff06')
            .setTitle('Soul is the best and nicest zr leader ever!!! :smile:')

        message.channel.send(embed)
    }
})
client.on('message', (message) => {
    if (message.channel.type === 'dm') return
    let args = message.content.slice(prefix.length).split(" ");
    let cmd = args.shift().toLowerCase();
    if (cmd === 'ark') {
        const embed = new Discord.MessageEmbed()
            .setColor('#e8240e')
            .setTitle('ArK OP FOR GETTING ZCC <a:arkpat:788836905226993684>')


        message.channel.send(embed)
    }
})
const prefix2 = '-'
client.on('message', (message) => {
    if (message.channel.type === 'dm') return
    let args = message.content.slice(prefix2.length).split(" ");
    let cmd = args.shift().toLowerCase();
    if (cmd === 'apply') {
        const embed = new Discord.MessageEmbed()
            .setColor('#e8240e')
            .setTitle('<:ArKlogo:720269961766895676> Application form For ArK <a:verified_ball:748343045375787119>')
            .addFields({
                name: 'Region:',
                value: 'US West, US East, Asia, EU'
            },
                {
                    name: 'Do you fit Disocrd TOS?',
                    value: 'Yes or No'
                },
                {
                    name: 'Activity On Average:',
                    value: 'How many hours per day do you play zombsroyale and are on Discord?'
                }, {
                name: 'Screenshot Of Stats',
                value: 'Send a Screnshot of your ZR Stats.'
            }
            )
            .setFooter('Once you have read this form type your answers in the chat and wait till someone accepts you!!!')
        message.channel.send(embed)
    }
})
client.on('message', (message) => {
    if (message.channel.type === 'dm') return
    let args = message.content.slice(prefix2.length).split(" ");
    let cmd = args.shift().toLowerCase();
    if (cmd === 'rules') {
        
        const embed = new Discord.MessageEmbed()
        .setColor('#e8240e')
        .setTitle('__ArK Clan Rules__')
        .addFields({
            name: 'Treatment:',
            value: '1. Be respectful to everyone in the community whether they are in the clan or not. Toxicity will not be tolerated.\n2. Harassment and bullying are not tolerated here. Toxicity bullying and/or harassment inside of our server will result in removal from the server.\n 3. Racism is extremely not tolerated, being racist will get you removed from the server.'
        },
            {
                name: 'Channels:',
                value: '1. Hate speech will result in immediate removal. For instance bullying or being homophobic and/or racist. In case these violations of this rule in other servers or in DM\'s are broken the violator will be removed, and accountable for there past actions.\n2. Use every channel for there intended purpose, as well do not share your private info. As private info is for yourself only, protect yourself.\n3. Do not spam ping or spam outside of the spam channel. Violators will receive a mute.                 '
            },
            {
                name: 'Malicious actions and intent:',
                value: '1. Any and every malicious action toward our server and members will result in permanent removal from the server. This includes but is not limited to sending malicious links in Dm\'s or our server. Server raiding/mass pinging, and leaking private information.\n2. No pornographic images, photos, or pictures of any type. As well as no video links or discussion about it, this will result in a kick or ban. Along with this no invites to a nudes or nsfw server or YouTube video links.\n3. Anyone with enough evidence to be proven guilty of the above will receive punishment as necessary.'
            }, 
        )
        .setFooter('Once you have read the rules react with the ArK logo to gain access to the rest of the server!')
        message.channel.send(embed);
    }
   
       
    
    

})
client.login(process.env.token);
