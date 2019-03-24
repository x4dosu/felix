exports.run = (client, message, args, p) => {
    //check if command executor isn't owner
    if(message.author.id !== client.config.ownerID) return message.channel.send("You can't use this command :no_entry_sign:");
    //checks if there is a link
    if(!args[0]) return message.channel.send("Please insert a link to a profile picture");

    let avatar = args[0];
    //changes the avatar and sends a message in the channel
    client.user.setAvatar(avatar)
    .then(message.channel.send(`New avatar set!`))
    .catch(console.error);
}