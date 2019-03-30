exports.run = (client, message, args, p) => {
    //if you're not pregnant
    if(client.kids.get(message.author.id, "pregnancy") === false) {
        message.channel.send("You're not pregnant");
    } else {
        //set pregnancy to false and reset the second parent
        client.kids.set(message.author.id, false, "pregnancy");
        client.kids.set(message.author.id, "-", "parent2");
        message.channel.send("You e-aborted your kid");
    }
}