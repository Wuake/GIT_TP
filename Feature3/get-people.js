//imports of the needed files
const { Guild, GuildEmoji } = require('discord.js')
const command = require('./command')

module.exports = client => {

    command(client, 'getppl', async (message) =>{

        try{
            await message.guild.members.fetch()//cache everyone
            const role = message.guild.roles.everyone //check every people with the eveyone role
            const members = role.members // array of GuildMembers
            const cles = members.keys() //get the ids of the users
    
            console.log(cles)

            for (const key of cles) {
                console.log(key);
            }
            for (const member of members){
                //loop on that
                console.log(member[0])
                break
            }

            
        }catch (err){

            console.log(err)
        }
        

    })
}
