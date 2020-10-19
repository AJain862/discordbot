const mongo = require('./mongo')
const profileSchema = require('./schemas/profile-schema')
module.exports = (client) => {
    client.on('message', message => {
        const { member, guild} = message
        addXP(guild.id, member.id, 23)
    })
}

 const addXP = async (guildId, userId, xpToAdd) => {
     await mongo().then(async mongoose => {
         try {
            const result = await profileSchema.findOneAndUpdate({
                guildId,
                userId,
            }, {
                guildId,
                userId,
                $inc: {
                    xp: xpToAdd
                }
            }, {
                upsert: true,
                new: true,
            })

            console.log('RESULT:', result)
         }
         finally {
             mongoose.connection.close()
         }

     })
 }

 module.exports.addXP = addXP