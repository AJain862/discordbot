const { minArgs } = require("./add");

module.exports = {
    name: 'mute',
    minArgs: 0,
    maxArgs: 0,
    

    
    callback: (message, arguements, text) => {

        message.channel.send('hi')


        
    }
}