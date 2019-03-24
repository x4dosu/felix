exports.run = (client, message, args, p) => {
    //check if the author is not me
    if(message.author.id !== client.config.ownerID) return message.channel.send("You can't use this command :no_entry_sign:");
    //send stopping message and then stop the bot
    message.channel.send("**Stopping . . .** ")
    .then(() => process.exit(1));
}