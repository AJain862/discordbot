module.exports = {
    commands: ['unlock'],
    
    
    permissionError: 'You need admin permissions to run this command',
    minArgs: 1,
    maxArgs: 1,
    
    callback: (message, arguments, text, ) => {
        async function f() {
        
        if(arguments[0]) return message.channel.send('You did not mention any channels');
        if(!message.mentions.channels.first()) return message.channel.send('You did not mention a channel.')

        const role = message.guild.roles.get('765356807895384072');
        if(!role) return message.channel.send('Role is not found');

        await message.mentions.channels.forEach(async channel => {
            if (!channel.name.startsWith('🔒')) return message.channel.send(`<#${channel.id}> is already unlocked`);
            await channel.setName(channel.name.substring(1));
            try {
                channel.overwritesPermissions(role, {
                    SEND_MESSAGES: true
                });
                message.channel.send(`<#${channel.id}> has been unlocked`)

            }catch (err) {
                console.log(err)
                message.channel.send('Something has gone wrong unlocking the channels');
            }
        })

        
    }
    },
    permissions: 'ADMINISTRATOR', 
    
  }
