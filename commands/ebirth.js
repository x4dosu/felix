exports.run = (client, message, args, p) => {
    client.birthRequest.ensure(message.author.id, {birthRequest: false});
    let parent1 = message.author.id;
    //if you're not pregnancy
    if(client.kids.get(parent1, "pregnancy") === false) {
        message.channel.send("You're not pregnant");
        return;
    } else 
    if(client.kids.get(parent1, "pregnancy") === true) {
        //send out birthRequest
        client.birthRequest.set(parent1, true, "birthRequest");
        message.channel.send(`What do you want to name your kid <@${parent1}>`);
        return;
    }
}