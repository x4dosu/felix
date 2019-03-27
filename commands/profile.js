exports.run = (client, message, args, p) => {
    let cfg = client.config;
    let pApi = cfg.banchoProfileApi;
    let pUrl = cfg.banchoPUrl;
    let aviUrl = cfg.banchoAviUrl;
    let nameIndex = 0;
    let server = "bancho";

    profile(pApi, aviUrl, pUrl, args, message, client, nameIndex, server);
}

function profile(pAPI, aviUrl, pUrl, args, message, client, nameIndex, server) {
    let username;
    if(args[nameIndex]) {
        username = args.slice(nameIndex).join(" ");
    } else
    if(!args[nameIndex]) {
        username = client.osuNames.get(message.author.id, server);
    }
    if(username === '-') return message.channel.send("Please enter a user");
    if(username.includes("@everyone")) return message.channel.send("Please don't try to abuse the profile command by pinging everyone");
    if(username.includes("@here")) return message.channel.send("Please don't try to abuse the profile command by pinging everyone");

    let profile = pAPI + username.split(' ').join('%20');

    if(!username) return message.channel.send("Please enter a user!");
    client.snekfetch.get(profile).then((r) => {
        let body = r.body;
        if(!body[0]) return message.channel.send("I couldn't find " + username);
        let bodyname = body[0].username;
        let bodygrank = body[0].pp_rank;
        let bodycrank = body[0].pp_country_rank;
        let bodycountry = body[0].country;
        let bodyid = body[0].user_id;
        let bodyppraw = body[0].pp_raw;
        let bodypp = parseInt(bodyppraw);
        let bodyacc = body[0].accuracy;
        let bodyplaycount = body[0].playcount;
        let bodylevel = parseInt(body[0].level);
        message.channel.send({"embed": {
            "title": `Name: ${bodyname}`,
            "description": `**PP:** ${bodypp}pp
**Accuracy:** ${bodyacc.substring(0, 5)}%
**Global Rank:** #${bodygrank}
**Country Rank:** #${bodycrank} (${bodycountry})
**Level**: ${bodylevel} | **Playcount**: ${bodyplaycount}`,
            "url": `${pUrl}${bodyid}`,
            "color": 16399236,
            "thumbnail": {
              "url": `${aviUrl}${bodyid}`
            }
        }});
    });
    return;
}