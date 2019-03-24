exports.run = (client, message, args, p) => {
    //if not one of these people then return
    if(
        message.author.id !== client.config.ownerID &&
        message.author.id !== '170288836067196928' &&
        message.author.id !== '254373477878857729'
    ) {
        return message.channel.send("You can't use this command :no_entry_sign:");
    }
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