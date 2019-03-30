exports.run = (client, message, args, p) => {
    let userID = message.author.id;
    if(!client.kids.get(userID, "pregnancy")) {
        message.channel.send("You're not pregnant");
    } else {
        let parent2 = client.kids.get(userID, "parent2");
        message.channel.send(`You're pregnant with <@${parent2}>`)
    }
}