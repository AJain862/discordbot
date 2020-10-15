const { minArgs } = require("./add");

module.exports = {
    name: 'mute',
    description: 'mutes a user',
    permssionError: 'You need admin perms to run this command',
    minArgs: 0,
    maxArgs: 0,
    callback: (message, arguements, text) => {

        message.channel.send('hi')


        
    }
}