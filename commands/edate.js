exports.run = (client, message, args, p) => {
    let partner = client.edaters.get(message.author.id, "partner");
    //if first args are breakup or first and second args are break up
    if(args[0] === "breakup" || args[0] + args[1] === "breakup") {
        //if you're no dating anyone return
        if(partner === "-") return message.channel.send("You're not dating anyone at the moment");
        message.channel.send(`You broke up with <@${partner}>`);
        //set partner of both to -
        client.edaters.set(message.author.id, "-", "partner");
        client.edaters.set(partner, "-", "partner");
        //reset the edate date
        client.edaters.set(message.author.id, "-", "edateDate");
        client.edaters.set(partner, "-", "edateDate");
    //if no first args
    } else if(!args[0]) {
        //if no partner
        if(partner === "-") {
            return message.channel.send("Please mention the user that you want to edate");
        } else {
            return message.channel.send(`You're currently dating <@${partner}>. You can breakup with them by using ${p}edate breakup`);
        }
    //if first args aren't breakup but there are first args
    } else {
        //if no user mentioned
        if(!message.mentions.users.first()) return message.channel.send("Please mention the user that you want to edate");
        let userID = message.mentions.users.first().id;
        client.edateRequest.ensure(userID, {partner: "-", edateDate: "-"});
        if(client.edateRequest.get(userID, "requester") === message.author.id) return message.channel.send("You already asked them if they want to edate you wait for an response first!");
        //you can't edate yourself that makes no sense
        if(userID === message.author.id) return message.channel.send("You can't edate yourself :sob:");
        let date = client.users.get(userID);
        //if you don't have a partner
        if(partner === "-") {
            //set the request for an edate to true
            client.edateRequest.set(userID, "true", "request");
            //set your id as the requester
            client.edateRequest.set(userID, message.author.id, "requester");
            message.channel.send(`<@${date.id}> has to respond in 60 seconds with either \`yes\` or \`no\``)
            .then(setTimeout(
                function(){
                    //if you have no partner but the request is still true and you're the requester
                    if(partner === "-" &&
                    client.edateRequest.get(userID, "request") === "true" &&
                    client.edateRequest.get(userID, "requester") === message.author.id) {
                        //reset the request and the requester
                        client.edateRequest.set(userID, "false", "request");
                        client.edateRequest.set(userID, "-", "requester");
                        message.channel.send(`<@${date.id}> didn't respond after 60 seconds`);
                        return;
                    } else 
                    //if you're already dating someone makes no sense here but i did it :sunglasses:
                    if(partner === userID) {
                        return;
                    } else {
                        return;
                    }
                //60 seconds
            }, 60000));
            return;
        } else {
            //if you try to date the person that you're already dating
            if(userID === partner) return message.channel.send(`You're already dating <@${partner}>`);
            //if you're trying to date someone else than the person that you're already dating
            message.channel.send(`You're currently dating <@${partner}>! If you want to break up with them use ${p}edate breakup`);
            return;
        }
    }
}

