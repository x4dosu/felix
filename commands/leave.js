exports.run = (client, message, args, p) => {
    //check if the author is not superior
    if(client.isSuperior) {
        message.channel.send("You can't use this command :no_entry_sign:");
        return;
    }
    //send message in the channel then leave after 2 seconds
    message.channel.send("**leaving the server bye** <a:waveowo:535494189283147786>")
    .then(setTimeout(function(){
        message.guild.leave();
    }, 2000))
    .catch(console.error);
}