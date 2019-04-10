exports.run = (client, message, args, p) => {
    let osu = require("./functions/osuFunctions.js");
    let cfg = client.config;
    //if there are first args
    if(args[0]) {
        let firstArgs = args[0].toLowerCase();
        //most of the code below this is just filling some functions that are below all of this so I'm not going to document it
        if(firstArgs === "profile" || firstArgs === "p") {
            osu.get.profile(cfg.banchoProfileApi, cfg.banchoAviUrl, cfg.banchoPUrl, args, message, client, 1, "bancho");
            return;
        } else
        if(firstArgs === "top" || firstArgs === "t") {
            osu.get.top(cfg.banchoProfileApi, cfg.banchoTopApi, cfg.banchoPUrl, client, message, args, 1, "bancho");
            return;
        } else
        if(firstArgs === "recent" || firstArgs === "r" || firstArgs === "l" || firstArgs === "last") {
            osu.get.last(client, message, args, 1, cfg.banchoRecentApi, cfg.banchoProfileApi, "bancho", "https://a.ppy.sh/");
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
            let argIndex = 1;
        
            if(args[argIndex]) {
                let secondArgs = args[argIndex];
        
                if(secondArgs === "profile" || secondArgs === "p") {
                    osu.get.profile(pApi, aviUrl, pUrl, args, message, client, nameIndex, server);
                    return;
                } else
                if(secondArgs === "top" || secondArgs === "t") {
                    osu.get.top(pApi, tApi, pUrl, client, message, args, nameIndex, server);
                    return;
                } else
                if(secondArgs === "last" || secondArgs === "l" || secondArgs === "r" || secondArgs === "recent") {
                    osu.get.last(client, message, args, nameIndex, rApi, pApi, server, aviUrl);
                    return;
                }
            }
            osu.send.help(message, "Akatsuki", p);
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
            let argIndex = 1;
        
            if(args[argIndex]) {
                let secondArgs = args[argIndex];
        
                if(secondArgs === "profile" || secondArgs === "p") {
                    osu.get.profile(pApi, aviUrl, pUrl, args, message, client, nameIndex, server);
                    return;
                } else
                if(secondArgs === "top" || secondArgs === "t") {
                    osu.get.top(pApi, tApi, pUrl, client, message, args, nameIndex, server);
                    return;
                } else
                if(secondArgs === "last" || secondArgs === "l" || secondArgs === "r" || secondArgs === "recent") {
                    osu.get.last(client, message, args, nameIndex, rApi, pApi, server, aviUrl);
                    return;
                }
            }
            osu.send.help(message, "Ripple", p);
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
            let argIndex = 1;
        
            if(args[argIndex]) {
                let secondArgs = args[argIndex];
        
                if(secondArgs === "profile" || secondArgs === "p") {
                    osu.get.profile(pApi, aviUrl, pUrl, args, message, client, nameIndex, server);
                    return;
                } else
                if(secondArgs === "top" || secondArgs === "t") {
                    osu.get.top(pApi, tApi, pUrl, client, message, args, nameIndex, server);
                    return;
                } else
                if(secondArgs === "last" || secondArgs === "l" || secondArgs === "r" || secondArgs === "recent") {
                    osu.get.last(client, message, args, nameIndex, rApi, pApi, server, aviUrl);
                    return;
                }
            }
            osu.send.help(message, "Kurikku", p);
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
            let argIndex = 1;
        
            if(args[argIndex]) {
                let secondArgs = args[argIndex];
        
                if(secondArgs === "profile" || secondArgs === "p") {
                    osu.get.profile(pApi, aviUrl, pUrl, args, message, client, nameIndex, server);
                    return;
                } else
                if(secondArgs === "top" || secondArgs === "t") {
                    osu.get.top(pApi, tApi, pUrl, client, message, args, nameIndex, server);
                    return;
                } else
                if(secondArgs === "last" || secondArgs === "l" || secondArgs === "r" || secondArgs === "recent") {
                    osu.get.last(client, message, args, nameIndex, rApi, pApi, server, aviUrl);
                    return;
                }
            }
            osu.send.help(message, "Enshi", p);
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
            let argIndex = 1;
        
            if(args[argIndex]) {
                let secondArgs = args[argIndex];
        
                if(secondArgs === "profile" || secondArgs === "p") {
                    osu.get.profile(pApi, aviUrl, pUrl, args, message, client, nameIndex, server);
                    return;
                } else
                if(secondArgs === "top" || secondArgs === "t") {
                    osu.get.top(pApi, tApi, pUrl, client, message, args, nameIndex, server);
                    return;
                } else
                if(secondArgs === "last" || secondArgs === "l" || secondArgs === "r" || secondArgs === "recent") {
                    osu.get.last(client, message, args, nameIndex, rApi, pApi, server, aviUrl);
                    return;
                }
            }
            osu.send.help(message, "Enjuu", p);
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
            let argIndex = 1;
        
            if(args[argIndex]) {
                let secondArgs = args[argIndex];
        
                if(secondArgs === "profile" || secondArgs === "p") {
                    osu.get.profile(pApi, aviUrl, pUrl, args, message, client, nameIndex, server);
                    return;
                } else
                if(secondArgs === "top" || secondArgs === "t") {
                    osu.get.top(pApi, tApi, pUrl, client, message, args, nameIndex, server);
                    return;
                } else
                if(secondArgs === "last" || secondArgs === "l" || secondArgs === "r" || secondArgs === "recent") {
                    osu.get.last(client, message, args, nameIndex, rApi, pApi, server, aviUrl);
                    return;
                }
            }
            osu.send.help(message, "Kawata", p);
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
                            if(!body.stats.playcount) return message.channel.send(`${bodyname} is probably restricted on Gatari`);
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
                        let pname = bodyp.stats.username;
                        let last = cfg.gatariRecentApi + bodyp.stats.id;
                        //request last json
                        client.snekfetch.get(last).then((r) => {
                            let bodyr = r.body;
                            //if no last plays
                            if(bodyr.scores === null) return message.channel.send(pname + " is probably restricted on Gatari");
                            if(!bodyr.scores[0]) return message.channel.send(pname + " doesn't seem to have any recent plays");

                            //replace the grade to emojis
                            let rank = rankToEmojiGatariEdition(bodyr.scores, 0, client);
                            
                            let accRaw = bodyr.scores[0].accuracy;
                            let acc = accRaw.toString().substring(0, 5);
                            
                            //get mods & replace mods with emojis if no mod then no mod
                            let rawMods = bodyr.scores[0].mods; 
                            let mods = cfg.noMod;
                            if(rawMods > 0) {
                                mods = client.functions.nearestPow2(rawMods);
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

                                let mt = bodyr.scores[0].beatmap.song_name + ` (${stars} ⃰ )`;
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
                            let pname = bodyp.stats.username;
                            let top = cfg.gatariTopApi + bodyp.stats.id;
                            client.snekfetch.get(top).then((r) => {
                                let bodyt = r.body;
                                if(bodyt.scores === null) return message.channel.send(pname + " is probably restricted on Gatari");
                                if(!bodyt.scores[0]) return message.channel.send(pname + " doesn't seem to have any top plays");
                                if(!bodyt.scores[1]) return message.channel.send(pname + " doesn't seem to have any top plays");
                                if(!bodyt.scores[2]) return message.channel.send(pname + " doesn't seem to have any top plays");
                                let purl = "https://osu.gatari.pw/u/" + bodyp.stats.id;

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
                                    mods1 = client.functions.nearestPow2(rawMods1);
                                }
                
                                let rawMods2 = bodyt.scores[1].mods;
                                let mods2 = cfg.noMod;
                                if(rawMods2 > 0) {
                                    mods2 = client.functions.nearestPow2(rawMods2);
                                }
                
                                let rawMods3 = bodyt.scores[2].mods;
                                let mods3 = cfg.noMod;
                                if(rawMods3 > 0) {
                                    mods3 = client.functions.nearestPow2(rawMods3);
                                }

                                client.request('http://osu.ppy.sh/osu/' + bodyt.scores[0].beatmap.beatmap_id, (error, response, body1) => {
                                    //calculate if fc pp and star rating
                                    //shoot the request body in the ojsama parser
                                    let parser = new client.ojs.parser().feed(body1);
                                    //get the map
                                    let map = parser.map;
                                    //calculate the raw stars
                                    let rawStars = new client.ojs.diff().calc({map: map, mods: rawMods1});
                                    
                                    let ifFCPP1 = "";
                                    //if not fc
                                    if(bodyt.scores[0].full_combo === false) {
                                        //max combo of the map
                                        let comboFC = parseInt(bodyt.scores[0].beatmap.fc);
                                        //no misses
                                        let nmissFC = parseInt(0);
                                        //get the accuracy
                                        let acc_percent = parseFloat(accRaw1);
                                        //calculate if fc pp
                                        fcPP = client.ojs.ppv2({
                                            stars: rawStars,
                                            combo: comboFC,
                                            nmiss: nmissFC,
                                            acc_percent: acc_percent,
                                        });
                                        //change the variable
                                        ifFCPP1 = `=> ${fcPP.total.toFixed(2)}pp`;
                                    }
                                    let stars1 = rawStars.total.toFixed(2);
                                    //request the file of the second map
                                    client.request('http://osu.ppy.sh/osu/' + bodyt.scores[0].beatmap.beatmap_id, (error, response, body2) => {
                                        //calculate if fc pp and star rating
                                        //shoot the request body in the ojsama parser
                                        let parser = new client.ojs.parser().feed(body2);
                                        //get the map
                                        let map = parser.map;
                                        //calculate the raw stars
                                        let rawStars = new client.ojs.diff().calc({map: map, mods: rawMods2});
                                        
                                        let ifFCPP2 = "";
                                        //if not fc
                                        if(bodyt.scores[1].full_combo === false) {
                                            //max combo of the map
                                            let comboFC = parseInt(bodyt.scores[1].beatmap.fc);
                                            //no misses
                                            let nmissFC = parseInt(0);
                                            //get the accuracy
                                            let acc_percent = parseFloat(accRaw2);
                                            //calculate if fc pp
                                            fcPP = client.ojs.ppv2({
                                                stars: rawStars,
                                                combo: comboFC,
                                                nmiss: nmissFC,
                                                acc_percent: acc_percent,
                                            });
                                            //change the variable
                                            ifFCPP2 = `=> ${fcPP.total.toFixed(2)}pp`;
                                        }
                                        let stars2 = rawStars.total.toFixed(2);
                                        //request the file of the third map
                                        client.request('http://osu.ppy.sh/osu/' + bodyt.scores[0].beatmap.beatmap_id, (error, response, body3) => {
                                            //calculate if fc pp and star rating
                                            //shoot the request body in the ojsama parser
                                            let parser = new client.ojs.parser().feed(body3);
                                            //get the map
                                            let map = parser.map;
                                            //calculate the raw stars
                                            let rawStars = new client.ojs.diff().calc({map: map, mods: rawMods3});
                                            
                                            let ifFCPP3 = "";
                                            //if not fc
                                            if(bodyt.scores[2].full_combo === false) {
                                                //max combo of the map
                                                let comboFC = parseInt(bodyt.scores[2].beatmap.fc);
                                                //no misses
                                                let nmissFC = parseInt(0);
                                                //get the accuracy
                                                let acc_percent = parseFloat(accRaw3);
                                                //calculate if fc pp
                                                fcPP = client.ojs.ppv2({
                                                    stars: rawStars,
                                                    combo: comboFC,
                                                    nmiss: nmissFC,
                                                    acc_percent: acc_percent,
                                                });
                                                //change the variable
                                                ifFCPP3 = `=> ${fcPP.total.toFixed(2)}pp`;
                                            }
                                            let stars3 = rawStars.total.toFixed(2);

                                            let m1t = bodyt.scores[0].beatmap.song_name + ` (${stars1} ⃰ )`;
                                            let m2t = bodyt.scores[1].beatmap.song_name + ` (${stars2} ⃰ )`;
                                            let m3t = bodyt.scores[2].beatmap.song_name + ` (${stars3} ⃰ )`;
                            
                                            let m1d = `PP: ${parseInt(bodyt.scores[0].pp)}pp ${ifFCPP1}\nAccuracy: ${acc1}% (${bodyt.scores[0].count_300}/${bodyt.scores[0].count_100}/${bodyt.scores[0].count_50}/${bodyt.scores[0].count_miss})\nCombo: ${bodyt.scores[0].max_combo}x / ${bodyt.scores[0].beatmap.fc}x\n${mods1}Grade:  ${rank1}\n\`${bodyt.scores[0].time.split("T").join(" ")}\`\n[Download](https://osu.ppy.sh/beatmapsets/${bodyt.scores[0].beatmap.beatmapset_id}/download)`;
                                            let m2d = `PP: ${parseInt(bodyt.scores[1].pp)}pp ${ifFCPP2}\nAccuracy: ${acc2}% (${bodyt.scores[1].count_300}/${bodyt.scores[1].count_100}/${bodyt.scores[1].count_50}/${bodyt.scores[1].count_miss})\nCombo: ${bodyt.scores[1].max_combo}x / ${bodyt.scores[1].beatmap.fc}x\n${mods2}Grade:  ${rank2}\n\`${bodyt.scores[1].time.split("T").join(" ")}\`\n[Download](https://osu.ppy.sh/beatmapsets/${bodyt.scores[1].beatmap.beatmapset_id}/download)`;
                                            let m3d = `PP: ${parseInt(bodyt.scores[2].pp)}pp ${ifFCPP3}\nAccuracy: ${acc3}% (${bodyt.scores[2].count_300}/${bodyt.scores[2].count_100}/${bodyt.scores[2].count_50}/${bodyt.scores[2].count_miss})\nCombo: ${bodyt.scores[2].max_combo}x / ${bodyt.scores[2].beatmap.fc}x\n${mods3}Grade:  ${rank3}\n\`${bodyt.scores[2].time.split("T").join(" ")}\`\n[Download](https://osu.ppy.sh/beatmapsets/${bodyt.scores[2].beatmap.beatmapset_id}/download)`;
                            
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
                                });
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
        //todo rewrite maps
        if(firstArgs === "maps" || firstArgs === "m") {
            let username = client.functions.username(client, message, args, 1, "bancho");
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
        } else
        if(firstArgs === "beatconnect") {
            let mapQuery;
            //if someone entered a map
            if(args[1]) {
                mapQuery = args.slice(1).join(" ");
            } else return message.channel.send("Please enter a map I should look for");
            //if the pQuery includes ping stuff return
            if(mapQuery.includes("@everyone")) return message.channel.send("Please don't try to abuse the top command by pinging everyone");
            if(mapQuery.includes("@here")) return message.channel.send("Please don't try to abuse the top command by pinging everyone");
            //if the search includes -s we split that and replace it with &s= and put all to lower case
            if(mapQuery.includes("-s")) {
              mapQuery = mapQuery.split(" -s ").join("&s=").toLowerCase();
            }
            //put the maps together
            let maps = `${cfg.beatconnectSearchApi}${cfg.beatconnectToken}&q=${mapQuery}`;
            //if the executor did -s then cut that from the search
            if(mapQuery.includes("&s=")) {
              mapQuery = mapQuery.substring(0, mapQuery.indexOf('&'));
            }
            //request the maps
            client.snekfetch.get(maps).then((r) => {
              let rawBody = r.body;
              //if you want to search by last updated
              /*let body = client._.sortBy(rawBody, function(o) { 
                  return o.last_updated; 
              }).reverse();*/
              
              //NOTICE FOR MYSELF: ADD RANDOM AND OTHER OWN ORDER FUNCTIONS TO THIS 
              
              let body = rawBody;
        
              //if no maps return
              if(!body.beatmaps[0]) return message.channel.send(`I couldn't find any maps under ${mapQuery}`);
              //set all maps to first map cause we know we that
              //edit: nice english felix
              let map1 = body.beatmaps[0].id;
              let uniqueID1 = body.beatmaps[0].unique_id;
              let map2 = map1;
              let uniqueID2 = uniqueID1;
              let map3 = map1;
              let uniqueID3 = uniqueID1;
              let map4 = map1;
              let uniqueID4 = uniqueID1;
              //check if all the maps exist and if so change the variables
              if(body.beatmaps[1]) {
                map2 = body.beatmaps[1].id;
                uniqueID2 = body.beatmaps[1].unique_id;
                if(body.beatmaps[2]) {
                  map3 = body.beatmaps[2].id;
                  uniqueID3 = body.beatmaps[2].unique_id;
                  if(body.beatmaps[3]) {
                    map4 = body.beatmaps[3].id;
                    uniqueID4 = body.beatmaps[3].unique_id;
                  }
                }
              }
        
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
                              //if one of the maps isn't available on bancho return cause we need info from there
                              if(!mapn1[0] || !mapn2[0] || !mapn3[0] || !mapn4[0]) return message.channel.send("One of the maps I was looking for is deleted on bancho!");
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
                              //the favourites
                              let favs1 = favourites(mapn1[0].favourite_count);
                              let favs2 = favourites(mapn2[0].favourite_count);
                              let favs3 = favourites(mapn3[0].favourite_count);
                              let favs4 = favourites(mapn4[0].favourite_count);
        
                              //get the nominations & hypes then put favs noms and hypes together
                              let noms1 = nominations(body.beatmaps[0].nominations_current);
                              let hypes1 = hypes(body.beatmaps[0].hype_current);
                              let fNH1 = `${favs1}${noms1}${hypes1}`;
        
                              //first field
                              let field1 = {
                                "name": `${mapn1[0].artist} - ${mapn1[0].title}`,
                                "value": `${diffIcons1}\nStatus: ${status1}\nMapper: ${body.beatmaps[0].creator}\n${fNH1}\n[Map](https://osu.ppy.sh/beatmapsets/${map1}) | [Download](http://beatconnect.io/b/${map1}/${uniqueID1})`,
                                "inline": false
                              };
                              //we leave the other fields blank for now
                              let field2;
                              let field3;
                              let field4;
                              
                              //if the fourth map isn't the same as the first then it exists
                              if(map4 !== map1) {
                                //get noms & hypes and put everything together
                                let noms4 = nominations(body.beatmaps[3].nominations_current);
                                let hypes4 = hypes(body.beatmaps[3].hype_current);
                                let fNH4 = `${favs4}${noms4}${hypes4}`;
                                //make the field
                                field4 = {
                                  "name": `${mapn4[0].artist} - ${mapn4[0].title}`,
                                  "value": `${diffIcons4}\nStatus: ${status4}\nMapper: ${body.beatmaps[3].creator}\n${fNH4}\n[Map](https://osu.ppy.sh/beatmapsets/${map4}) | [Download](http://beatconnect.io/b/${map4}/${uniqueID4})`,
                                  "inline": false
                                };
                              }
                              //same as the fourth map
                              if(map3 !== map1) {
                                let noms3 = nominations(body.beatmaps[2].nominations_current);
                                let hypes3 = hypes(body.beatmaps[2].hype_current);
                                let fNH3 = `${favs3}${noms3}${hypes3}`;
                                field3 = {
                                  "name": `${mapn3[0].artist} - ${mapn3[0].title}`,
                                  "value": `${diffIcons3}\nStatus: ${status3}\nMapper: ${body.beatmaps[2].creator}\n${fNH3}\n[Map](https://osu.ppy.sh/beatmapsets/${map3}) | [Download](http://beatconnect.io/b/${map3}/${uniqueID3})`,
                                  "inline": false
                                };
                              }
                              //same as the fourth map
                              if(map2 !== map1) {
                                let noms2 = nominations(body.beatmaps[1].nominations_current);
                                let hypes2 = hypes(body.beatmaps[1].hype_current);
                                let fNH2 = `${favs2}${noms2}${hypes2}`;
                                field2 = {
                                  "name": `${mapn2[0].artist} - ${mapn2[0].title}`,
                                  "value": `${diffIcons2}\nStatus: ${status2}\nMapper: ${body.beatmaps[1].creator}\n${fNH2}\n[Map](https://osu.ppy.sh/beatmapsets/${map2}) | [Download](http://beatconnect.io/b/${map2}/${uniqueID2})`,
                                  "inline": false
                                };
                              }
                              //fields are for now just the first one
                              let fields = [
                                field1
                              ];
                              //if the fourth map isn't the same as the first then all maps exist
                              if(map4 !== map1) {
                                fields = [
                                  field1,
                                  field2,
                                  field3,
                                  field4
                                ];
                              } else
                              //pretty much the same as the fourth one
                              if(map3 !== map1) {
                                fields = [
                                  field1,
                                  field2,
                                  field3
                                ];
                              } else
                              //again
                              if(map2 !== map1) {
                                fields = [
                                  field1,
                                  field2
                                ];
                              }
                              //now we send the map(s)
                              message.channel.send({
                                "embed": {
                                "title": `Maps with the query: \`${mapQuery}\``,
                                "url": `http://beatconnect.io`,
                                "color": 16399236,
                                "fields": fields}}); 
                          });
                      });
                  });
              });
          });
          return;
        } else
        if(firstArgs === "compare" || firstArgs === 'c') {
            osu.get.compare(client, message, args, 1, cfg.banchoProfileApi, cfg.banchoUserScoresApi, cfg.banchoMapApi, cfg.banchoAviUrl, "bancho");
            return;
        }
    }
    //if no args send help
    message.channel.send({"embed": {
        "description": "**osu!:** \n\n**bancho:**\n\nprofile (p) <name>: ``sends a bancho profile card``\ntop (t) <name>: ``sends top plays of entered user``\nlast (l) <name>: ``sends recent plays of entered user``\nmaps (m) <name>: ``lists newest maps of entered user``\ncompare (c) <name>: ``compare your scores on the maps your friends recently got scores on``\n\n**private servers:**\n\nakatsuki (a): ``for akatsuki related commands``\nripple (ri): ``for ripple related commands``\ngatari (g): ``for gatari related commands``\nkurikku (ku): ``for kurikku related commands``\nenshi (es): ``for enshi related commands``\nenjuu (ej): ``for enjuu related commands``\nkawata (ka): ``for kawata related commands``\n\n**other:**\n\nbeatconnect <query>: ``search for maps on beatconnect.io``\nset (s) <server> <name>: ``sets your default name for selected server``\nname (n): ``lists your default names for the osu servers``\n\n**help:**\n\nusage: " + p + "osu <command>\n\naliases are in ()\nparameters are in <>",
        "color": 16399236
    }});
}

//some functions to make the code work below:

//I hate gatari so much 
//just for gatari cause they are special ed kids
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

function favourites(favs) {
    let fav = "";
    /*
     * i commented this because it look stupid if nothing is there so
     * i prefer if there is a 0 but if i feel like changing that i can
     */
    //if(favs != 0) {
      fav = `${favs} :hearts:`;
    //}
    return fav;
  }
  
function nominations(noms) {
    let nom = "";
    if(noms != 0) {
        nom = ` ${noms} :thumbup: `;
    }
    return nom;
}

function hypes(hypes) {
    let hype = "";
    if(hypes != 0) {
        hype = `${hypes} :mega:`;
    }
    return hype;
}