exports.run = (client, message, args, p) => {
    /*if more than one args return
    in theory danbooru would support two arguments but the bot
     uses the random tag so that's just one argument left*/
    if(args[1]) return message.channel.send("Danbooru only supports one tag!");
    //put the args together with plus and then to lower case
    let tag = args.join("+").toLowerCase();
    //put the danbooru url and tag together
    let url = client.config.danbooru + tag;
    //if the author doesn't have nsfw+ enabled check these things
    if(client.specialNSFW.get(message.author.id, "nsfw") === false) {
      if(message.channel.nsfw === false) return message.reply("You can't use this command here!");
      if(tag.includes("loli")) return message.channel.send("Don't get me banned!");
      if(tag.includes("toddlercon")) return message.channel.send("Don't get me banned!");
      if(tag.includes("shota")) return message.channel.send("Don't get me banned!");
      if(tag.includes("child")) return message.channel.send("Don't get me banned!");
    }
    //request the json from the danbooru url with the tag
    client.snekfetch.get(url).then((r) => {
        let body = r.body;
        //if no results return
        if(!body[0]) return message.channel.send("Couldn't find anything under this tag!");
        let bodyurl = body[0].file_url;
        //send the image in the channel
        message.channel.send({"embed": {
            "title": "danbooru.donmai.us",
            "url": bodyurl,
            "color": 16399236,
            "image": {
                "url": bodyurl
            },
        }});
    });
}