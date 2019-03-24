exports.run = (client, message, args, p) => {
    //put the single args together with a plus and then put them to lower case
    let tag = args.join("+").toLowerCase();
    //put the tag & the url together
    let url = client.config.yandere + tag;
    //if someone doesn't have nsfw+ enabled check these things
    if(client.specialNSFW.get(message.author.id, "nsfw") === false) {
        if(message.channel.nsfw === false) return message.reply("You can't use this command here!");
        if(tag.includes("loli")) return message.channel.send("Don't get me banned!");
        if(tag.includes("toddlercon")) return message.channel.send("Don't get me banned!");
        if(tag.includes("shota")) return message.channel.send("Don't get me banned!");
        if(tag.includes("child")) return message.channel.send("Don't get me banned!");
    }
    //request the json from the yandere url with the tag
    client.snekfetch.get(url).then((r) => {
        let body = r.body;
        //if no first result return
        if(!body[0]) return message.channel.send("Couldn't find anything under this tag!");
        let bodyurl = body[0].file_url;
        //send the image in the channel
        message.channel.send({"embed": {
            "title": "yande.re",
            "url": bodyurl,
            "color": 16399236,
            "image": {
            "url": bodyurl
        }}});
    });
}