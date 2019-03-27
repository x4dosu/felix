exports.run = (client, message, args, p) => {
    //check if the author is not superior
    if(client.isSuperior) return message.channel.send("You can't use this command :no_entry_sign:");

    let username = args.join(" ");
    //set the username to the username entered in the arguments and then message to inform about the name change
    client.user.setUsername(username)
    .then(message.channel.send(`Name set to ${username}`))
    .catch(console.error);
}