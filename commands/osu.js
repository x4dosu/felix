exports.run = (client, message, args, p) => {
    let cfg = client.config;
    //if there are first args
    if(args[0]) {
        let firstArgs = args[0].toLowerCase();
        //if the first args are bloodcat or b
        if(firstArgs === "bloodcat" || firstArgs === "b" || firstArgs === "bc") {
            //if there are second ares
            if(args[1]) {
                let secondArgs = args[1].toLowerCase();
                //if the secondas args are top or t
                if(secondArgs === "top" || secondArgs === "t") {
                    //request the json from the bloodcat api
                    client.snekfetch.get(cfg.bloodcatApi).then((r) => {
                        let body = r.body;
                        //if no content return
                        if(!body[0]) return message.channel.send("Couldn't find any maps! Please report this to the developer Felix#9385");
                        //send top maps in channel
                        message.channel.send({"embed": {
                            "title": "Top beatmaps on Bloodcat:",
                            "color": 16399236,
                            "fields": [{
                                "name": body[0].title + " by " + body[0].artist + " mapped by " + body[0].creator,
                                "value": "[Download](https://bloodcat.com/osu/s/" + body[0].id + ")"
                            },
                            {
                                "name": body[1].title + " by " + body[1].artist + " mapped by " + body[1].creator,
                                "value": "[Download](https://bloodcat.com/osu/s/" + body[1].id + ")"
                            },
                            {
                                "name": body[2].title + " by " + body[2].artist + " mapped by " + body[2].creator,
                                "value": "[Download](https://bloodcat.com/osu/s/" + body[2].id + ")"
                            },
                            {
                                "name": body[3].title + " by " + body[3].artist + " mapped by " + body[3].creator,
                                "value": "[Download](https://bloodcat.com/osu/s/" + body[3].id + ")"
                            },
                            {
                                "name": body[4].title + " by " + body[4].artist + " mapped by " + body[4].creator,
                                "value": "[Download](https://bloodcat.com/osu/s/" + body[4].id + ")"
                        }]}});
                  });
                  return;
                } else
                //if secondargs are search or s
                if(secondArgs === "search" || secondArgs === "s") {
                    let mapName = args.slice(2).join(" ");
                    //if the map name starts with status then it should get put at the end of the map name
                    if(mapnName.startsWith('status=')) {
                        let arr = mapname.split(' ');
                        let removed = arr.shift();
                        mapName = arr.join(' ').trim() + removed.trim();
                    }
                    //if it includes @everyone etc return
                    if(mapName.includes("@everyone")) return message.channel.send("Please don't try to abuse the search command by pinging everyone");
                    if(mapName.includes("@here")) return message.channel.send("Please don't try to abuse the search command by pinging everyone");
                    
                    let finalMapName = mapNameCutter(mapName);

                    //put the bloodcat api url and map name together and replace status= with the following things
                    let map = cfg.bloodcatApi + finalMapName; 
                    message.channel.send(map);
                    //if no mapname return
                    if(!mapName) return message.channel.send("Please enter the name of a Beatmap!");
                    //request the json
                    client.snekfetch.get(map).then((r) => {
                        let body = r.body;
                        //if no content return
                        if(!body[0]) return message.channel.send("Couldn't find this map!");
                        let bodyID = body[0].id;
                        let bodyTitle = body[0].title;
                        let bodyArtist = body[0].artist;
                        let bodyCreator = body[0].creator;
                        //send top result
                        message.channel.send({"embed": {
                            "title": "**Title:** " + bodyTitle,
                            "description": "**Artist:** " + bodyArtist + "**\nCreator:** " + bodyCreator,
                            "url": "https://bloodcat.com/osu/s/" + bodyID,
                            "color": 16399236
                        }});
                        //if you want just the body use this: console.log(JSON.stringify(r.body[0]));
                    });
                    return;
                }
            }
            message.channel.send({"embed": {
                "description": "**Bloodcat:**\n\n**NOTICE: IF THE BOT DOESN'T REPLY THEN THAT IS BLOODCAT'S FAULT CHECK THEIR SITE**\n\nusage: " + p + "osu bloodcat <command>\n\nsearch <map name> <status=r|a|q|l|g>: ``search a map on bloodcat and (optional) choose the status``\ntop: ``lists top maps on bloodcat``\n\naliases: s, t",
                "color": 16399236
            }});
            return;
        } else 
        //most of the code below this is just filling some functions that are below all of this so I'm not going to document it
        if(firstArgs === "profile" || firstArgs === "p") {
            profile(cfg.banchoProfileApi, cfg.banchoAviUrl, cfg.banchoPUrl, args, message, client, 1, "bancho");
            return;
        } else
        if(firstArgs === "top" || firstArgs === "t") {
            top(cfg.banchoProfileApi, cfg.banchoTopApi, cfg.banchoPUrl, client, message, args, 1, "bancho");
            return;
        } else
        if(firstArgs === "recent" || firstArgs === "r" || firstArgs === "l" || firstArgs === "last") {
            last(client, message, args, 1, cfg.banchoRecentApi, cfg.banchoProfileApi, "bancho", "https://a.ppy.sh/");
            return;
        } else
        //the private server commands are all the same and easy to understand so yea just read through them i wont document them
        if(firstArgs === "akatsuki" || firstArgs === "a") {
            let pApi = cfg.akatsukiProfileApi;
            let tApi = cfg.akatsukiTopApi;
            let rApi = cfg.akatsukiRecentApi;
            let pUrl = cfg.akatsukiPUrl;
            let aviUrl = cfg.akatsukiAviUrl;
            let nameIndex = 2;
            let server = "akatsuki";

            if(args[1]) {
                let secondArgs = args[1];

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
            sendPrivServerHelp(message, "Akatsuki", p);
            return;
        } else
        if(firstArgs === "ripple" || firstArgs === "ri") {
            let pApi = cfg.rippleProfileApi;
            let tApi = cfg.rippleTopApi;
            let rApi = cfg.rippleRecentApi;
            let pUrl = cfg.ripplePUrl;
            let aviUrl = cfg.rippleAviUrl;
            let nameIndex = 2;
            let server = "ripple";

            if(args[1]) {
                let secondArgs = args[1];

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
            sendPrivServerHelp(message, "Ripple", p);
            return;
        } else
        if(firstArgs === "kurikku" || firstArgs === "ku") {
            let pApi = cfg.kurikkuProfileApi;
            let tApi = cfg.kurikkuTopApi;
            let rApi = cfg.kurikkuRecentApi;
            let pUrl = cfg.kurikkuPUrl;
            let aviUrl = cfg.kurikkuAviUrl;
            let nameIndex = 2;
            let server = "kurikku";

            if(args[1]) {
                let secondArgs = args[1];

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
            sendPrivServerHelp(message, "Kurikku", p);
            return;
        } else
        if(firstArgs === "enshi" || firstArgs === "es") {
            let pApi = cfg.enshiProfileApi;
            let tApi = cfg.enshiTopApi;
            let rApi = cfg.enshiRecentApi;
            let pUrl = cfg.enshiPUrl;
            let aviUrl = cfg.enshiAviUrl;
            let nameIndex = 2;
            let server = "enshi";

            if(args[1]) {
                let secondArgs = args[1];

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
            sendPrivServerHelp(message, "Enshi", p);
            return;
        } else 
        if(firstArgs === "enjuu" || firstArgs === "ej") {
            let pApi = cfg.enjuuProfileApi;
            let tApi = cfg.enjuuTopApi;
            let rApi = cfg.enjuuRecentApi;
            let pUrl = cfg.enjuuPUrl;
            let aviUrl = cfg.enjuuAviUrl;
            let nameIndex = 2;
            let server = "enjuu";

            if(args[1]) {
                let secondArgs = args[1];

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
            sendPrivServerHelp(message, "Enjuu", p);
            return;
        } else
        if(firstArgs === "kawata" || firstArgs === "ka") {
            let pApi = cfg.kawataProfileApi;
            let tApi = cfg.kawataTopApi;
            let rApi = cfg.kawataRecentApi;
            let pUrl = cfg.kawataPUrl;
            let aviUrl = cfg.kawataAviUrl;
            let nameIndex = 2;
            let server = "kawata";

            if(args[1]) {
                let secondArgs = args[1];

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
        } else
        /*below are the gatari things before i get into them i wanted to say
        a big thanks to sarah otherwise i wouldve never included gatari cause
        of their shit api and cause the admins didn't know shit about their
        api probably the developer wouldve known about it but luckily sarah
        helped me out the api isn't like the api of all other servers
        and it took me a lot of hours to do this so yea im sorry that the
        gatari commands don't include everything like pp calculation & sr for
        the top command but i really am sick of their shit btw pls give me gatari key
        */
        if(firstArgs === 'gatari' || firstArgs === 'g') {
            if(args[1]) {
                let secondargs = args[1].toLowerCase();
                //if secondsargs are profile
                if(secondargs === 'profile' || secondargs === 'p') {
                    let pusername;
                    //if the user entered a name
                    if(args[2]) {
                        pusername = args.slice(2).join(" ");
                    } else
                    //if the user didnt enter a name
                    if(!args[2]) {
                        pusername = client.osuNames.get(message.author.id, "gatari");
                    }
                    //if the name is left on default
                    if(pusername === '-') return message.channel.send("Please enter a user");
                    //anti ping stuff
                    if(pusername.includes("@everyone")) return message.channel.send("Please don't try to abuse the profile command by pinging everyone");
                    if(pusername.includes("@here")) return message.channel.send("Please don't try to abuse the profile command by pinging everyone");
            
                    let profileOld = cfg.gatariOldProfileApi + pusername.split(' ').join('%20');
                    //why is this here im stupid whatever
                    if(!pusername) return message.channel.send("Please enter a user!");
                    //request the old api profile json
                    client.request(profileOld, {json:true}, (err, res, body) => { 
                        //if couldn't find anyone
                        if(body.stats.id === 0) return message.channel.send("I couldn't find " + pusername);
                        let bodyname = body.stats.username;
                        let bodygrank = body.stats.rank;
                        let bodycountry = body.stats.country;
                        let bodyid = body.stats.id;
                        let bodypp = parseInt(body.stats.pp);
                        let bodyacc = body.stats.accuracy.toString();
                        let bodylevel = parseInt(body.stats.level);
                        let profile = cfg.gatariProfileApi + bodyid;

                        //request the new profile api json thing im gay
                        client.request(profile, {json:true}, (err, res, body) => {
                            let bodycrank = body.stats.country_rank;
                            let bodyplaycount = body.stats.playcount;
                            //send the profile embed
                            message.channel.send({"embed": {
                                "title": `Name: ${bodyname}`,
                                "description": `**PP:** ${bodypp}pp
**Accuracy:** ${bodyacc.substring(0, 5)}%
**Global Rank:** #${bodygrank}
**Country Rank:** #${bodycrank} (${bodycountry})
**Level**: ${bodylevel} | **Playcount**: ${bodyplaycount}`,
                                "url": `https://osu.gatari.pw/u/${bodyid}`,
                                "color": 16399236,
                                "thumbnail": {
                                "url": `http://a.gatari.pw/${bodyid}`
                                }
                            }});
                        });
                    });
                    return;
                } else
                //if secodnsargs last or recent or whatever
                if(secondargs === 'last' || secondargs === 'l' || secondargs === 'r' || secondargs === 'recent') {
                    let tusername;
                    //if name entered
                    if(args[2]) {
                        tusername = args.slice(2).join(" ");
                    } else
                    //if no name entered get default name from api
                    if(!args[2]) {
                        tusername = client.osuNames.get(message.author.id, "gatari");
                    }
                    //if default
                    if(tusername === '-') return message.channel.send("Please enter a user");
                    //anti ping stuff
                    if(tusername.includes("@everyone")) return message.channel.send("Please don't try to abuse the top command by pinging everyone");
                    if(tusername.includes("@here")) return message.channel.send("Please don't try to abuse the top command by pinging everyone");
                    //make sure users dont try to change the mode idk if this works for gatari api was too lazy to try XD
                    if(tusername.includes("&m=")) return message.channel.send("I'm sorry but the bot doesn't support any other modes than standard");
                    
                    let profile = cfg.gatariOldProfileApi + tusername.split(' ').join('%20');
                    //lol
                    if(!tusername) return message.channel.send("Please enter a user!");
                    //request old profile
                    client.snekfetch.get(profile).then((r) => {
                        let bodyp = r.body;
                        //if no user found
                        if(bodyp.stats.id === 0) return message.channel.send("I couldn't find " + tusername);
                        let last = cfg.gatariRecentApi + bodyp.stats.id;
                        //request last json
                        client.snekfetch.get(last).then((r) => {
                            let bodyr = r.body;
                            //if no last plays
                            if(!bodyr.scores[0]) return message.channel.send(tusername + " doesn't seem to have any recent plays");
                            let pname = bodyp.stats.username;

                            //replace the grade to emojis
                            let rank = rankToEmojiGatariEdition(bodyr.scores, 0, client);
                            
                            let accRaw = bodyr.scores[0].accuracy;
                            let acc = accRaw.toString().substring(0, 5);
                            
                            //get mods & replace mods with emojis if no mod then no mod
                            let rawMods = bodyr.scores[0].mods; 
                            let mods = cfg.noMod;
                            if(rawMods > 0) {
                                mods = nearestPow2(rawMods);
                            }
                            
                            //request the beatmap for pp calculation and sr calculation
                            client.request('http://osu.ppy.sh/osu/' + bodyr.scores[0].beatmap.beatmap_id, (error, response, body) => {
                                let modsr = rawMods;
                                let acc_percent = parseFloat(accRaw);
                                let combo = parseInt(bodyr.scores[0].max_combo);
                                let nmiss = parseInt(bodyr.scores[0].count_miss);
                                //feed the parser with the html body from the url
                                let parser = new client.ojs.parser().feed(body);
                                //parse the map
                                let mapr = parser.map;
                                //calculate stars
                                let rawStars = new client.ojs.diff().calc({map: mapr, mods: modsr});
                                //calculate pp
                                let rawPP = client.ojs.ppv2({
                                    stars: rawStars,
                                    combo: combo,
                                    nmiss: nmiss,
                                    acc_percent: acc_percent,
                                });
            
                                let ifFCPP = "";
                                //if not fc calculate pp if fc
                                if(bodyr.scores[0].max_combo != bodyr.scores[0].beatmap.fc) {
                                    let comboFC = parseInt(bodyr.scores[0].beatmap.fc);
                                    let nmissFC = parseInt(0);
                                    //calculate if fc pp
                                    fcPP = client.ojs.ppv2({
                                        stars: rawStars,
                                        combo: comboFC,
                                        nmiss: nmissFC,
                                        acc_percent: acc_percent,
                                    });
                                    
                                    ifFCPP = "=> " + fcPP.total.toFixed(2) + "pp";
                                }
                                //remove decimal stuff from stars & pp
                                let stars = rawStars.total.toFixed(2);
                                let pp = rawPP.total.toFixed(2);

                                let mt = bodyr.scores[0].beatmap.song_name + ` (${stars}*)`;
                                let md = `PP: ${pp}pp ${ifFCPP}\nAccuracy: ${acc}% (${bodyr.scores[0].count_300}/${bodyr.scores[0].count_100}/${bodyr.scores[0].count_50}/${bodyr.scores[0].count_miss})\nCombo: ${bodyr.scores[0].max_combo}x / ${bodyr.scores[0].beatmap.fc}x\n${mods}Grade:  ${rank}\n[Download](https://osu.ppy.sh/beatmapsets/${bodyr.scores[0].beatmap.beatmapset_id}/download)`;
                                //send last plays in channel
                                message.channel.send({ "embed": {
                                "color": 16399236,
                                "footer": {
                                    "icon_url": `https://a.gatari.pw/${bodyp.stats.id}`,
                                    "text": `Recent play from: ${pname}`
                                },
                                "thumbnail": {
                                    "url": "https://b.ppy.sh/thumb/" + bodyr.scores[0].beatmap.beatmapset_id + ".jpg"
                                },
                                "fields": [
                                    {
                                    "name": mt,
                                    "value": md
                                    }
                                ]
                                }});
                            });
                        });
                    });
                    return;
                    } else
                    if(secondargs === 'top' || secondargs === 't') {
                        let tusername;
                        //if username entered
                        if(args[2]) {
                            tusername = args.slice(2).join(" ");
                        } else
                        //if no username
                        if(!args[2]) {
                            tusername = client.osuNames.get(message.author.id, "gatari");
                        }
                        //why do i even document this no one will read it anyways
                        if(tusername === '-') return message.channel.send("Please enter a user");
                        if(tusername.includes("@everyone")) return message.channel.send("Please don't try to abuse the top command by pinging everyone");
                        if(tusername.includes("@here")) return message.channel.send("Please don't try to abuse the top command by pinging everyone");
                        if(tusername.includes("&m=")) return message.channel.send("I'm sorry but the bot doesn't support any other modes than standard")
            
                        let profile = cfg.gatariOldProfileApi + tusername.split(' ').join('%20');
            
                        if(!tusername) return message.channel.send("Please enter a user!");
                        //request profile etc pretty mcuh the same as the rest no gonna document lol
                        client.snekfetch.get(profile).then((r) => {
                            let bodyp = r.body;
                            if(bodyp.stats.id === 0) return message.channel.send("I couldn't find " + tusername);
                            let top = cfg.gatariTopApi + bodyp.stats.id;
                            client.snekfetch.get(top).then((r) => {
                                let bodyt = r.body;
                                if(!bodyt.scores[0]) return message.channel.send(tusername + " doesn't seem to have any top plays");
                                if(!bodyt.scores[1]) return message.channel.send(tusername + " doesn't seem to have any top plays");
                                if(!bodyt.scores[2]) return message.channel.send(tusername + " doesn't seem to have any top plays");
                                let pname = bodyp.stats.username;
                                let purl = "https://osu.gatari.pw/u/" + bodyp.stats.id;
                                let m1t = bodyt.scores[0].beatmap.song_name;
                                let m2t = bodyt.scores[1].beatmap.song_name;
                                let m3t = bodyt.scores[2].beatmap.song_name;

                                let rank1 = rankToEmojiGatariEdition(bodyt.scores, 0, client);
                                let rank2 = rankToEmojiGatariEdition(bodyt.scores, 1, client);
                                let rank3 = rankToEmojiGatariEdition(bodyt.scores, 2, client);
                
                                let accRaw1 = bodyt.scores[0].accuracy;
                                let accRaw2 = bodyt.scores[1].accuracy;
                                let accRaw3 = bodyt.scores[2].accuracy;
                
                                let acc1 = accRaw1.toString().substring(0, 5);
                                let acc2 = accRaw2.toString().substring(0, 5);
                                let acc3 = accRaw3.toString().substring(0, 5);
                
                                let rawMods1 = bodyt.scores[0].mods;
                                let mods1 = cfg.noMod;
                                if(rawMods1 > 0) {
                                    mods1 = nearestPow2(rawMods1);
                                }
                
                                let rawMods2 = bodyt.scores[1].mods;
                                let mods2 = cfg.noMod;
                                if(rawMods2 > 0) {
                                    mods2 = nearestPow2(rawMods2);
                                }
                
                                let rawMods3 = bodyt.scores[2].mods;
                                let mods3 = cfg.noMod;
                                if(rawMods3 > 0) {
                                    mods3 = nearestPow2(rawMods3);
                                }
                
                                let m1d = `PP: ${parseInt(bodyt.scores[0].pp)}pp\nAccuracy: ${acc1}% (${bodyt.scores[0].count_300}/${bodyt.scores[0].count_100}/${bodyt.scores[0].count_50}/${bodyt.scores[0].count_miss})\nCombo: ${bodyt.scores[0].max_combo}x / ${bodyt.scores[0].beatmap.fc}x\n${mods1}Grade:  ${rank1}\n[Download](https://osu.ppy.sh/beatmapsets/${bodyt.scores[0].beatmap.beatmapset_id}/download)`;
                                let m2d = `PP: ${parseInt(bodyt.scores[1].pp)}pp\nAccuracy: ${acc2}% (${bodyt.scores[1].count_300}/${bodyt.scores[1].count_100}/${bodyt.scores[1].count_50}/${bodyt.scores[1].count_miss})\nCombo: ${bodyt.scores[1].max_combo}x / ${bodyt.scores[1].beatmap.fc}x\n${mods2}Grade:  ${rank2}\n[Download](https://osu.ppy.sh/beatmapsets/${bodyt.scores[1].beatmap.beatmapset_id}/download)`;
                                let m3d = `PP: ${parseInt(bodyt.scores[2].pp)}pp\nAccuracy: ${acc3}% (${bodyt.scores[2].count_300}/${bodyt.scores[2].count_100}/${bodyt.scores[2].count_50}/${bodyt.scores[2].count_miss})\nCombo: ${bodyt.scores[2].max_combo}x / ${bodyt.scores[2].beatmap.fc}x\n${mods3}Grade:  ${rank3}\n[Download](https://osu.ppy.sh/beatmapsets/${bodyt.scores[2].beatmap.beatmapset_id}/download)`;
                
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
                                    }
                                    ]
                                }});
                            });
                        });
                    return;
                }
            }
            //if no args send help
            message.channel.send({"embed": {
                "description": "**gatari:** \n\nusage: " + p + "osu gatari <command>\n\nprofile <name>: ``sends a gatari profile card``\nlast <name>: ``sends recent plays of entered user``\ntop <name> ``sends top plays of entered user``\n\naliases: p, l, t",
                "color": 16399236
            }});
            return;
        } else
        //this is to set your name
        if(firstArgs === 'set' || firstArgs === 's') {
            //if no second or third arg return
            if(!args[1] || !args[2]) return message.channel.send(`Usage: ${p}osu set <bancho|akatsuki|ripple|gatari|kurikku|enshi|enjuu|kawata> <name>`);
            //if it includes ping thing return
            if(message.content.includes("@everyone") || message.content.includes("@here")) return message.channel.send("Please don't try to ping everyone");

            let [...value] = args.splice(2);
            let prop = args[1].toLowerCase();
            //if the property doesn't exist return            
            if(!client.osuNames.has(message.author.id, prop)) {
                return message.channel.send(`Usage: ${p}osu set <bancho|akatsuki|ripple|gatari|kurikku|enshi|enjuu|kawata> <name>`);
            }
            //set the name for entered server from the user
            client.osuNames.set(message.author.id, value.join(" "), prop);
            //send message in channel
            message.channel.send(`Your username on ${prop} has been changed to \`\`${value.join(" ")}\`\``);
            return;
        } else
        //this is to list your usernames
        if(firstArgs === "name" || firstArgs === 'n' || firstArgs === "names") {
            //send list of names in channel
            message.channel.send({ "embed": {
                "title": "Your usernames:",
                "description": `\`\`\`coffeescript\nbancho =-> ${client.osuNames.get(message.author.id, 'bancho')}\n\nakatsuki =-> ${client.osuNames.get(message.author.id, 'akatsuki')}\n\nripple =-> ${client.osuNames.get(message.author.id, 'ripple')}\n\ngatari =-> ${client.osuNames.get(message.author.id, 'gatari')}\n\nkurikku =-> ${client.osuNames.get(message.author.id, 'kurikku')}\n\nenshi =-> ${client.osuNames.get(message.author.id, 'enshi')}\n\nenjuu =-> ${client.osuNames.get(message.author.id, 'enjuu')}\n\nkawata =-> ${client.osuNames.get(message.author.id, 'kawata')}\`\`\``,
                "color": 10443476
            }});
            return;
        } else
        if(firstArgs === "maps" || firstArgs === "m") {
            let username;
            //if someone entered a username
            if(args[1]) {
                username = args.slice(1).join(" ");
            } else
            //else if there is no username get the default username from the database
            if(!args[1]) {
                username = client.osuNames.get(message.author.id, "bancho");
            }
            //if the user hasn't changed his username in the database then
            if(username === '-') return message.channel.send("Please enter a user");
            //if the username includes ping stuff return
            if(username.includes("@everyone")) return message.channel.send("Please don't try to abuse the top command by pinging everyone");
            if(username.includes("@here")) return message.channel.send("Please don't try to abuse the top command by pinging everyone");
    
            let profile = cfg.banchoProfileApi + username;
            let maps = cfg.banchoUserMapApi + username;

            //request the maps
            client.snekfetch.get(maps).then((r) => {
                i = 1;
                let rawBody = r.body;
                //sort the map by newest
                let body = client._.sortBy(rawBody, function(o) { 
                    return o.last_update; 
                }).reverse();
                //if no maps return
                if(!body[0]) return message.channel.send(username + " doesn't have enough maps for me to show");
                let map1 = body[0].beatmapset_id;
                let map2;
                let map3;
                let map4;
                /*the code below this is complicated so I'll try to simplify it:
                the map sets aren't just map sets but they're single maps and so that I can get the 
                newest sets I have to only get one map from each set and this is what the code below is for
                I could've made something that give output even if there are less than 4 maps but I'm too lazy
                */
                if(body[++i]) {
                    if(!body[i]) return;
                    //while the beatmapset id is the same as the beatmapset id of the previous map add one to i 
                    while(body[i].beatmapset_id == map1 && body[i]) {
                        i++
                        //if there is no map return
                        if(!body[i]) return message.channel.send(username + " doesn't have enough maps for me to show");
                    }
                    //now make the mapset after the last mapset map2
                    map2 = body[i].beatmapset_id;
                //if the bot can't even find a map after map1 return (if map1 doesn't have more than one difficulty)
                } else return message.channel.send(username + " doesn't have enough maps for me to show");
                //this is the same just with map3
                if(body[++i]) {
                    while(body[i].beatmapset_id == map2 && body[i]) {
                        i++
                        if(!body[i]) return message.channel.send(username + " doesn't have enough maps for me to show");
                    }
                    map3 = body[i].beatmapset_id; 
                } else return message.channel.send(username + " doesn't have enough maps for me to show");
                if(body[++i]) { 
                    while(body[i].beatmapset_id == map3 && body[i]) {
                        i++
                        if(!body[i]) return message.channel.send(username + " doesn't have enough maps for me to show");
                    }
                    map4 = body[i].beatmapset_id;
                } else return message.channel.send(username + " doesn't have enough maps for me to show");
                //now we put the map set ids together with the bancho map set url
                let mapAPI1 = cfg.banchoSetApi + map1;
                let mapAPI2 = cfg.banchoSetApi + map2;
                let mapAPI3 = cfg.banchoSetApi + map3;
                let mapAPI4 = cfg.banchoSetApi + map4;
                //then we request the maps
                client.snekfetch.get(mapAPI1).then((r) => {
                    let mapn1 = r.body;
                    client.snekfetch.get(mapAPI2).then((r) => {
                        let mapn2 = r.body;
                        client.snekfetch.get(mapAPI3).then((r) => {
                            let mapn3 = r.body;
                            client.snekfetch.get(mapAPI4).then((r) => {
                                let mapn4 = r.body;
                                //now we request the profile for the user id and username
                                client.snekfetch.get(profile).then((r) => {
                                    let bodyp = r.body;
                                    if(!bodyp[0]) return message.channel.send("I couldn't find " + username);
                                    let pname = bodyp[0].username;
                                    let pid = bodyp[0].user_id;
                                    let pfp = "https://a.ppy.sh/" + pid;
                                    //we convert the status (numbers) to a readable string
                                    let status1 = getStatus(mapn1);
                                    let status2 = getStatus(mapn2);
                                    let status3 = getStatus(mapn3);
                                    let status4 = getStatus(mapn4);
                                    //we convert the difficulties to emojis
                                    let diffIcons1 = diffInIcon(mapn1);
                                    let diffIcons2 = diffInIcon(mapn2);
                                    let diffIcons3 = diffInIcon(mapn3);
                                    let diffIcons4 = diffInIcon(mapn4);
                                    //now we send the newest four maps of entered user in the channel
                                    message.channel.send({
                                        "embed": {
                                        "title": `Beatmaps from ${pname}:`,
                                        "url": `https://osu.ppy.sh/users/${pid}`,
                                        "color": 16399236,
                                        "footer": {
                                            "icon_url": pfp,
                                            "text": pname
                                        },
                                        "fields": [
                                            {
                                            "name": `${mapn1[0].artist} - ${mapn1[0].title}`,
                                            "value": `${diffIcons1}\nStatus: ${status1}\nFavorites: ${mapn1[0].favourite_count} :hearts:\n[Map](https://osu.ppy.sh/beatmapsets/${map1}) | [Download](https://osu.ppy.sh/beatmapsets/${map1}/download) ([Bloodcat](https://bloodcat.com/osu/s/${map1}))`,
                                            "inline": false
                                            },
                                            {
                                            "name": `${mapn2[0].artist} - ${mapn2[0].title}`,
                                            "value": `${diffIcons2}\nStatus: ${status2}\nFavorites: ${mapn2[0].favourite_count} :hearts:\n[Map](https://osu.ppy.sh/beatmapsets/${map2}) | [Download](https://osu.ppy.sh/beatmapsets/${map2}/download) ([Bloodcat](https://bloodcat.com/osu/s/${map2}))`,
                                            "inline": false
                                            },
                                                {
                                            "name": `${mapn3[0].artist} - ${mapn3[0].title}`,
                                            "value": `${diffIcons3}\nStatus: ${status3}\nFavorites: ${mapn3[0].favourite_count} :hearts:\n[Map](https://osu.ppy.sh/beatmapsets/${map3}) | [Download](https://osu.ppy.sh/beatmapsets/${map3}/download) ([Bloodcat](https://bloodcat.com/osu/s/${map3}))`,
                                            "inline": false
                                            },
                                            {
                                            "name": `${mapn4[0].artist} - ${mapn4[0].title}`,
                                            "value": `${diffIcons4}\nStatus: ${status4}\nFavorites: ${mapn4[0].favourite_count} :hearts:\n[Map](https://osu.ppy.sh/beatmapsets/${map4}) | [Download](https://osu.ppy.sh/beatmapsets/${map4}/download) ([Bloodcat](https://bloodcat.com/osu/s/${map4}))`,
                                            "inline": false
                                    }]}}); 
                                });
                            });
                        });
                    });
                });
            });
        return;
        }
    }
    //if no args send help
    message.channel.send({"embed": {
        "description": "**osu!:** \n\n**bancho:**\n\nprofile (p) <name>: ``sends a bancho profile card``\ntop (t) <name>: ``sends top plays of entered user``\nlast (l) <name>: ``sends recent plays of entered user``\nmaps (m) <name>: ``lists newest maps of entered user``\n\n**private servers:**\n\nakatsuki (a): ``for akatsuki related commands``\nripple (ri): ``for ripple related commands``\ngatari (g):``for gatari related commands``\nkurikku (ku):``for kurikku related commands``\nenshi (es):``for enshi related commands``\nenjuu (ej):``for enjuu related commands``\nkawata (ka):``for kawata related commands``\n\n**other:**\n\nbloodcat (bc): ``for bloodcat related commands``\nset (s) <server> <name>: ``sets your default name for selected server``\nname (n): ``lists your default names for the osu servers``\n\n**help:**\n\nusage: " + p + "osu <command>\n\naliases are in ()\nparameters are in <>\nnotice: you can just do $servername/bancho command",
        "color": 16399236
    }});
}

//functions to make the code work below:

//get the profile
function profile(pAPI, aviUrl, pUrl, args, message, client, nameIndex, server) {
    let username;
    //if someone enters a name
    if(args[nameIndex]) {
        //then the name is everything from the nameIndex
        username = args.slice(nameIndex).join(" ");
    } else
    //if no username entered
    if(!args[nameIndex]) {
        //then get the default username from the database
        username = client.osuNames.get(message.author.id, server);
    }
    //if the user hasn't changed their username then return
    if(username === '-') return message.channel.send("Please enter a user");
    //anti ping stuff
    if(username.includes("@everyone")) return message.channel.send("Please don't try to abuse the profile command by pinging everyone");
    if(username.includes("@here")) return message.channel.send("Please don't try to abuse the profile command by pinging everyone");

    //profile api plus username spaces are switched with %20
    let profile = pAPI + username.split(' ').join('%20');
    /*this line is unneeded cause we already check if it's no username added but just in 
    case that the database has no name or someone finds an exploit ill keep this*/
    if(!username) return message.channel.send("Please enter a user!");
    //request the profile api 
    client.snekfetch.get(profile).then((r) => {
        let body = r.body;
        //if no result return
        if(!body[0]) return message.channel.send("I couldn't find " + username);
        let bodyname = body[0].username;
        let bodygrank = body[0].pp_rank;
        let bodycrank = body[0].pp_country_rank;
        let bodycountry = body[0].country;
        let bodyid = body[0].user_id;
        let bodypp = parseInt(body[0].pp_raw);
        let bodyacc = body[0].accuracy;
        let bodyplaycount = body[0].playcount;
        let bodylevel = parseInt(body[0].level);
        //send profile embed in channel
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

//get the top plays
function top(pAPI, tAPI, pUrl, client, message, args, nameIndex, server) {
    let username;
    //if a username was entered
    if(args[nameIndex]) {
        //username is everything from nameIndex
        username = args.slice(nameIndex).join(" ");
    } else
    //if no username entered
    if(!args[nameIndex]) {
        //get the username from the database
        username = client.osuNames.get(message.author.id, server);
    }
    //if the user left the name on default return
    if(username === '-') return message.channel.send("Please enter a user");
    //anti ping stuff
    if(username.includes("@everyone")) return message.channel.send("Please don't try to abuse the top command by pinging everyone");
    if(username.includes("@here")) return message.channel.send("Please don't try to abuse the top command by pinging everyone");
    //if someone tries to request other modes return i havent supported the pp calculation for them yet
    if(username.includes("&m=")) return message.channel.send("I'm sorry but the bot doesn't support any other modes than standard");
    //the apis
    let top = tAPI + username.split(' ').join('%20');
    let profile = pAPI + username.split(' ').join('%20');
    let mapAPI = client.config.banchoMapApi;
    //I explained this in the profile already
    if(!username) return message.channel.send("Please enter a user!");
    //request the profile
    client.snekfetch.get(profile).then((r) => {
        let bodyp = r.body;
        //request the top plays
        client.snekfetch.get(top).then((a) => {
            let bodyt = a.body;
            //if no profile or top plays return
            if(!bodyt[0] || !bodyp[0]) return message.channel.send("I either couldn't find this user or they didn't have any top plays");
            let mapn1 =  mapAPI + bodyt[0].beatmap_id;
            //request first map
            client.snekfetch.get(mapn1).then((m1) => {
                let map1 = m1.body;
                if(!bodyt[1]) return message.channel.send("I either couldn't find this user or they didn't have enough top plays");
                let mapn2 = mapAPI + bodyt[1].beatmap_id;
                //request second map
                client.snekfetch.get(mapn2).then((m2) => {
                    let map2 = m2.body;
                    if(!bodyt[2]) return message.channel.send("I either couldn't find this user or they didn't have enough top plays");
                    let mapn3 = mapAPI + bodyt[2].beatmap_id;
                    //request third map
                    client.snekfetch.get(mapn3).then((m3) => {
                        let map3 = m3.body;
                        let pname = bodyp[0].username;
                        let purl = pUrl + bodyp[0].user_id;

                        let rank1;
                        let rank2;
                        let rank3;
                        
                        //turn the grades to discord emojis

                        rank1 = rankToEmoji(bodyt, 0, client);
                        rank2 = rankToEmoji(bodyt, 1, client);
                        rank3 = rankToEmoji(bodyt, 2, client);

                        //calculate the accuracy & mods

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
                        //request the html of the first map
                        client.request('http://osu.ppy.sh/osu/' + map1[0].beatmap_id, (error, response, body1) => {
                            //calculate if fc pp and star rating
                            let ifFCPP1 = ifFCPPCalculation(rawMods1, client, bodyt, 0, map1, body1, accn1);
                            let stars1 = srCalculation(rawMods1, body1, client);
                            //request the html of the second map
                            client.request('http://osu.ppy.sh/osu/' + map2[0].beatmap_id, (error, response, body2) => {
                                //calculate if fc pp and star rating
                                let ifFCPP2 = ifFCPPCalculation(rawMods2, client, bodyt, 1, map2, body2, accn2);
                                let stars2 = srCalculation(rawMods2, body2, client);
                                //request the html of the last map
                                client.request('http://osu.ppy.sh/osu/' + map3[0].beatmap_id, (error, response, body3) => {
                                    //calculate if fc pp and star rating
                                    let ifFCPP3 = ifFCPPCalculation(rawMods3, client, bodyt, 2, map3, body3, accn3);
                                    let stars3 = srCalculation(rawMods3, body3, client);

                                    //put everything together for the map title

                                    let m1t = `${map1[0].artist} - ${map1[0].title} [${map1[0].version}] (${stars1}*)`;
                                    let m2t = `${map2[0].artist} - ${map2[0].title} [${map2[0].version}] (${stars2}*)`;
                                    let m3t = `${map3[0].artist} - ${map3[0].title} [${map3[0].version}] (${stars3}*)`;

                                    //put everything together for the map description

                                    let m1d = `PP: ${parseInt(bodyt[0].pp)}pp ${ifFCPP1}\nAccuracy: ${acc1}% (${bodyt[0].count300}/${bodyt[0].count100}/${bodyt[0].count50}/${bodyt[0].countmiss})\nCombo: ${bodyt[0].maxcombo}x / ${map1[0].max_combo}x\n${mods1}Grade:  ${rank1}\nMapper: ${map1[0].creator} | [Download](https://osu.ppy.sh/beatmapsets/${map1[0].beatmapset_id}/download)`
                                    let m2d = `PP: ${parseInt(bodyt[1].pp)}pp ${ifFCPP2}\nAccuracy: ${acc2}% (${bodyt[1].count300}/${bodyt[1].count100}/${bodyt[1].count50}/${bodyt[1].countmiss})\nCombo: ${bodyt[1].maxcombo}x / ${map2[0].max_combo}x\n${mods2}Grade:  ${rank2}\nMapper: ${map2[0].creator} | [Download](https://osu.ppy.sh/beatmapsets/${map2[0].beatmapset_id}/download)`
                                    let m3d = `PP: ${parseInt(bodyt[2].pp)}pp ${ifFCPP3}\nAccuracy: ${acc3}% (${bodyt[2].count300}/${bodyt[2].count100}/${bodyt[2].count50}/${bodyt[2].countmiss})\nCombo: ${bodyt[2].maxcombo}x / ${map3[0].max_combo}x\n${mods3}Grade:  ${rank3}\nMapper: ${map2[0].creator} | [Download](https://osu.ppy.sh/beatmapsets/${map3[0].beatmapset_id}/download)`

                                    //send the top plays of entered user

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

//get last plays
function last(client, message, args, nameIndex, rAPI, pAPI, server, aviUrl) {
    let username;
    //if a user is entered
    if(args[nameIndex]) {
        //username is everything from the nameIndex and after that
        username = args.slice(nameIndex).join(" ");
    } else
    //if no username is entered
    if(!args[nameIndex]) {
        //get the default username from the database
        username = client.osuNames.get(message.author.id, server);
    }
    //if the user didn't change their name return
    if(username === '-') return message.channel.send("Please enter a user");
    //anti ping stuff
    if(username.includes("@everyone")) return message.channel.send("Please don't try to abuse the recent command by pinging everyone");
    if(username.includes("@here")) return message.channel.send("Please don't try to abuse the recent command by pinging everyone");
    //if someone tries to request other modes i explained this in the top command
    if(username.includes("&m=")) return message.channel.send("I'm sorry but the bot doesn't support any other modes than standard");

    //apis
    let recent = rAPI + username.split(' ').join('%20');
    let profile = pAPI + username.split(' ').join('%20');
    let mapAPI = client.config.banchoMapApi;

    //i explained this in the profile function
    if(!username) return message.channel.send("Please enter a user!");
    //request the profile
    client.snekfetch.get(profile).then((r) => {
        let bodyp = r.body;
        //request the recent plays
        client.snekfetch.get(recent).then((a) => {
            let bodyr = a.body;
            //if no profile
            if(!bodyp[0]) return message.channel.send("I couldn't find " + username);
            let pname = bodyp[0].username;
            //if no recent plays
            if(!bodyr[0]) return message.channel.send(pname + " doesn't have any recent plays");
            let mapn = mapAPI + bodyr[0].beatmap_id;
            //request the most recent map
            client.snekfetch.get(mapn).then((m) => {
                let map = m.body;  

                //grades to discord emojis
                let rank = rankToEmoji(bodyr, 0, client);
                //calculate acc
                let accn = accCalculation(bodyr, 0);
                let acc = accCalculation(bodyr, 0).toString().substring(0, 5);
                //calculate which mods are with bitwise blabla look in that function for more documentation
                let mods = modCalculation(client, bodyr, 0);
                let rawMods = bodyr[0].enabled_mods;

                //request the html of the most recent map
                client.request('http://osu.ppy.sh/osu/' + bodyr[0].beatmap_id, (error, response, body) => {
                    //calculate if fc pp
                    let ifFCPP = ifFCPPCalculation(rawMods, client, bodyr, 0, map, body, accn);
                    //calculate star rating
                    let stars = srCalculation(rawMods, body, client);
                    //calculate pp
                    let pp = ppCalculation(rawMods, accn, body, bodyr, 0, client);
                    //put the map title together
                    let mt = `${map[0].artist} - ${map[0].title} [${map[0].version}] (${stars}*)`;
                    //put the description together
                    let md = `PP: ${pp}pp ${ifFCPP}\nAccuracy: ${acc}% (${bodyr[0].count300}/${bodyr[0].count100}/${bodyr[0].count50}/${bodyr[0].countmiss})\nCombo: ${bodyr[0].maxcombo}x / ${map[0].max_combo}x\n${mods}Grade:  ${rank}\nMapper: ${map[0].creator} | [Download](https://osu.ppy.sh/beatmapsets/${map[0].beatmapset_id}/download)`;
                    //send most recent play of entered user
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
//function to turn status= in the appropriate url stuff for bloodcat
function mapNameCutter(name) {
    name = name.split(' ').join('%20')
    .split('status=ranked').join('&c=b&s=1&m=&g=&l=')
    .split('status=r').join('&c=b&s=1&m=&g=&l=')
    .split('status=approved').join('&c=b&s=2&m=&g=&l=')
    .split('status=a').join('&c=b&s=2&m=&g=&l=')
    .split('status=qualified').join('&c=b&s=3&m=&g=&l=')
    .split('status=q').join('&c=b&s=3&m=&g=&l=')
    .split('status=loved').join('&c=b&s=4&m=&g=&l=')
    .split('status=l').join('&c=b&s=4&m=&g=&l=')
    .split('status=unranked').join('&c=b&s=0&m=&g=&l=')
    .split('status=graveyarded').join('&c=b&s=0&m=&g=&l=')
    .split('status=g').join('&c=b&s=0&m=&g=&l=');
    
    return name; 
}
//turn the ranks to discord emojis
function rankToEmoji(body, bodyIndex, client) {
    let rank;
    //should be fairly self explaining
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

//I hate gatari so much 
//same thing as above just for gatari cause they are special ed kids
function rankToEmojiGatariEdition(body, bodyIndex, client) {
    let ranking;
    if(body[bodyIndex].ranking === 'X') {
        ranking = client.config.osuX;
    } else
    if(body[bodyIndex].ranking === 'XH') {
        ranking = client.config.osuXH;
    }
    if(body[bodyIndex].ranking === 'S') {
        ranking = client.config.osuS;
    } else
    if(body[bodyIndex].ranking === 'SH') {
        ranking = client.config.osuSH;
    } else
    if(body[bodyIndex].ranking === 'A') {
        ranking = client.config.osuA;
    } else
    if(body[bodyIndex].ranking === 'B') {
        ranking = client.config.osuB;
    } else
    if(body[bodyIndex].ranking === 'C') {
        ranking = client.config.osuC;
    } else
    if(body[bodyIndex].ranking === 'D') {
        ranking = client.config.osuF;
    } else
    if(body[bodyIndex].ranking === 'F') {
        ranking = client.config.osuF;
    }
    return ranking;
}
//calculate the accuracy (yes)
function accCalculation(body, bodyIndex) {
    let acc300s = parseFloat(body[bodyIndex].count300);
    let acc100s = parseFloat(body[bodyIndex].count100);
    let acc50s = parseFloat(body[bodyIndex].count50);
    let accmiss = parseFloat(body[bodyIndex].countmiss);
    //((300s * 300 + 100s * 100 + 50s * 50 + miss)/(300s + 100s + 50s + miss) * 300)
    let acc = ((acc300s * 300 + acc100s * 100 + acc50s * 50 + accmiss * 0)/((acc300s + acc100s + acc50s + accmiss) * 300) * 100);
    return acc;
}

//calculate the mods cause that's needed yes i know
function modCalculation(client, body, bodyIndex) {
    //get the raw mods
    let rawMods = body[bodyIndex].enabled_mods;
    //set mods to no mod i made a config thing for it so that i dont have to change so much stuff
    let mods = client.config.noMod;
    //if mods is 0 then mods can stay no mod
    if(rawMods > 0) {
        /*calculate mods with nearest to the power of 2 stuff idk thanks for the people
        that i worked for they helped me with this i can do maths so yea lOl*/
        mods = nearestPow2(rawMods);
    }
    return mods;
}

//break the mods into pieces by getting the nearest power of 2 or some shit idk
function nearestPow2(mods) {
    //create new array
    let modlist = [];
    let i = 1;
    /*while mods isn't no mod and the i < 50 is just in case there happens something bad 
    i dont want my bot to keep on doing that while thing cause my pc bad*/
    while(mods!=0 && i < 50) {
        //i dont know what this is dont ask me i dont speak maths
        mod = 1 << 31 - Math.clz32(mods);
        //push the mod in the mod list
        modlist.push(mod);
        //remove the number from the mods
        mods = mods - mod;
        //add one to i just in case
        i++;
    }
    
    //replace bitwise mod numbers with discord emojis
    replaceIntWithMod(modlist);
    //if the mod list isn't empty return the mods
    if(modlist.length != 0) return "Mods: " + modlist.join(' ') + " |  ";
}

//function to replace the bitwise mod numbers with discord emojis
function replaceIntWithMod(a) {
    num = 0;
    //while the number is less than the mod list length repeat
    while(num <= a.length) {
        //this should all be self explainable
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
        /*if the mods include perfect then sudden death is
         there too so we have to remove it if its both*/
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
        //same thing as with sudden death & perfect we have to remove double time if nightcore is included
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

//function to calculate pp
function ppCalculation(mods, accn, requestBody, body, bodyIndex, client) {
    let acc_percent = parseFloat(accn);
    let combo = parseInt(body[bodyIndex].maxcombo);
    let nmiss = parseInt(body[bodyIndex].countmiss);
    //create a new parser
    let parser = new client.ojs.parser().feed(requestBody);
    //parse the map
    let map = parser.map;
    //calculate the star rating
    let rawStars = new client.ojs.diff().calc({map: map, mods: mods});
    //calculate the pp
    let rawPP = client.ojs.ppv2({
      stars: rawStars,
      combo: combo,
      nmiss: nmiss,
      acc_percent: acc_percent,
    });
    //just take the total pp and fix it
    let pp = rawPP.total.toFixed(2);
    return pp;
}

//calculate the star rating
function srCalculation(mods, requestBody, client) {
    //create new parser
    let parser = new client.ojs.parser().feed(requestBody);
    //parse the map
    let map = parser.map;
    //calculate the star rating
    let rawStars = new client.ojs.diff().calc({map: map, mods: mods});
    //just take the total star rating and fix it
    let stars = rawStars.total.toFixed(2);
    return stars;
}

//calculate if fc pp 
//this doesn't take the misses from the accuracy i didnt wanted to calculate accuracy again
function ifFCPPCalculation(mods, client, body, bodyIndex, mapBody, requestBody, accn) {
    //create new parser
    let parser = new client.ojs.parser().feed(requestBody);
    //parse the map
    let map = parser.map;
    //calculate star rating
    let rawStars = new client.ojs.diff().calc({map: map, mods: mods});
    //make empty variable if the player fced
    let ifFCPP = "";
    //if it isnt a fc
    if(body[bodyIndex].maxcombo != mapBody[0].max_combo) {
        let comboFC = parseInt(mapBody[0].max_combo);
        let nmissFC = parseInt(0);
        let acc_percent = parseFloat(accn);
        //calculate if fc pp
        fcPP = client.ojs.ppv2({
            stars: rawStars,
            combo: comboFC,
            nmiss: nmissFC,
            acc_percent: acc_percent,
        });
        //change the variable
        ifFCPP = "=> " + fcPP.total.toFixed(2) + "pp";
    }
    return ifFCPP;
}

//change the status to a string
function getStatus(mapn) {
    let status;
    if(mapn[0].approved === "4") {
        status = 'Loved';
    } else
    if(mapn[0].approved === "3") {
        status = 'Qualified';
    } else
    if(mapn[0].approved === "2") {
        status = 'Approved';
    } else
    if(mapn[0].approved === "1") {
        status = 'Ranked';
    } else
    if(mapn[0].approved === "0") {
        status = 'Pending';
    } else
    if(mapn[0].approved === "-1") {
        status = 'Work In Progress';
    } else
    if(mapn[0].approved === "-2") {
        status = 'Graveyarded';
    }
    return status;
}

//change maps difficulty to icons instead of numbers
function diffInIcon(mapn) {
    let i = 0;
    //new array
    let icons = [];
    //while there are sub diffs
    while(mapn[i]) {
        let diff = mapn[i].difficultyrating;
        //push the diff in array
        icons.push(diff);
        i++;
    }
    //sort the beatmaps by difficulty
    icons.sort();
    //turn the diff numbers to icons
    bigLarryLover(icons);
    return icons.join('');
}

//don't mind that name hehe
function bigLarryLover(a) {
    let num = 0
    //number is less or equal to the items in the array
    while(num <= a.length) {
        if(a[num] >= "0" && a[num] < "2") {
            a[num] = "<:Easy:554700646503284764>";
        } else
        if(a[num] >= "2" && a[num] < "2.7") {
            a[num] = "<:Normal:554700646117539860>";
        } else
        if(a[num] >= "2.7" && a[num] < "4") {
            a[num] = "<:Hard:554700646461210634>";
        } else
        if(a[num] >= "4" && a[num] < "5.3") {
            a[num] = "<:Insane:554700646067077140>";
        } else
        if(a[num] >= "5.3" && a[num] < "6.5") {
            a[num] = "<:Expert:554700646268272650>";
        } else
        if(a[num] >= "6.5") {
            a[num] = "<:ExpertPlus:554700646297632768>";
        }
        num++;
    }
}

//send help message for the priv servers lOl
function sendPrivServerHelp(message, server, p) {
    message.channel.send({"embed": {
        "description": "**" + server + ":** \n\nusage: " + p + "osu " + server +" <command>\n\nprofile <name>: ``sends a " + server + " profile card``\nlast <name>: ``sends recent plays of entered user``\ntop <name> ``sends top plays of entered user``\n\naliases: p, l, t",
        "color": 16399236
    }});
}


//bitwise enum of all mods
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