module.exports = (client) => {
    /*
    * this is just to make a new line after clearing the command prompt and running the bot with
    * DOSKEY bot=cd your-bot-dir $T cls $T node index.js
    */

    console.log("->");

    /* so that is looks like this

    your-bot-dir>->
    The configurations for 8 servers have been loaded
    33 commands have been loaded
    The osu names of 78 users have been loaded
    Felix 🦋 started using version 3.0.3


    instead of

    your-bot-dir>The configurations for 8 servers have been loaded
    33 commands have been loaded
    The osu names of 78 users have been loaded
    Felix 🦋 started using version 3.0.3
    */

    //load databases & log it
    client.database.defer.then( () => {console.log(`The configurations for ${client.database.size} servers have been loaded`);});
    client.commands.defer.then( () => {console.log(`A total of ${client.commands.size} commands have been loaded`);});
    client.osuNames.defer.then( () => {console.log(`The osu names of ${client.osuNames.size} users have been loaded`);});

    //log the version
    console.log(`${client.user.username} started using version ${client.config.version} and is in ${client.guilds.size} different guilds`);

    //changes the presence
    client.user.setPresence({ activity: { name: `LOOΠΔ | ${client.config.prefix}help`, type: 'LISTENING' } }, { status:'online' });

    //reset all requests & requesters when starting to prevent buggy behaviour
    client.sexRequest.deleteAll();
    client.edateRequest.deleteAll();
    client.birthRequest.deleteAll();

    /*this code can be used to log the guilds not recommended for bigger bots though 
    or if you want to keep your cmd clean
    
    const Guilds = client.guilds.map(g => g.name).join("\n");
    console.log(`Bot for ${client.guilds.size} guilds: \n\n${Guilds}`);
    */
}