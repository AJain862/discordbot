module.exports = {
    commands: ['userinfo', 'whois'],
    expectedArgs: '<num1> <num2>',
    permissionError: 'You need admin permissions to run this command',
    minArgs: 1,
    maxArgs: 1,
    callback: (message, arguments, text) => {
        run = async (message) => {
            const { guild, channel } = message
        
            const user = message.mentions.users.first() || message.member.user
            const member = guild.members.cache.get(user.id)
        
            console.log(member)
        
            const embed = new MessageEmbed()
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
          }
      
  
      
    },
    permissions: '',
    requiredRoles: [],
  }