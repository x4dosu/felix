exports.run = (client, message, args, p) => {
    //check if the author id is not superior
    if(!client.isSuperior) return message.channel.send("You can't use this command :no_entry_sign:");
    //if no guild entered return
    if(!args[0]) return message.channel.send("Please enter a guild");
    let invg = args.join(" ");

    //if the client cant find the guild entered return
    if(!client.guilds.find(g => g.name === invg)) return message.channel.send(`I couldn't find the guild \`\`${invg}\`\``);
    let invgl = client.guilds.find(g => g.name === invg);
    //if the client doesn't have permissions to create an instant invite return
    if(!invgl.me.hasPermissions("CREATE_INSTANT_INVITE")) return message.channel.send(`I don't have the permission to create an invite on \`\`${invg}\`\``);

    //look for the first text channel
    let channelID;
    let channels = invgl.channels;
    channelLoop:
    for (let c of channels) {
        let channelType = c[1].type;
        if (channelType === "text") {
            channelID = c[0];
            break channelLoop;
        }
    }

    let channel = client.channels.get(invgl.systemChannelID || channelID);

    //create invite and then dm it to the person that requested it
    channel.createInvite().then(function(newInvite){
        message.author.send(`${newInvite}`);
    });
    
    //send final messsage in the channel where the command got executed
    message.channel.send(`I invited you to \`\`${invg}\`\``)
}