exports.run = (client, message, args, p) => {
    //check if the author is not cool
    if(!client.isSuperior) return message.channel.send(client.config.notSuperiorException);
    //send stopping message and then stop the bot
    message.channel.send("**Stopping . . .** ")
    .then(() => process.exit(1));
}