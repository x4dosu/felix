exports.run = (client, message, args, p) => {
    //if not one of these people then return
    if(!client.isSuperior) return message.channel.send(client.config.notSuperiorException);
    //if specialnsfw is true right now then
    if(client.specialNSFW.get(message.author.id, "nsfw") === true) {
        client.specialNSFW.set(message.author.id, false, "nsfw");
        message.channel.send("NSFW+ has been deactivated for you");
    //else
    } else {
        client.specialNSFW.set(message.author.id, true, "nsfw");
        message.channel.send("NSFW+ has been activated for you");
    }
}