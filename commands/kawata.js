exports.run = (client, message, args, p) => {
    let cfg = client.config;
    let pApi = cfg.kawataProfileApi;
    let tApi = cfg.kawataTopApi;
    let rApi = cfg.kawataRecentApi;
    let pUrl = cfg.kawataPUrl;
    let aviUrl = cfg.kawataAviUrl;
    let nameIndex = 1;
    let argIndex = 0;
    let server = "kawata";

    if(args[argIndex]) {
        let secondArgs = args[argIndex];

        if(secondArgs === "profile" || secondArgs === "p") {
            profile(pApi, aviUrl, pUrl, args, message, client, nameIndex, server);
            return;
        } else
        if(secondArgs === "top" || secondArgs === "t") {
            top(pApi, tApi, pUrl, client, message, args, nameIndex, server);
            return;
        } else
        if(secondArgs === "last" || secondArgs === "l" || secondArgs === "r" || secondArgs === "recent") {
            last(client, message, args, nameIndex, rApi, pApi, server, aviUrl);
            return;
        }
    }
    sendPrivServerHelp(message, "Kawata", p);
    return;
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

function top(pAPI, tAPI, pUrl, client, message, args, nameIndex, server) {
    let username;
    if(args[nameIndex]) {
        username = args.slice(nameIndex).join(" ");
    } else
    if(!args[nameIndex]) {
        username = client.osuNames.get(message.author.id, server);
    }
    if(username === '-') return message.channel.send("Please enter a user");
    if(username.includes("@everyone")) return message.channel.send("Please don't try to abuse the top command by pinging everyone");
    if(username.includes("@here")) return message.channel.send("Please don't try to abuse the top command by pinging everyone");
    if(username.includes("&m=")) return message.channel.send("I'm sorry but the bot doesn't support any other modes than standard");

    let top = tAPI + username.split(' ').join('%20');
    let profile = pAPI + username.split(' ').join('%20');
    let mapAPI = client.config.banchoMapApi;

    if(!username) return message.channel.send("Please enter a user!");
    client.snekfetch.get(profile).then((r) => {
        let bodyp = r.body;
        client.snekfetch.get(top).then((a) => {
            let bodyt = a.body;
            if(!bodyt[0] || !bodyp[0]) return message.channel.send("I either couldn't find this user or they didn't have any top plays");
            let mapn1 =  mapAPI + bodyt[0].beatmap_id;
            client.snekfetch.get(mapn1).then((m1) => {
            let map1 = m1.body;
            if(!bodyt[1]) return message.channel.send("I either couldn't find this user or they didn't have enough top plays");
            let mapn2 = mapAPI + bodyt[1].beatmap_id;
            client.snekfetch.get(mapn2).then((m2) => {
                let map2 = m2.body;
                if(!bodyt[2]) return message.channel.send("I either couldn't find this user or they didn't have enough top plays");
                let mapn3 = mapAPI + bodyt[2].beatmap_id;
                client.snekfetch.get(mapn3).then((m3) => {
                    let map3 = m3.body;
                    let pname = bodyp[0].username;
                    let purl = pUrl + bodyp[0].user_id;

                    let rank1;
                    let rank2;
                    let rank3;

                    rank1 = rankToEmoji(bodyt, 0, client);
                    rank2 = rankToEmoji(bodyt, 1, client);
                    rank3 = rankToEmoji(bodyt, 2, client);

                    let accn1 = accCalculation(bodyt, 0);
                    let acc1 = accCalculation(bodyt, 0).toString().substring(0, 5);
                    let mods1 = modCalculation(client, bodyt, 0);
                    let rawMods1 = bodyt[0].enabled_mods;

                    let accn2 = accCalculation(bodyt, 1);
                    let acc2 = accCalculation(bodyt, 1).toString().substring(0, 5);
                    let mods2 = modCalculation(client, bodyt, 1);
                    let rawMods2 = bodyt[1].enabled_mods;

                    let accn3 = accCalculation(bodyt, 2);
                    let acc3 = accCalculation(bodyt, 2).toString().substring(0, 5);
                    let mods3 = modCalculation(client, bodyt, 2);
                    let rawMods3 = bodyt[2].enabled_mods;

                    client.request('http://osu.ppy.sh/osu/' + map1[0].beatmap_id, (error, response, body1) => {
                        let ifFCPP1 = ifFCPPCalculation(rawMods1, client, bodyt, 0, map1, body1, accn1);
                        let stars1 = srCalculation(rawMods1, body1, client);
                        client.request('http://osu.ppy.sh/osu/' + map2[0].beatmap_id, (error, response, body2) => {
                            let ifFCPP2 = ifFCPPCalculation(rawMods2, client, bodyt, 1, map2, body2, accn2);
                            let stars2 = srCalculation(rawMods2, body2, client);
                            client.request('http://osu.ppy.sh/osu/' + map3[0].beatmap_id, (error, response, body3) => {
                                let ifFCPP3 = ifFCPPCalculation(rawMods3, client, bodyt, 2, map3, body3, accn3);
                                let stars3 = srCalculation(rawMods3, body3, client);

                                let m1t = `${map1[0].artist} - ${map1[0].title} [${map1[0].version}] (${stars1}*)`;
                                let m2t = `${map2[0].artist} - ${map2[0].title} [${map2[0].version}] (${stars2}*)`;
                                let m3t = `${map3[0].artist} - ${map3[0].title} [${map3[0].version}] (${stars3}*)`;
                                let m1d = `PP: ${parseInt(bodyt[0].pp)}pp ${ifFCPP1}\nAccuracy: ${acc1}% (${bodyt[0].count300}/${bodyt[0].count100}/${bodyt[0].count50}/${bodyt[0].countmiss})\nCombo: ${bodyt[0].maxcombo}x / ${map1[0].max_combo}x\n${mods1}Grade:  ${rank1}\nMapper: ${map1[0].creator} | [Download](https://osu.ppy.sh/beatmapsets/${map1[0].beatmapset_id}/download)`
                                let m2d = `PP: ${parseInt(bodyt[1].pp)}pp ${ifFCPP2}\nAccuracy: ${acc2}% (${bodyt[1].count300}/${bodyt[1].count100}/${bodyt[1].count50}/${bodyt[1].countmiss})\nCombo: ${bodyt[1].maxcombo}x / ${map2[0].max_combo}x\n${mods2}Grade:  ${rank2}\nMapper: ${map2[0].creator} | [Download](https://osu.ppy.sh/beatmapsets/${map2[0].beatmapset_id}/download)`
                                let m3d = `PP: ${parseInt(bodyt[2].pp)}pp ${ifFCPP3}\nAccuracy: ${acc3}% (${bodyt[2].count300}/${bodyt[2].count100}/${bodyt[2].count50}/${bodyt[2].countmiss})\nCombo: ${bodyt[2].maxcombo}x / ${map3[0].max_combo}x\n${mods3}Grade:  ${rank3}\nMapper: ${map2[0].creator} | [Download](https://osu.ppy.sh/beatmapsets/${map3[0].beatmapset_id}/download)`

                                message.channel.send({ "embed": {
                                "title": `Top plays from: ${pname}`,
                                "url": purl,
                                "color": 16399236,
                                "fields": [
                                    {
                                    "name": m1t,
                                    "value": m1d
                                    },
                                    {
                                    "name": m2t,
                                    "value": m2d
                                    },
                                    {
                                    "name": m3t,
                                    "value": m3d
                                }]}});

                                });
                            });
                        });
                    });
                });
            });
        });
    });

    return;
}

function last(client, message, args, nameIndex, rAPI, pAPI, server, aviUrl) {
    let username;
    if(args[nameIndex]) {
        username = args.slice(nameIndex).join(" ");
    } else
    if(!args[nameIndex]) {
        username = client.osuNames.get(message.author.id, server);
    }
    if(username === '-') return message.channel.send("Please enter a user");
    if(username.includes("@everyone")) return message.channel.send("Please don't try to abuse the recent command by pinging everyone");
    if(username.includes("@here")) return message.channel.send("Please don't try to abuse the recent command by pinging everyone");
    if(username.includes("&m=")) return message.channel.send("I'm sorry but the bot doesn't support any other modes than standard");

    let recent = rAPI + username.split(' ').join('%20');
    let profile = pAPI + username.split(' ').join('%20');
    let mapAPI = client.config.banchoMapApi;

    if(!username) return message.channel.send("Please enter a user!");
    
    client.snekfetch.get(profile).then((r) => {
        let bodyp = r.body;
        client.snekfetch.get(recent).then((a) => {
            let bodyr = a.body;
            if(!bodyp[0]) return message.channel.send("I couldn't find " + username);
            let pname = bodyp[0].username;
            if(!bodyr[0]) return message.channel.send(pname + " doesn't have any recent plays");
            let mapn = mapAPI + bodyr[0].beatmap_id;
            client.snekfetch.get(mapn).then((m) => {
                let map = m.body;

                let rank = rankToEmoji(bodyr, 0, client);

                let accn = accCalculation(bodyr, 0);
                let acc = accCalculation(bodyr, 0).toString().substring(0, 5);
                let mods = modCalculation(client, bodyr, 0);
                let rawMods = bodyr[0].enabled_mods;

                client.request('http://osu.ppy.sh/osu/' + bodyr[0].beatmap_id, (error, response, body) => {
                    let ifFCPP = ifFCPPCalculation(rawMods, client, bodyr, 0, map, body, accn);
                    let stars = srCalculation(rawMods, body, client);
                    let pp = ppCalculation(rawMods, accn, body, bodyr, 0, client);
                    let mt = `${map[0].artist} - ${map[0].title} [${map[0].version}] (${stars}*)`;
                    let md = `PP: ${pp}pp ${ifFCPP}\nAccuracy: ${acc}% (${bodyr[0].count300}/${bodyr[0].count100}/${bodyr[0].count50}/${bodyr[0].countmiss})\nCombo: ${bodyr[0].maxcombo}x / ${map[0].max_combo}x\n${mods}Grade:  ${rank}\nMapper: ${map[0].creator} | [Download](https://osu.ppy.sh/beatmapsets/${map[0].beatmapset_id}/download)`;
                    message.channel.send({ "embed": {
                        "color": 16399236,
                        "footer": {
                            "icon_url": `${aviUrl}${bodyp[0].user_id}`,
                            "text": `Recent play from: ${pname}`
                        },
                        "thumbnail": {
                            "url": "https://b.ppy.sh/thumb/" + map[0].beatmapset_id + ".jpg"
                        },
                        "fields": [{
                            "name": mt,
                            "value": md
                    }]}});
                });
            });
        });
    });
    return;
}

function rankToEmoji(body, bodyIndex, client) {
    let rank;
    if(body[bodyIndex].rank === 'X') {
        rank = client.config.osuX;
    } else
    if(body[bodyIndex].rank === 'XH') {
        rank = client.config.osuXH;
    }
    if(body[bodyIndex].rank === 'S') {
        rank = client.config.osuS;
    } else
    if(body[bodyIndex].rank === 'SH') {
        rank = client.config.osuSH;
    } else
    if(body[bodyIndex].rank === 'A') {
        rank = client.config.osuA;
    } else
    if(body[bodyIndex].rank === 'B') {
        rank = client.config.osuB;
    } else
    if(body[bodyIndex].rank === 'C') {
        rank = client.config.osuC;
    } else
    if(body[bodyIndex].rank === 'D') {
        rank = client.config.osuF;
    } else
    if(body[bodyIndex].rank === 'F') {
        rank = client.config.osuF;
    }
    return rank;
}

function accCalculation(body, bodyIndex) {
    let acc300s = parseFloat(body[bodyIndex].count300);
    let acc100s = parseFloat(body[bodyIndex].count100);
    let acc50s = parseFloat(body[bodyIndex].count50);
    let accmiss = parseFloat(body[bodyIndex].countmiss);
    let acc = ((acc300s * 300 + acc100s * 100 + acc50s * 50 + accmiss * 0)/((acc300s + acc100s + acc50s + accmiss) * 300) * 100);
    return acc;
}

function modCalculation(client, body, bodyIndex) {
    let rawMods = body[bodyIndex].enabled_mods;
    let mods = client.config.noMod;
    if(rawMods > 0) {
      mods = nearestPow2(rawMods);
    }
    return mods;
}

function nearestPow2(mods) {
    let modlist = [];
    let i = 1;
    while(mods!=0 && i < 50) {
        mod = 1 << 31 - Math.clz32(mods);
        modlist.push(mod);
        mods = mods - mod;
        i++;
    }
  
    replaceIntWithMod(modlist);
    if(modlist.length != 0) return "Mods: " + modlist.join(' ') + " |  ";
}
  
function replaceIntWithMod(a) {
    num = 0;
    while(num <= a.length) {
    if(a.includes(Mods.None)) {
        let i = a.indexOf(Mods.None);
        a[i] = "NoMod";
    } else if(a.includes(Mods.Easy)) {
        let i = a.indexOf(Mods.Easy);
        a[i] = "<:EZ:553697395465125901>";
    } else if(a.includes(Mods.NoFail)) {
        let i = a.indexOf(Mods.NoFail);
        a[i] = "<:NF:553697395691487324>";
    } else if(a.includes(Mods.TouchDevice)) {
        let i = a.indexOf(Mods.TouchDevice);
        a[i] = "Touch Device";
    } else if(a.includes(Mods.Hidden)) {
        let i = a.indexOf(Mods.Hidden);
        a[i] = "<:HD:553697396274757642>";
    } else if(a.includes(Mods.HardRock)) {
        let i = a.indexOf(Mods.HardRock);
        a[i] = "<:HR:553697395322650636>";
    } else if(a.includes(Mods.SuddenDeath)) {
        if(!a.includes(Mods.Perfect)) {
        let i = a.indexOf(Mods.SuddenDeath);
        a[i] = "<:SD:553697395045564427>";
        } else {
        let i = a.indexOf(Mods.SuddenDeath);
        a[i] = "";
        }
    } else if(a.includes(Mods.Relax)) {
        let i = a.indexOf(Mods.Relax);
        a[i] = "<:RX:553697395116867587>";
    } else if(a.includes(Mods.HalfTime)) {
        let i = a.indexOf(Mods.HalfTime);
        a[i] = "<:HT:553697395846938624> ";
    } else if(a.includes(Mods.SpunOut)) {
        let i = a.indexOf(Mods.SpunOut);
        a[i] = "<:SO:553697395490422795>";
    } else if(a.includes(Mods.DoubleTime)) {
        if(!a.includes(Mods.Nightcore)) {
        let i = a.indexOf(Mods.DoubleTime);
        a[i] = "<:DT:553697396677279764> ";
        } else {
        let i = a.indexOf(Mods.DoubleTime);
        a[i] = "";
        }
    } else if(a.includes(Mods.Nightcore)) {
        let i1 = a.indexOf(Mods.Nightcore);
        a[i1] = "<:NC:553697395796344853>";
    } else if(a.includes(Mods.Flashlight)) {
        let i = a.indexOf(Mods.Flashlight);
        a[i] = "<:FL:553697395498549250>";
    } else if(a.includes(Mods.Autoplay)) {
        let i = a.indexOf(Mods.Autoplay);
        a[i] = "<:Auto:553697397444706308>";
    } else if(a.includes(Mods.Relax2)) {
        let i = a.indexOf(Mods.Relax2);
        a[i] = "<:AP:553697395578372126>";
    } else if(a.includes(Mods.Perfect)) {
        let i1 = a.indexOf(Mods.Perfect);
        a[i1] = "<:PF:553697395494617118>";
    } 
    num++;
    }
}

function ppCalculation(mods, accn, requestBody, body, bodyIndex, client) {
    let acc_percent = parseFloat(accn);
    let combo = parseInt(body[bodyIndex].maxcombo);
    let nmiss = parseInt(body[bodyIndex].countmiss);
    
    let parser = new client.ojs.parser().feed(requestBody);
    let map = parser.map;
    let rawStars = new client.ojs.diff().calc({map: map, mods: mods});
  
    let rawPP = client.ojs.ppv2({
      stars: rawStars,
      combo: combo,
      nmiss: nmiss,
      acc_percent: acc_percent,
    });
    let pp = rawPP.total.toFixed(2);
    return pp;
}

function srCalculation(mods, requestBody, client) {
    let parser = new client.ojs.parser().feed(requestBody);
    let map = parser.map;
    let rawStars = new client.ojs.diff().calc({map: map, mods: mods});
    let stars = rawStars.total.toFixed(2);
    return stars;
}

function ifFCPPCalculation(mods, client, body, bodyIndex, mapBody, requestBody, accn) {
    let parser = new client.ojs.parser().feed(requestBody);
    let map = parser.map;
    let rawStars = new client.ojs.diff().calc({map: map, mods: mods});

    let ifFCPP = "";
    if(body[bodyIndex].maxcombo != mapBody[0].max_combo) {
      let comboFC = parseInt(mapBody[0].max_combo);
      let nmissFC = parseInt(0);
      let acc_percent = parseFloat(accn);

      fcPP = client.ojs.ppv2({
        stars: rawStars,
        combo: comboFC,
        nmiss: nmissFC,
        acc_percent: acc_percent,
      });
      ifFCPP = "=> " + fcPP.total.toFixed(2) + "pp";
    }
    return ifFCPP;
}

function sendPrivServerHelp(message, server, p) {
    message.channel.send({"embed": {
        "description": "**" + server + ":** \n\nusage: " + p + "osu " + server +" <command>\n\nprofile <name>: ``sends a " + server + " profile card``\nlast <name>: ``sends recent plays of entered user``\ntop <name> ``sends top plays of entered user``\n\naliases: p, l, t",
        "color": 16399236
    }});
}

var Mods =
{
	None           : 0,
	NoFail         : 1,
	Easy           : 2,
	TouchDevice    : 4,
	Hidden         : 8,
	HardRock       : 16,
	SuddenDeath    : 32,
	DoubleTime     : 64,
	Relax          : 128,
	HalfTime       : 256,
	Nightcore      : 512, // Nightcore in theory always comes with DT
	Flashlight     : 1024,
	Autoplay       : 2048,
	SpunOut        : 4096,
	Relax2         : 8192,	// Autopilot
	Perfect        : 16384, // Only set along with SuddenDeath. i.e: PF only gives 16416  
	Key4           : 32768,
	Key5           : 65536,
	Key6           : 131072,
	Key7           : 262144,
	Key8           : 524288,
	FadeIn         : 1048576,
	Random         : 2097152,
	Cinema         : 4194304,
	Target         : 8388608,
	Key9           : 16777216,
	KeyCoop        : 33554432,
	Key1           : 67108864,
	Key3           : 134217728,
	Key2           : 268435456,
	ScoreV2        : 536870912,
	LastMod        : 1073741824,
        KeyMod : 67108864 | 268435456 | 134217728 | 32768 | 65536 | 131072 | 262144 | 524288 | 16777216 | 33554432,
        FreeModAllowed : 1 | 2 | 8 | 16 | 32 | 1024 | 1048576 | 128 | 8192 | 4096 | 67108864 | 268435456 | 134217728 | 32768 | 65536 | 131072 | 262144 | 524288 | 16777216 | 33554432,
        ScoreIncreaseMods : 8 | 16 | 64 | 1024 | 1048576
}
