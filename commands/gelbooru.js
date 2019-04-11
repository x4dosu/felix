exports.run = (client, message, args, p) => {
    //join the args with a + and put them to lower case
    let tag = args.join("+").toLowerCase();
    //if you dont have nsfw+ enabled check these things
    if(client.specialNSFW.get(message.author.id, "nsfw") === false) {
        //if its not an nsfw channel
        if(message.channel.nsfw === false) return message.reply("You can't use this command here!");
        //if the tags include loli toddlercon shota or child
        if(tag.includes("loli")) return message.channel.send("Don't get me banned!");
        if(tag.includes("toddlercon")) return message.channel.send("Don't get me banned!");
        if(tag.includes("shota")) return message.channel.send("Don't get me banned!");
        if(tag.includes("child")) return message.channel.send("Don't get me banned!");
    }
    //put the url with the tags together 
    let url = client.config.gelbooru + tag;
    //request the body
    client.request(url, (error, response, body) => {
        //if no error
        if (!error) {
            //parse the xml body to json
            body = client.xmlParser.toJson(body)
            //format it a bit better before its just plain text now its actual json
            body = JSON.parse(body);
            let totalSites;
            let site;
            /*if the total count is lower than 20000 we divide by 100 
            this is because if the count is above 20000 the max sites are 200*/
            if(body.posts.count < 20000) {
                totalSites = body.posts.count / 100;
            } else {
                totalSites = 200;
            }
            //if the total sites are 1 or less then the site is 0
            if(totalSites <= 1) {
                site = 0;
            //otherwise its a random number 0 - totalSites
            } else {
                site = client.functions.getRandomInt(totalSites);
            }
            //put the original url with pageID and the site number together
            url = url + "&pid=" + site;
            //request the random site
            client.request(url, (error, response, body) => {
                //again parse the body and turn it from plain text to json
                body = client.xmlParser.toJson(body)
                body = JSON.parse(body);
                //if no post then return
                if(!body.posts.post) return message.channel.send("Couldn't find anything under this tag!");
                //post randomizer
                let i = client.functions.getRandomInt(body.posts.post.length);
                //get the file url
                let bodyurl = body.posts.post[i].file_url;       
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
        }
    });
}