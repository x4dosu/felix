exports.run = (client, message, args, p) => {
    //if the author is someone else than me return
    if(message.author.id !== client.config.ownerID) return message.channel.send("You can't use this command :no_entry_sign:");
    //eval (run) the code in the arguments
    eval(args.join(" "));
}