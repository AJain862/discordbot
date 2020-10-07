exports.run = async(client, message, args) => {
    message.channel.send(`PONG! ${client.ws.ping}ms`);
}