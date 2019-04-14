exports.run = async (client, message, args, p) => {
    let cfg = client.config;
    
    if(!args[0]) return message.channel.send("Please tell me what you want to search for");
    
    let query = args.join(" ");

    if(query.includes("@everyone")) return message.channel.send("Don't be an asshole and try to annoy everyone");
    if(query.includes("@here")) return message.channel.send("Don't be an asshole and try to annoy everyone");

    let search = cfg.youtubeSearchApi + query + "&key=" + cfg.googleToken;

    let res = await client.snekfetch.get(search);
    let body = await res.body;
    if(!body.items[0]) return message.channel.send("I couldn't find anything under " + query);
    let i = 0;
    while(body.items[i].id.kind !== "youtube#video" && body.items[i]) {
        i++;
    }
    if(!body.items[i]) return message.channel.send("I couldn't find anything under" + query);
    let videoId = body.items[i].id.videoId;

    message.channel.send(`Result for \`${query}\`: ` + "http://youtu.be/" + videoId);
}