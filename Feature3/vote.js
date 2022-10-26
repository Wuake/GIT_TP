const command = require('./command')
const data = require('../data.json')
const { Guild, GuildEmoji, Intents } = require('discord.js')

module.exports = client => {

    command(client, 'vote', async (message) => {

        //take the ppl
        const member = message.mentions.members.first()
        const sender = message.author.id //ID
        console.log(member.nickname)
        console.log(sender)    
        const role = message.guild.roles.everyone //check every people with the eveyone role
        const members = role.members // array of GuildMembers
        const values = members.values()// values of a person
        const json = '../players.json'
        const fs = require('fs')
        const AMONGOUS_ROLE_ID = '984864019821232150'
        var content2 = JSON.parse(fs.readFileSync('./players.json', 'utf8'));
        var count = 1

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

        console.log("Vote contre (id) => " + member)


        //going through all the ppl's id
        function vote(){

            var content = JSON.parse(fs.readFileSync('./players.json', 'utf8'));

            for (let i = 0 ; i < count ; i++){  
                //console.log(`Joueur ${i} : `+content.players[i].identity)      
    
                if (member == content.players[i].identity){
    
                    console.log("à voté")

                    content.players[i].vote_against_him_her += 1
                    fs.writeFileSync('./players.json', JSON.stringify(content));
                }
                if (sender == content.players[i].identityentity){

                    content.players[i].has_voted = true
                    fs.writeFileSync('./players.json', JSON.stringify(content));

                }   
            }
        }
        for (let i = 0 ; i < count ; i++){

            if(content2.players[i].identity === sender){
                if(content2.players[i].has_voted == false){
                    vote()
                }
            }else{
                message.channel.send(`T'as déjà voté toi, calme toi tout de suite !`)
            }
        }
    })
}