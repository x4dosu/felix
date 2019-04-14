exports.run = (client, message, args, p) => {
    let pinged = false;
    if(message.mentions.users.first()) {
        pinged = message.mentions.users.first().id;
    }
    let userID = message.author.id;
    let partner = client.edaters.get(message.author.id, "partner");

    client.sexRequest.ensure(partner, {eSexRequest: false, eSexRequester: "-"});
    //if you have no partner
    if(pinged !== partner && pinged !== false) {
        if(partner === "-") {
            message.channel.send(`You're not dating <@${pinged}>! You can date them with \`${p}edate <@name#0000>\``);
        } else {
            message.channel.send(`You're dating <@${partner}>! Don't cheat on them`);
        }
    } else
    if(partner === "-") {
        message.channel.send("You're not dating anyone! Date someone with `"+p+"edate <@name#0000>`");
    } else 
    if(!message.mentions.users.first() || pinged === partner) {
        let sexer = client.users.get(partner);
        if(!message.guild.members.get(sexer.id)) return message.channel.send(`Your partner isn't in this guild`);
        if(client.kids.get(partner, "pregnancy")) return message.channel.send(`Your partner is currently pregnant, tell them to either abort or give birth to their kid with \`${p}eabort\` or \`${p}ebirth\``);
        if(client.kids.get(userID, "pregnancy")) return message.channel.send(`You're currently pregnant. You can either \`${p}eabort\` or \`${p}ebirth\``);
        if(client.sexRequest.get(partner, "eSexRequest")) return message.channel.send("You already have an esex request open!");
        if(client.sexRequest.get(userID, "eSexRequest")) return message.channel.send("You still have to answer to an esex request!");
        //set the request for esex to true
        client.sexRequest.set(partner, true, "eSexRequest");
        //set your id as the requester
        client.sexRequest.set(partner, message.author.id, "eSexRequester");
        //increase the counter by one
        client.sex.inc(partner, "counter");
        client.sex.inc(userID, "counter");
        //get the counter nr
        let sexNr = client.sex.get(partner, "counter");
        //send sex message cowboy
        message.channel.send(`<@${sexer.id}>, do you want to have esex with <@${message.author.id}>? \`yes\` or \`no\``)
        .then(setTimeout(
            function(){
                //if no answer
                if(client.sex.get(partner, "consent") === false && client.sexRequest.get(partner, "eSexRequest") === true && client.sex.get(partner, "counter") === sexNr) {
                    //reset requests
                    client.sexRequest.set(partner, false, "eSexRequest");
                    client.sexRequest.set(partner, "-", "eSexRequester");
                    
                    message.channel.send(`<@${partner}> didn't give you consent`);
                    return;
                }
            //60 seconds
        }, 60000));
    }
}