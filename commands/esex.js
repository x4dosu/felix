exports.run = (client, message, args, p) => {
    //if no user mentioned
    if(!message.mentions.users.first()) return message.channel.send("Please mention the user that you want to have esex with");
    
    let userID = message.mentions.users.first().id;
    let partner = client.edaters.get(message.author.id, "partner");

    client.sexRequest.ensure(partner, {eSexRequest: false, eSexRequester: "-"});
    //if you have no partner
    if(partner === "-") {
        message.channel.send("You're not dating anyone to have esex with");
    } else
    //if your partner is the person you mentioned
    if(userID === partner) {
        let sexer = client.users.get(userID);
        if(client.sexRequest.get(partner, "eSexRequest")) return message.channel.send("You already have an esex request open!");
        if(client.sexRequest.get(userID, "eSexRequest")) return message.channel.send("You still have to answer to an esex request!");
        //set the request for esex to true
        client.sexRequest.set(userID, true, "eSexRequest");
        //set your id as the requester
        client.sexRequest.set(userID, message.author.id, "eSexRequester");
        //send sex message cowboy
        message.channel.send(`<@${sexer.id}>, do you want to have esex with <@${message.author.id}>? \`yes\` or \`no\``)
        .then(setTimeout(
            function(){
                //if no answer
                if(!client.sex.get(userID, "consent") && client.sexRequest.get(userID, "eSexRequest")) {
                    //reset requests
                    client.sexRequest.set(userID, false, "eSexRequest");
                    client.sexRequest.set(userID, "-", "eSexRequester");
                    
                    message.channel.send(`<@${partner}> didn't give you consent`);
                    return;
                //else if they answered and said yes / no
                } else {
                    client.sexRequest.set(userID, false, "eSexRequest");
                    client.sexRequest.set(userID, "-", "eSexRequester");
                    return;
                }
            //60 seconds
        }, 60000));
    } else {
        //if you try to have esex with yourself wtf
        if(userID === message.author.id) return message.channel.send("Stop trying to have esex with yourself that doesn't even make sense");
        //if you try to cheat on your partner
        message.channel.send("Don't cheat on your partner!")
    }
}