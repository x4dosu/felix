module.exports = (client) => {
    //log the version
    console.log(`${client.user.username} started using version ${client.config.version}`);

    //changes the game that is displayed in discord activity
    client.user.setActivity(`your orders | ${client.config.prefix}help`, { type: 'LISTENING' });
    //changes the presence
    client.user.setPresence({status:'idle'});

    //reset all requests & requesters when starting to prevent buggy behaviour
    client.sexRequest.deleteAll();
    client.edateRequest.deleteAll();
    client.birthRequest.deleteAll();

    /*this code can be used to log the guilds not recommended for bigger bots though
    
    const Guilds = client.guilds.map(g => g.name).join("\n");
    console.log(`Bot for ${client.guilds.size} guilds: \n\n${Guilds}`);
    */
}