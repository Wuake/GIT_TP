const command = require('./command')
const data = require('../data.json')
const { Guild, GuildEmoji, Intents } = require('discord.js')

module.exports = client => {

    command(client, 'startGame', async (message) =>{

        const AMONGOUS_ROLE_ID = '984864019821232150'
        const fs = require('fs')
        let text = ""
        var dictionnary = {

            players: []
        }

        try{

            await message.guild.members.fetch()//cache everyone
            const role = message.guild.roles.everyone //check every people with the eveyone role
            const members = role.members // array of GuildMembers
            //const clefs = members.keys() //get the ids of the users
            const values = members.values()// values of a person
            
            for (let i = 0 ; i < data.rules.length ; i++) {
                text += ("- " + data.rules[i] + "\n" );
            }

            for (let key of values) {
                //console.log(key._roles, key.id,  key.nickname);
                for (let i = 0 ; i < key._roles.length ; i++){
                    
                    //if the person has the role
                    if(key._roles[i] === AMONGOUS_ROLE_ID){

                        console.log(key.id)
                        
                        let objectToSend = {
                            "identity": key.id,
                            "pseudo": key.nickname,
                            "vote_against_him_her": 0,
                            "has_voted": false,
                            "ejected": false
                        }
                        dictionnary.players.push(objectToSend)
                        
                        await client.users.fetch(key.id, false).then((user) => {
                            user.send({
                                embeds : [{
                                    title : '📋 Règles',
                                    description : text
                                }]
                            })
                        });

                    }
                }
                
            }
            console.log("J'ai envoyé les règles")
            //formatting to for the json
            dictionnary = JSON.stringify(dictionnary)
            //adding the players to the json file
            fs.writeFile('./players.json', dictionnary, (err) => {

                if(!err){
                    console.log("J'ai écrit le fichier des joueurs")
                }else{
                    console.log(err)
                }
            });

            for (let member in members){
                
                message.member.send({
                    embeds : [{
                        title : '📋 Règles',
                        description : text
                    }]
                })
            }

        }catch (err){
            console.log(err)
        }
    })
}