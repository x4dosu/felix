exports.run = (client, message, args, p) => {
    //put the single args together with a plus and then put them to lower case
    let tag = args.join("+").toLowerCase();
    //put the tag & the url together
    let url = client.config.yandere + tag;
    //if someone doesn't have nsfw+ enabled check these things
    if(client.specialNSFW.get(message.author.id, "nsfw") === false) {
        if(message.channel.nsfw === false) return message.reply(client.config.notNSFWChannelException);
        if(tag.includes("loli")) return message.channel.send(client.config.illegalException);
        if(tag.includes("toddlercon")) return message.channel.send(client.config.illegalException);
        if(tag.includes("shota")) return message.channel.send(client.config.illegalException);
        if(tag.includes("child")) return message.channel.send(client.config.illegalException);
    }
    //request the json from the yandere url with the tag
    client.snekfetch.get(url).then((r) => {
        let body = r.body;
        //if no first result return
        if(!body[0]) return message.channel.send(client.config.noResultException);
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