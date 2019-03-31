exports.run = (client, message, args, p) => {
    let cfg = client.config;
    
    if(!args[0]) return message.channel.send("Please tell me what you want to search for");
    
    let query = args.join(" ");

    if(query.includes("@everyone")) return message.channel.send("Don't be an asshole and try to annoy everyone");
    if(query.includes("@here")) return message.channel.send("Don't be an asshole and try to annoy everyone");

    let search = cfg.youtubeSearchApi + query + "&key=" + cfg.googleToken;

    client.snekfetch.get(search).then((r) => {
        let body = r.body;
        if(!body.items[0]) return message.channel.send("I couldn't find anything under " + query);
        let i = 0;
        while(body.items[i].id.kind !== "youtube#video" && body.items[i]) {
            i++;
        }
        if(!body.items[i]) return message.channel.send("I couldn't find anything under" + query);

        let title = body.items[i].snippet.title;
        let description = body.items[i].snippet.description;
        if(title.includes("@everyone") || title.includes("@here")) {
            title = "dont ping";
        }
        if(description.includes("@everyone") || description.includes("@here")) {
            description = "dont ping";
        }
        let videoId = body.items[i].id.videoId;

        message.channel.send({
            "embed": {
                "title": title,
                "description": description,
                "url": "http://youtu.be/" + videoId,
                "color": 16585491,
                "image": {
                    "url": "https://i.ytimg.com/vi/" + videoId + "/mqdefault.jpg"
                }
            }
        });
    });
}