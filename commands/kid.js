exports.run = (client, message, args, p) => {
    if(!args[0]) return message.channel.send(client.config.noNameException);
    let kidName = args.join(" ");
    let nameID = kidName + message.author.id;
    if(!client.kidID.get(nameID)) return message.channel.send(client.config.noResultException);
    message.channel.send(`The name of your kid is ${client.kidID.get(nameID, "name")} and it's pp length in cm is ${client.kidID.get(nameID, "ppLength[0]")}cm (${client.kidID.get(nameID, "ppLength[1]")}inch)`);
}