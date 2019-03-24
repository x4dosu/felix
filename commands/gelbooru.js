exports.run = (client, message, args, p) => {
    //args connected with + and put to lower case
    let tag = args.join("+").toLowerCase();
    //the gelbooru url and the tags
    let url = client.config.gelbooru + tag;

    //if someone has nsfw+ enabled they wont get warned
    if(client.specialNSFW.get(message.author.id, "nsfw") === false) {
        if(message.channel.nsfw === false) return message.reply("You can't use this command here!");
        if(tag.includes("loli")) return message.channel.send("Don't get me banned!");
        if(tag.includes("toddlercon")) return message.channel.send("Don't get me banned!");
        if(tag.includes("shota")) return message.channel.send("Don't get me banned!");
        if(tag.includes("child")) return message.channel.send("Don't get me banned!");
    }

    //request the gelbooru json
    client.snekfetch.get(url).then((r) => {
        let upBody = r.body;
        let totalSites;
        let site;
        //site randomizer
        if(upBody.total < 20000) {
        totalSites = upBody.total / 100;
        } else {
        totalSites = 200;
        }
        if(totalSites <= 1) {
        site = 0;
        } else {
        site = getRandomInt(totalSites);
        }
        let gUrl = url + "&page=" + site;
        //request the gelbooru json url with the site specified
        client.snekfetch.get(gUrl).then((r) => {
            let body = r.body;
            if(!body.posts[0]) return message.channel.send("Couldn't find anything under this tag!");
            //post randomizer
            let i = getRandomInt(body.count);

            let bodyurl = body.posts[i].file_url;
            
            //send the final message
            message.channel.send({"embed": {
                "title": "gelbooru.com",
                "url": bodyurl,
                "color": 16399236,
                "image": {
                "url": bodyurl
                },
            }});
        });
    });
}
/*this gets a random int selected 
example getRandomInt(2) will either give 0 or 1*/
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}