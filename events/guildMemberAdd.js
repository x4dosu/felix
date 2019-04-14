module.exports = (client, member) => {
    //make sure the guild is in the database already
    client.database.ensure(member.guild.id, client.defaultSettings);
    //if the configuration is turned off 
    if(client.database.get(member.guild.id, "welcome") !== "false") {
        //check if the welcome channel set in the configurations exists
        if(!member.guild.channels.find(c => c.name === client.database.get(member.guild.id, "welcomeChannel"))) return;
        //get the msg set from the configuration
        let welcomeMessage = client.database.get(member.guild.id, "welcomeMessage");
        //replace {{user}} with the name
        welcomeMessage = welcomeMessage
        .replace("{{user}}", `<@${member.id}>`);
        
        //look for the welcome channel set in the configurations and then send the welcome message
        member.guild.channels
        .find(n => n.name === client.database.get(member.guild.id, "welcomeChannel"))
        .send(welcomeMessage)
        .catch(console.error);
    }
    //if the configuration is turned off
    if(client.database.get(member.guild.id, "roleOnJoin") !== "false") {
        //check if the role exists
        if(!member.guild.roles.find(r => r.name === client.database.get(member.guild.id, "joinRole"))) return;
        //get the role
        let dbJoinRole = member.guild.roles
        .find(r => r.name === client.database.get(member.guild.id, "joinRole"));
        //add the role
        member.roles.add(dbJoinRole)
        .catch(console.error);
    }
}