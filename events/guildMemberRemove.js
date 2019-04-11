module.exports = (client, member) => {
    //make sure the guild is in the database already
    client.database.ensure(member.guild.id, client.defaultSettings);
    //if configuration is turned off
    if(client.database.get(member.guild.id, "farewell") === "false") return;
    //check if the channel exists
    if(!member.guild.channels.find(c => c.name === client.database.get(member.guild.id, "farewellChannel"))) return;
    //get the msg set from the configuration
    let farewellMessage = client.database.get(member.guild.id, "farewellMessage");
    //replace {{user}} with the name
    farewellMessage = farewellMessage
    .replace("{{user}}", `<@${member.id}>`);
    
    //look for the farewell channel and then send the farewell message
    member.guild.channels
    .find("name", client.database.get(member.guild.id, "farewellChannel"))
    .send(farewellMessage)
    .catch(console.error);
}