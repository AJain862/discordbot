const { Message } = require("discord.js")

module.exports = {
    name: 'ping',
    description: "this is a ping command!",
    execute(Message, args){
        Message.channel.send('pong')
    }
}