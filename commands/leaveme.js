exports.run = (client, message, args, p) => {
    //check if the author is not superior
    if(!client.isSuperior) return message.channel.send(client.config.notSuperiorException);

    //if no guild entered return
    if(!args[0]) return message.channel.send("Please enter a guild");
    let leavg = args.join(" ");

    //if cant find guild return
    if(!client.guilds.find(g => g.name === leavg)) return message.channel.send(`I couldn't find the guild \`\`${leavg}\`\``);
    let leaveg = client.guilds.find(g => g.name === leavg);

    /*send message in the channel where the command got executed and then leave the guild this is so 
    that the client can still get the name of the guild and i like it better this way*/
    message.channel.send(`I left ${leavg}`)
    .then(setTimeout(function(){
        leaveg.leave();
    }, 2000))
    .catch(console.error);
}