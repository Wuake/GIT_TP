//imports of the needed stuff
const command = require('./command')

module.exports = client =>{

    command(client, 'giveRole', message => {

        const member = message.mentions.members.first()
        let role = "NULL"
        role = message.guild.roles.cache.find(role => role.name === "Amongous")

        try {

            if (member == null){
    
                message.channel.send("T'as oublié de mentionner une personne trouduc...")
                return false
            }
            
            if (role.name === "Amongous"){
                
                member.roles.add(role.id)
    
            } //doesn't work because there is no mute role
            else if(role !== "Amongous") {
                
                message.channel.send(`Il n'y a pas de rôle Amongous il faut donc le créer`)
            }

        }catch(error){

            console.log(error)
        }
    })
}
