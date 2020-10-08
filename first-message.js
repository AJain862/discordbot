const { executionAsyncId } = require("async_hooks");

const addReactions = (message, reactions) => {
    message.react(reactions[0])
    reactions.shift()
    if (reactions.length > 0) {
        setTimeout(() => addReactions(message, reactions), 750)
    }
}

module.exports = async (client, id, text, reactions = []) => {
    const channel = await client.channels.fetch(id)

    channel.messages.fetch().then((message) => {
        if (message.size === 0) {
            //send a new message
            channel.send(text).then(message => {
                addReactions(message, reactions)

            })
        } else {
            // edit the existing message
        }
    })
}