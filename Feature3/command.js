const { prefix } = require ('../config.json')

module.exports = (client, aliases, callback) => {

    //change : 'command' -> ['command']
    if(typeof aliases === 'string'){
        aliases = [aliases]
    }

    //messageCreate is the object, message a parameter
    //verification of the viability of the command
    client.on('messageCreate', (message) =>{
        const {content} = message  

        aliases.forEach(alias => {
            const command = `${prefix}${alias}`
            
            //responding to the command
            if (content.startsWith(`${command} `) || content === command){

                console.log(`Running the command ${command}`)
                callback(message)
            }
            if (command === 'move') move.move(args, message)

        })
    })
}