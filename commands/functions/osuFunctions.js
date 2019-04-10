const functions = require("./otherFunctions.js");
const calc = require("./calculationFunctions.js");

exports.get = {
    //exports.get.profile(parameters);
    profile : function(pAPI, aviUrl, pUrl, args, message, client, nameIndex, server) {
        //get the username from the username function in otherFunctions.js
        let username = functions.username(client, message, args, nameIndex, server);
        //put the profile api link with the username together and switch the spaces with %20
        let profile = pAPI + username.split(' ').join('%20');
        //request the json
        client.snekfetch.get(profile).then((r) => {
            let body = r.body;
            //if there is nothing
            if(!body[0]) return message.channel.send("I couldn't find " + username);
            //variables for different things see osu api github for reference
            let bodyname = body[0].username;
            let bodygrank = body[0].pp_rank;
            let bodycrank = body[0].pp_country_rank;
            let bodycountry = body[0].country;
            let bodyid = body[0].user_id;
            let bodyacc = body[0].accuracy;
            let bodyplaycount = body[0].playcount;
            //parseInt to remove decimal numbers
            let bodypp = parseInt(body[0].pp_raw);
            let bodylevel = parseInt(body[0].level);
            //send the message
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
    },
    //exports.get.top(parameters);
    top : function(pAPI, tAPI, pUrl, client, message, args, nameIndex, server) {
        //get the username from the username function in otherFunctions.js
        let username = functions.username(client, message, args, nameIndex, server);
        //put the api links and username together and switch spaces with %20
        let top = tAPI + username.split(' ').join('%20');
        let profile = pAPI + username.split(' ').join('%20');
        //get the mapApi from the config
        let mapAPI = client.config.banchoMapApi;
        
        //request the profile api link
        client.snekfetch.get(profile).then((r) => {
            let bodyp = r.body;
            //request the top api link
            client.snekfetch.get(top).then((a) => {
                let bodyt = a.body;
                //if no top plays or the player doesn't exist
                if(!bodyt[0] || !bodyp[0]) return message.channel.send("I either couldn't find this user or they didn't have any top plays");
                //put the mapapi with the first api together
                let mapn1 = mapAPI + bodyt[0].beatmap_id;
                //request map1
                client.snekfetch.get(mapn1).then((m1) => {
                    let map1 = m1.body;
                    //if no second top play
                    if(!bodyt[1]) return message.channel.send("I either couldn't find this user or they didn't have enough top plays");
                    //put together
                    let mapn2 = mapAPI + bodyt[1].beatmap_id;
                    //request
                    client.snekfetch.get(mapn2).then((m2) => {
                        let map2 = m2.body;
                        //if no third map
                        if(!bodyt[2]) return message.channel.send("I either couldn't find this user or they didn't have enough top plays");
                        //put together
                        let mapn3 = mapAPI + bodyt[2].beatmap_id;
                        //request
                        client.snekfetch.get(mapn3).then((m3) => {
                            let map3 = m3.body;
                            //username and profile url
                            let pname = bodyp[0].username;
                            let purl = pUrl + bodyp[0].user_id;
        
                            let rank1;
                            let rank2;
                            let rank3;
                            
                            //convert the ranks to discord emojis
                            rank1 = calc.rankToEmoji(bodyt, 0, client);
                            rank2 = calc.rankToEmoji(bodyt, 1, client);
                            rank3 = calc.rankToEmoji(bodyt, 2, client);
                            
                            let date1 = bodyt[0].date;
                            let date2 = bodyt[1].date;
                            let date3 = bodyt[2].date;

                            //calculate the acc and mods
                            let accn1 = calc.accCalculation(bodyt, 0);
                            let acc1 = calc.accCalculation(bodyt, 0).toString().substring(0, 5);
                            let mods1 = calc.modCalculation(client, bodyt, 0);
                            let rawMods1 = bodyt[0].enabled_mods;
        
                            let accn2 = calc.accCalculation(bodyt, 1);
                            let acc2 = calc.accCalculation(bodyt, 1).toString().substring(0, 5);
                            let mods2 = calc.modCalculation(client, bodyt, 1);
                            let rawMods2 = bodyt[1].enabled_mods;
        
                            let accn3 = calc.accCalculation(bodyt, 2);
                            let acc3 = calc.accCalculation(bodyt, 2).toString().substring(0, 5);
                            let mods3 = calc.modCalculation(client, bodyt, 2);
                            let rawMods3 = bodyt[2].enabled_mods;
                            
                            //request the file of the first map
                            client.request('http://osu.ppy.sh/osu/' + map1[0].beatmap_id, (error, response, body1) => {
                                //calculate if fc pp and star rating
                                let ifFCPP1 = calc.ifFCPPCalculation(rawMods1, client, bodyt, 0, map1, body1, accn1, calc);
                                let stars1 = calc.srCalculation(rawMods1, body1, client);
                                //request the file of the second map
                                client.request('http://osu.ppy.sh/osu/' + map2[0].beatmap_id, (error, response, body2) => {
                                    //calculate if fc pp and star rating
                                    let ifFCPP2 = calc.ifFCPPCalculation(rawMods2, client, bodyt, 1, map2, body2, accn2, calc);
                                    let stars2 = calc.srCalculation(rawMods2, body2, client);
                                    //request the file of the third map
                                    client.request('http://osu.ppy.sh/osu/' + map3[0].beatmap_id, (error, response, body3) => {
                                        //calculate if fc pp and star rating
                                        let ifFCPP3 = calc.ifFCPPCalculation(rawMods3, client, bodyt, 2, map3, body3, accn3, calc);
                                        let stars3 = calc.srCalculation(rawMods3, body3, client);
                                        //put the titles together
                                        let m1t = `${map1[0].artist} - ${map1[0].title} [${map1[0].version}] (${stars1} ⃰ )`;
                                        let m2t = `${map2[0].artist} - ${map2[0].title} [${map2[0].version}] (${stars2} ⃰ )`;
                                        let m3t = `${map3[0].artist} - ${map3[0].title} [${map3[0].version}] (${stars3} ⃰ )`;
                                        //put the descriptions together
                                        let m1d = `PP: ${parseInt(bodyt[0].pp)}pp ${ifFCPP1}\nAccuracy: ${acc1}% (${bodyt[0].count300}/${bodyt[0].count100}/${bodyt[0].count50}/${bodyt[0].countmiss})\nCombo: ${bodyt[0].maxcombo}x / ${map1[0].max_combo}x\n${mods1}Grade:  ${rank1}\n\`\`${date1}\`\`\nMapper: ${map1[0].creator} | [Download](https://osu.ppy.sh/beatmapsets/${map1[0].beatmapset_id}/download)`
                                        let m2d = `PP: ${parseInt(bodyt[1].pp)}pp ${ifFCPP2}\nAccuracy: ${acc2}% (${bodyt[1].count300}/${bodyt[1].count100}/${bodyt[1].count50}/${bodyt[1].countmiss})\nCombo: ${bodyt[1].maxcombo}x / ${map2[0].max_combo}x\n${mods2}Grade:  ${rank2}\n\`\`${date2}\`\`\nMapper: ${map2[0].creator} | [Download](https://osu.ppy.sh/beatmapsets/${map2[0].beatmapset_id}/download)`
                                        let m3d = `PP: ${parseInt(bodyt[2].pp)}pp ${ifFCPP3}\nAccuracy: ${acc3}% (${bodyt[2].count300}/${bodyt[2].count100}/${bodyt[2].count50}/${bodyt[2].countmiss})\nCombo: ${bodyt[2].maxcombo}x / ${map3[0].max_combo}x\n${mods3}Grade:  ${rank3}\n\`\`${date3}\`\`\nMapper: ${map3[0].creator} | [Download](https://osu.ppy.sh/beatmapsets/${map3[0].beatmapset_id}/download)`
                                        //send message
                                        message.channel.send({"embed": {
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
    },
    //exports.get.last(parameters);
    last : function(client, message, args, nameIndex, rAPI, pAPI, server, aviUrl) {
        //get the username from the username function in otherFunctions.js
        let username = functions.username(client, message, args, nameIndex, server);
        //put the api links and username together and switch spaces with %20
        let recent = rAPI + username.split(' ').join('%20');
        let profile = pAPI + username.split(' ').join('%20');
        //get the map api from the config
        let mapAPI = client.config.banchoMapApi;
        //request the profile
        client.snekfetch.get(profile).then((r) => {
            let bodyp = r.body;
            //request the last plays
            client.snekfetch.get(recent).then((a) => {
                let bodyr = a.body;
                //if no profile
                if(!bodyp[0]) return message.channel.send("I couldn't find " + username);
                let pname = bodyp[0].username;
                //if no plays in the last 24 hours (for bancho on private servers it might show older plays)
                if(!bodyr[0]) return message.channel.send(pname + " doesn't have any recent plays");
                //put the mapapi link and the beatmap id of the last play together
                let mapn = mapAPI + bodyr[0].beatmap_id;
                //request the map that was last played by the user
                client.snekfetch.get(mapn).then((m) => {
                    let map = m.body;
                    //set the last map in the database for $osu compare
                    client.lastMap.set(message.guild.id, bodyr[0].beatmap_id, "lastMap");
                    //switch the ranks to discord emojis
                    let rank = calc.rankToEmoji(bodyr, 0, client);
                    //calculate accuracy and mods
                    let accn = calc.accCalculation(bodyr, 0);
                    let acc = calc.accCalculation(bodyr, 0).toString().substring(0, 5);
                    let mods = calc.modCalculation(client, bodyr, 0);
                    let rawMods = bodyr[0].enabled_mods;
                    //get date
                    let date = bodyr[0].date;
                    //request the file of the last map
                    client.request('http://osu.ppy.sh/osu/' + bodyr[0].beatmap_id, (error, response, body) => {
                        //calculate if fc pp, sr and pp
                        let ifFCPP = calc.ifFCPPCalculation(rawMods, client, bodyr, 0, map, body, accn, calc);
                        let stars = calc.srCalculation(rawMods, body, client);
                        let pp = calc.ppCalculation(rawMods, accn, body, bodyr, 0, client);
                        let mapCompletion = calc.mapCompletion(bodyr, body, client);
                        //put the title together
                        let mt = `${map[0].artist} - ${map[0].title} [${map[0].version}] (${stars} ⃰ )`;
                        //put the description together
                        let md = `PP: ${pp}pp ${ifFCPP}\nAccuracy: ${acc}% (${bodyr[0].count300}/${bodyr[0].count100}/${bodyr[0].count50}/${bodyr[0].countmiss})\nCombo: ${bodyr[0].maxcombo}x / ${map[0].max_combo}x\n${mods}Grade:  ${rank}${mapCompletion}\nMapper: ${map[0].creator} | [Download](https://osu.ppy.sh/beatmapsets/${map[0].beatmapset_id}/download)`;
                        //send the message
                        message.channel.send({ "embed": {
                            "color": 16399236,
                            "footer": {
                                "icon_url": `${aviUrl}${bodyp[0].user_id}`,
                                "text": `Recent play from: ${pname} | ${date}`
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
    },
    //exports.get.compare(parameters)
    compare : function(client, message, args, nameIndex, pAPI, cAPI, mAPI, aviUrl, server) {
        //get the username from the username function in otherFunctions.js
        let username = functions.username(client, message, args, nameIndex, server);
        //if no last map on the guild
        if(!client.lastMap.get(message.guild.id, "lastMap") || client.lastMap.get(message.guild.id, "lastMap") === "-") return message.channel.send("There is no map to compare to");
        //put the compare link with the map id of the last map and the username together
        let compare = cAPI + client.lastMap.get(message.guild.id, "lastMap") + "&u=" + username.split(' ').join('%20');
        //put the profile api and username together and split spaces with %20
        let profile = pAPI + username.split(' ').join('%20');
        //put the map link with the last map id together
        let map = mAPI + client.lastMap.get(message.guild.id, "lastMap");
        //request profile
        client.snekfetch.get(profile).then((r) => {
            let bodyp = r.body;
            //if no user found return
            if(!bodyp[0]) return message.channel.send("I couldn't find that user");
            //request the scores on the last map from entered user
            client.snekfetch.get(compare).then((r) => {
                let bodyc = r.body;
                //if the user has no scores on that map
                if(!bodyc[0]) return message.channel.send("No scores on that map");
                //request the map
                client.snekfetch.get(map).then((r) => {
                    let bodym = r.body;
                    //map images and pfp of the entered user
                    let mapImg = `https://b.ppy.sh/thumb/${bodym[0].beatmapset_id}.jpg`;
                    let avi = aviUrl + bodyp[0].user_id;
                    //get the last map id from the database
                    let lastMapID = client.lastMap.get(message.guild.id, "lastMap");
                    //request the map file
                    client.request('http://osu.ppy.sh/osu/' + lastMapID, (error, response, cBody) => {
                        //switch the ranks to discord emojis
                        let rank1 = calc.rankToEmoji(bodyc, 0, client);
                        //calculate accuracy and mods
                        let accn1 = calc.accCalculation(bodyc, 0);
                        let acc1 = calc.accCalculation(bodyc, 0).toString().substring(0, 5);
                        let mods1 = calc.modCalculation(client, bodyc, 0);
                        let rawMods1 = bodyc[0].enabled_mods;
                        //calculate if fc pp and pp
                        let ifFCPP1 = calc.ifFCPPCalculation(rawMods1, client, bodyc, 0, bodym, cBody, accn1, calc);
                        let pp1 = parseFloat(bodyc[0].pp);
                        //ye i did this in beatconnect.js already just look there for documentation
                        let field1 = {
                            "name": `1. \`${bodyc[0].date}\``,
                            "value": `PP: ${pp1.toFixed(2)}pp ${ifFCPP1}\nAccuracy: ${acc1}% ${calc.getHits(bodyc, 0)}\nCombo: ${bodyc[0].maxcombo}x / ${bodym[0].max_combo}x\n${mods1}Grade:  ${rank1}`
                        };
                        let fields = [
                            field1
                        ];
    
                        let field2 = {
                            "name": '',
                            "value": ''
                        };
                        let field3 = {
                            "name": '',
                            "value": ''
                        };
    
                        if(bodyc[1]) {
                            //same stuff as above
                            let rank2 = calc.rankToEmoji(bodyc, 1, client);
            
                            let accn2 = calc.accCalculation(bodyc, 1);
                            let acc2 = calc.accCalculation(bodyc, 1).toString().substring(0, 5);
                            let mods2 = calc.modCalculation(client, bodyc, 1);
                            let rawMods2 = bodyc[1].enabled_mods;
                            let ifFCPP2 = calc.ifFCPPCalculation(rawMods2, client, bodyc, 1, bodym, cBody, accn2, calc);
                            let pp2 = parseFloat(bodyc[1].pp);
                            field2 = {
                                "name": `2. \`${bodyc[1].date}\``,
                                "value": `PP: ${pp2.toFixed(2)}pp ${ifFCPP2}\nAccuracy: ${acc2}% ${calc.getHits(bodyc, 1)}\nCombo: ${bodyc[1].maxcombo}x / ${bodym[0].max_combo}x\n${mods2}Grade:  ${rank2}`
                            };
                            fields = [
                                field1,
                                field2
                            ];
                        }
                        if(bodyc[2]) {
                            let rank3 = calc.rankToEmoji(bodyc, 2, client);
            
                            let accn3 = calc.accCalculation(bodyc, 2);
                            let acc3 = calc.accCalculation(bodyc, 2).toString().substring(0, 5);
                            let mods3 = calc.modCalculation(client, bodyc, 2);
                            let rawMods3 = bodyc[2].enabled_mods;
                            let ifFCPP3 = calc.ifFCPPCalculation(rawMods3, client, bodyc, 2, bodym, cBody, accn3, calc);
                            let pp3 = parseFloat(bodyc[2].pp);
                            field3 = {
                                "name": `3. \`${bodyc[2].date}\``,
                                "value": `PP: ${pp3.toFixed(2)}pp ${ifFCPP3}\nAccuracy: ${acc3}% ${calc.getHits(bodyc, 2)}\nCombo: ${bodyc[2].maxcombo}x / ${bodym[0].max_combo}x\n${mods3}Grade:  ${rank3}`
                            };
                            fields = [
                                field1,
                                field2,
                                field3
                            ];
                        }
                        //send message lol
                        message.channel.send({
                            "embed": {
                            "color": 16399236,
                            "thumbnail": {
                                "url": mapImg
                            },
                            "author": {
                                "name": `Top plays from ${bodyp[0].username} on ${bodym[0].artist} - ${bodym[0].title} [${bodym[0].version}]`,
                                "url": `https://osu.ppy.sh/users/${bodyp[0].user_id}`,
                                "icon_url": avi
                            },
                            "fields": fields
                            }
                        });
                    });
                });
            });
        });
    }
};

exports.send = {
    help : function (message, server, p) {
        //send message in channel
        message.channel.send({"embed": {
            "description": "**" + server + ":** \n\nprofile (p) <name>: ``sends a " + server + " profile card``\nlast (l) <name>: ``sends recent plays of entered user``\ntop (t) <name>: ``sends top plays of entered user``\n\nusage: " + p + "osu " + server +" <command>",
            "color": 16399236
        }});
    }
}
