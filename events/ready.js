module.exports = (client) => {
    //log the version
    console.log(`${client.user.username} started using version ${client.config.version}`);

    //make sure all databases have been loaded
    (async function() {
        await client.database.defer;
        console.log(`The databases of ${client.guilds.size} servers have been loaded`);
    }());
    (async function() {
        await client.commands.defer;
        console.log(`${client.commands.size} commands have been loaded`);
    }());    
    (async function() {
        await client.osuNames.defer;
    }());
    (async function() {
        await client.specialNSFW.defer;
    }());

    

    //changes the game that is displayed in discord activity
    client.user.setActivity(`your orders | ${client.config.prefix}help`, { type: 'LISTENING' });
    //changes the presence
    client.user.setPresence({status:'idle'});

    /*this code can be used to log the guilds not recommended for bigger bots though
    
    const Guilds = client.guilds.map(g => g.name).join("\n");
    console.log(`Bot for ${client.guilds.size} guilds: \n\n${Guilds}`);
    */
}