//imports of the needed files
const {
    Guild,
    GuildEmoji
} = require('discord.js')
const command = require('./command')

module.exports = client => {

    command(client, 'meeting', async (message) => {

        await message.guild.members.fetch() //cache everyone
        const AMONGOUS_ROLE_ID = '984864019821232150'
        const role = message.guild.roles.everyone //check every people with the eveyone role
        const members = role.members // array of GuildMembers
        const fs = require('fs')
        let content = JSON.parse(fs.readFileSync('./players.json', 'utf8'));
        //const clefs = members.keys() //get the ids of the users
        const values = members.values()
        var count = 1
        var votes = 0

        try {

            for (let key of values) {
                //console.log(key._roles, key.id,  key.nickname);
                for (let i = 0; i < key._roles.length; i++) {

                    if (key._roles[i] === AMONGOUS_ROLE_ID) {
                        await client.users.fetch(key.id, false).then((user) => {
                            user.send({
                                files: ["./images/discuss.png"]
                            })
                        });
                    }
                }
                
            }
            console.log("Le meeting à commencé")
            message.channel.send("Vous avez 2min 30sec pour débatre")

            //function to eject the person who has the more votes against him or her
            function eject() {

                var max = -1

                //to get the size of the number of person on json file
                for (let key of values) {
                    //console.log(key._roles, key.id,  key.nickname);
                    for (let i = 0 ; i < key._roles.length ; i++){
                        
                        //if the person has the role
                        if(key._roles[i] === AMONGOUS_ROLE_ID){

                            count++                  
                        }
                    }
                }
                //REWRITE THE FILE WITHOUT THE ELIMI
                //going through all the ppl's id
                for (let i = 0; i < count; i++) {

                    if (max < content.players[i].vote_against_him_her){
                        max = content.players[i].vote_against_him_her
                        pseudo = content.players[i].pseudo
                        location = i
                        //POUR LE SKIP
                        votes += content.players[i].vote_against_him_her
                    }
                    if(max != 0){
                        console.log(`éjection de => "${pseudo}"`)
                        content.players[location].ejected = true
                        fs.writeFileSync('./players.json', JSON.stringify(content));
    
                        message.channel.send(`${pseudo} a été éjecté(e)`)
                    }else{
                        message.channel.send('Personne n\'a été éjecté(e)')
                    }
                }


            }

            function warning(){

                message.channel.send("Il vous reste 20 secondes pour voter...")
            }
            //envoi d'un warning pour dire le temps restant avant de passer à l'ejection
            setTimeout(function(){warning()}, 130000)
            setTimeout(function(){eject()}, 150000)

        } catch (err) {

            console.log(err)
        }

    })
}