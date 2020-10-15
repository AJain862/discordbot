const { minArgs } = require("./add");

module.exports = {
    name: 'mute',
    description: 'mutes a user',
    

    
    callback: (message, arguements, text) => {

        message.channel.send('hi')


        
    }
}