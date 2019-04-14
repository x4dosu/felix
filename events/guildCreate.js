module.exports = (client, guild) => {
    //log msg when joining a guild
    console.log(`I am now member of ${guild.name} (${client.guilds.size} guilds)`);
}