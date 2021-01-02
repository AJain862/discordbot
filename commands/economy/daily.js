const economy = require('../../economy')
const ms = require('ms')

module.exports = {
  commands: ['gimme'],
  
  
  
  description: 'Gives a user coins.',
  callback: async (message, arguments) => {
    const coins = '1000'
    const user = message.author
    const userID = user.id 
    const guildId = message.guild.id

     await economy.addCoins(guildId, userID, coins)
     message.reply('You were given 1000 coins!')
     
}
}