module.exports = (client, guild) => {
    //log msg when leaving a guild
    console.log(`I am no longer member of ${guild.name} (${client.guilds.size} guilds left)`);
    //remove the guild from the database
    client.database.delete(guild.id);
}