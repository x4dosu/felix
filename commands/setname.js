exports.run = (client, message, args, p) => {
    //check if the author is not me
    if(message.author.id !== client.config.ownerID) return message.channel.send("You can't use this command :no_entry_sign:");

    let username = args.join(" ");
    //set the username to the username entered in the arguments and then message to inform about the name change
    client.user.setUsername(username)
    .then(message.channel.send(`Name set to ${username}`))
    .catch(console.error);
}