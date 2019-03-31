
//notice for myself: document your shit wtf

exports.get = {
    //exports.get.profile(parameters);
    profile : function(pAPI, aviUrl, pUrl, args, message, client, nameIndex, server) {
        let username;
        //if there is a username entered in the nameIndex position
        if(args[nameIndex]) {
            //slice everything before the name and join the args with a space
            username = args.slice(nameIndex).join(" ");
        } else {
            //get the default username from the database
            username = client.osuNames.get(message.author.id, server);
        }
        //if the author hasn't changed their username return
        if(username === '-') return message.channel.send("Please enter a user");
        //if the name includes @everyone or @here return
        if(username.includes("@everyone")) return message.channel.send("Please don't try to abuse the profile command by pinging everyone");
        if(username.includes("@here")) return message.channel.send("Please don't try to abuse the profile command by pinging everyone");
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
        let username;
        //if there is a username entered in the nameIndex position
        if(args[nameIndex]) {
            //slice everything before the name and join the args with a space
            username = args.slice(nameIndex).join(" ");
        } else {
            //get the default username from the database
            username = client.osuNames.get(message.author.id, server);
        }
        //if the author hasn't changed their username return
        if(username === '-') return message.channel.send("Please enter a user");
        //if the name includes @everyone or @here return
        if(username.includes("@everyone")) return message.channel.send("Please don't try to abuse the top command by pinging everyone");
        if(username.includes("@here")) return message.channel.send("Please don't try to abuse the top command by pinging everyone");
        //if someone tries to get a different mode than standard return cause I haven't added pp & sr calculation for that
        if(username.includes("&m=")) return message.channel.send("I'm sorry but the bot doesn't support any other modes than standard");
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
                            rank1 = rankToEmoji(bodyt, 0, client);
                            rank2 = rankToEmoji(bodyt, 1, client);
                            rank3 = rankToEmoji(bodyt, 2, client);
                            
                            //calculate the acc and mods
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
                            
                            //request the file of the first map
                            client.request('http://osu.ppy.sh/osu/' + map1[0].beatmap_id, (error, response, body1) => {
                                //calculate if fc pp and star rating
                                let ifFCPP1 = ifFCPPCalculation(rawMods1, client, bodyt, 0, map1, body1, accn1);
                                let stars1 = srCalculation(rawMods1, body1, client);
                                //request the file of the second map
                                client.request('http://osu.ppy.sh/osu/' + map2[0].beatmap_id, (error, response, body2) => {
                                    //calculate if fc pp and star rating
                                    let ifFCPP2 = ifFCPPCalculation(rawMods2, client, bodyt, 1, map2, body2, accn2);
                                    let stars2 = srCalculation(rawMods2, body2, client);
                                    //request the file of the third map
                                    client.request('http://osu.ppy.sh/osu/' + map3[0].beatmap_id, (error, response, body3) => {
                                        //calculate if fc pp and star rating
                                        let ifFCPP3 = ifFCPPCalculation(rawMods3, client, bodyt, 2, map3, body3, accn3);
                                        let stars3 = srCalculation(rawMods3, body3, client);
                                        //put the titles together
                                        let m1t = `${map1[0].artist} - ${map1[0].title} [${map1[0].version}] (${stars1}*)`;
                                        let m2t = `${map2[0].artist} - ${map2[0].title} [${map2[0].version}] (${stars2}*)`;
                                        let m3t = `${map3[0].artist} - ${map3[0].title} [${map3[0].version}] (${stars3}*)`;
                                        //put the descriptions together
                                        let m1d = `PP: ${parseInt(bodyt[0].pp)}pp ${ifFCPP1}\nAccuracy: ${acc1}% (${bodyt[0].count300}/${bodyt[0].count100}/${bodyt[0].count50}/${bodyt[0].countmiss})\nCombo: ${bodyt[0].maxcombo}x / ${map1[0].max_combo}x\n${mods1}Grade:  ${rank1}\nMapper: ${map1[0].creator} | [Download](https://osu.ppy.sh/beatmapsets/${map1[0].beatmapset_id}/download)`
                                        let m2d = `PP: ${parseInt(bodyt[1].pp)}pp ${ifFCPP2}\nAccuracy: ${acc2}% (${bodyt[1].count300}/${bodyt[1].count100}/${bodyt[1].count50}/${bodyt[1].countmiss})\nCombo: ${bodyt[1].maxcombo}x / ${map2[0].max_combo}x\n${mods2}Grade:  ${rank2}\nMapper: ${map2[0].creator} | [Download](https://osu.ppy.sh/beatmapsets/${map2[0].beatmapset_id}/download)`
                                        let m3d = `PP: ${parseInt(bodyt[2].pp)}pp ${ifFCPP3}\nAccuracy: ${acc3}% (${bodyt[2].count300}/${bodyt[2].count100}/${bodyt[2].count50}/${bodyt[2].countmiss})\nCombo: ${bodyt[2].maxcombo}x / ${map3[0].max_combo}x\n${mods3}Grade:  ${rank3}\nMapper: ${map3[0].creator} | [Download](https://osu.ppy.sh/beatmapsets/${map3[0].beatmapset_id}/download)`
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
        let username;
        //if there is a username entered in the nameIndex position
        if(args[nameIndex]) {
            //slice everything before the name and join the args with a space
            username = args.slice(nameIndex).join(" ");
        } else {
            //get the default username from the database
            username = client.osuNames.get(message.author.id, server);
        }
        //if the author hasn't changed their username return
        if(username === '-') return message.channel.send("Please enter a user");
        //if the name includes @everyone or @here return
        if(username.includes("@everyone")) return message.channel.send("Please don't try to abuse the top command by pinging everyone");
        if(username.includes("@here")) return message.channel.send("Please don't try to abuse the top command by pinging everyone");
        //if someone tries to get a different mode than standard return cause I haven't added pp & sr calculation for that
        if(username.includes("&m=")) return message.channel.send("I'm sorry but the bot doesn't support any other modes than standard");
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
                    let rank = rankToEmoji(bodyr, 0, client);
                    //calculate accuracy and mods
                    let accn = accCalculation(bodyr, 0);
                    let acc = accCalculation(bodyr, 0).toString().substring(0, 5);
                    let mods = modCalculation(client, bodyr, 0);
                    let rawMods = bodyr[0].enabled_mods;
                    //request the file of the last map
                    client.request('http://osu.ppy.sh/osu/' + bodyr[0].beatmap_id, (error, response, body) => {
                        //calculate if fc pp, sr and pp
                        let ifFCPP = ifFCPPCalculation(rawMods, client, bodyr, 0, map, body, accn);
                        let stars = srCalculation(rawMods, body, client);
                        let pp = ppCalculation(rawMods, accn, body, bodyr, 0, client);
                        //put the title together
                        let mt = `${map[0].artist} - ${map[0].title} [${map[0].version}] (${stars}*)`;
                        //put the description together
                        let md = `PP: ${pp}pp ${ifFCPP}\nAccuracy: ${acc}% (${bodyr[0].count300}/${bodyr[0].count100}/${bodyr[0].count50}/${bodyr[0].countmiss})\nCombo: ${bodyr[0].maxcombo}x / ${map[0].max_combo}x\n${mods}Grade:  ${rank}\nMapper: ${map[0].creator} | [Download](https://osu.ppy.sh/beatmapsets/${map[0].beatmapset_id}/download)`;
                        //send the message
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
    },
    //exports.get.compare(parameters)
    compare : function(client, message, args, nameIndex, pAPI, cAPI, mAPI, aviUrl) {
        let username;
        //if there is a username entered in the nameIndex position
        if(args[nameIndex]) {
            //slice everything before the name and join the args with a space
            username = args.slice(nameIndex).join(" ");
        } else {
            //get the default username from the database
            username = client.osuNames.get(message.author.id, server);
        }
        //if the author hasn't changed their username return
        if(username === '-') return message.channel.send("Please enter a user");
        //if the name includes @everyone or @here return
        if(username.includes("@everyone")) return message.channel.send("Please don't try to abuse the top command by pinging everyone");
        if(username.includes("@here")) return message.channel.send("Please don't try to abuse the top command by pinging everyone");
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
                        let rank1 = rankToEmoji(bodyc, 0, client);
                        //calculate accuracy and mods
                        let accn1 = accCalculation(bodyc, 0);
                        let acc1 = accCalculation(bodyc, 0).toString().substring(0, 5);
                        let mods1 = modCalculation(client, bodyc, 0);
                        let rawMods1 = bodyc[0].enabled_mods;
                        //calculate if fc pp and pp
                        let ifFCPP1 = ifFCPPCalculation(rawMods1, client, bodyc, 0, bodym, cBody, accn1);
                        let pp1 = parseFloat(bodyc[0].pp);
                        //ye i did this in beatconnect.js already just look there for documentation
                        let field1 = {
                            "name": `1. \`${bodyc[0].date}\``,
                            "value": `PP: ${pp1.toFixed(2)}pp ${ifFCPP1}\nAccuracy: ${acc1}% ${getHits(bodyc, 0)}\nCombo: ${bodyc[0].maxcombo}x / ${bodym[0].max_combo}x\n${mods1}Grade:  ${rank1}`
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
                            let rank2 = rankToEmoji(bodyc, 1, client);
            
                            let accn2 = accCalculation(bodyc, 1);
                            let acc2 = accCalculation(bodyc, 1).toString().substring(0, 5);
                            let mods2 = modCalculation(client, bodyc, 1);
                            let rawMods2 = bodyc[1].enabled_mods;
                            let ifFCPP2 = ifFCPPCalculation(rawMods2, client, bodyc, 1, bodym, cBody, accn2);
                            let pp2 = parseFloat(bodyc[1].pp);
                            field2 = {
                                "name": `2. \`${bodyc[1].date}\``,
                                "value": `PP: ${pp2.toFixed(2)}pp ${ifFCPP2}\nAccuracy: ${acc2}% ${getHits(bodyc, 1)}\nCombo: ${bodyc[1].maxcombo}x / ${bodym[0].max_combo}x\n${mods2}Grade:  ${rank2}`
                            };
                            fields = [
                                field1,
                                field2
                            ];
                        }
                        if(bodyc[2]) {
                            let rank3 = rankToEmoji(bodyc, 2, client);
            
                            let accn3 = accCalculation(bodyc, 2);
                            let acc3 = accCalculation(bodyc, 2).toString().substring(0, 5);
                            let mods3 = modCalculation(client, bodyc, 2);
                            let rawMods3 = bodyc[2].enabled_mods;
                            let ifFCPP3 = ifFCPPCalculation(rawMods3, client, bodyc, 2, bodym, cBody, accn3);
                            let pp3 = parseFloat(bodyc[2].pp);
                            field3 = {
                                "name": `3. \`${bodyc[2].date}\``,
                                "value": `PP: ${pp3.toFixed(2)}pp ${ifFCPP3}\nAccuracy: ${acc3}% ${getHits(bodyc, 2)}\nCombo: ${bodyc[2].maxcombo}x / ${bodym[0].max_combo}x\n${mods3}Grade:  ${rank3}`
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
//put the hits together idk i should use that for more than just compare but im too lazy even tho its not even hard jkdawgjdawkdaw
function getHits(body, index) {
    let hits = `(${body[index].count300}/${body[index].count100}/${body[index].count50}/${body[index].countmiss})`;
    return hits;
}

//switch the ranks to discord emojis
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
//calculate the accuracy (300s * 300 + 100s * 100 + 50s * 50 + misses * 0) / ((300s + 100s + 50s + misses) * 300) * 100
function accCalculation(body, bodyIndex) {
    let acc300s = parseFloat(body[bodyIndex].count300);
    let acc100s = parseFloat(body[bodyIndex].count100);
    let acc50s = parseFloat(body[bodyIndex].count50);
    let accmiss = parseFloat(body[bodyIndex].countmiss);
    let acc = ((acc300s * 300 + acc100s * 100 + acc50s * 50 + accmiss * 0)/((acc300s + acc100s + acc50s + accmiss) * 300) * 100);
    return acc;
}
/*calculate the mods (yes you have to calculate that)
*/
function modCalculation(client, body, bodyIndex) {
    let rawMods = body[bodyIndex].enabled_mods;
    let mods = client.config.noMod;
    if(rawMods > 0) {
      mods = nearestPow2(rawMods);
    }
    return mods;
}
/*get the nearest number with the power of 2 next to the mods number
example:
if the number is 72 the next bitwise number would be 64 left would be 8
that means
64 (dt)
8 (hd)
*/
function nearestPow2(mods) {
    let modlist = [];
    let i = 1;
    //while the mods arent 0 and i have added something to only do it while i is less than 50 just incase
    while(mods!=0 && i < 50) {
        mod = 1 << 31 - Math.clz32(mods);
        modlist.push(mod);
        mods = mods - mod;
        i++;
    }
    //replace the numbers with mod emojis
    replaceIntWithMod(modlist);
    //idk why i checked for the length probably just in case idk
    if(modlist.length != 0) return "Mods: " + modlist.join(' ') + " |  ";
}
//replace the mod numbers with discord emojis
function replaceIntWithMod(a) {
    num = 0;
    //while the number is less or equal to a.length i could just do != but whatever XD
    while(num <= a.length) {
        //if the array includes no mod then that idk why i did this cause that will never happens but yeehaw
        if(a.includes(Mods.None)) {
            let i = a.indexOf(Mods.None);
            a[i] = "NoMod";
        //if the mods include sudden death
        } else if(a.includes(Mods.SuddenDeath)) {
            /*first we make sure that perfect isn't there too otherwise we
            have to remove sudden death or else it would be SDPF
            */
            if(!a.includes(Mods.Perfect)) {
                let i = a.indexOf(Mods.SuddenDeath);
                a[i] = "<:SD:553697395045564427>";
            } else {
                let i = a.indexOf(Mods.SuddenDeath);
                a[i] = "";
            }
        //same thing with dt if nightcore is there remove dt or else it would be NCDT
        } else if(a.includes(Mods.DoubleTime)) {
            if(!a.includes(Mods.Nightcore)) {
                let i = a.indexOf(Mods.DoubleTime);
                a[i] = "<:DT:553697396677279764> ";
            } else {
                let i = a.indexOf(Mods.DoubleTime);
                a[i] = "";
            }
        //the rest are all nearly the same
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
        } else if(a.includes(Mods.Relax)) {
            let i = a.indexOf(Mods.Relax);
            a[i] = "<:RX:553697395116867587>";
        } else if(a.includes(Mods.HalfTime)) {
            let i = a.indexOf(Mods.HalfTime);
            a[i] = "<:HT:553697395846938624> ";
        } else if(a.includes(Mods.SpunOut)) {
            let i = a.indexOf(Mods.SpunOut);
            a[i] = "<:SO:553697395490422795>";
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
        //add one to num
        num++;
    }
}
//calculate the pp
function ppCalculation(mods, accn, requestBody, body, bodyIndex, client) {
    //get the acc, combo and misses
    let acc_percent = parseFloat(accn);
    let combo = parseInt(body[bodyIndex].maxcombo);
    let nmiss = parseInt(body[bodyIndex].countmiss);
    //shoot the body of request in the ojsama parser
    let parser = new client.ojs.parser().feed(requestBody);
    //get the map
    let map = parser.map;
    //calculate the raw stars
    let rawStars = new client.ojs.diff().calc({map: map, mods: mods});
    //calculate the raw pp
    let rawPP = client.ojs.ppv2({
      stars: rawStars,
      combo: combo,
      nmiss: nmiss,
      acc_percent: acc_percent,
    });
    //fix the pp to only two decimal numbers
    let pp = rawPP.total.toFixed(2);
    //return the pp
    return pp;
}
//calculate the star rating
function srCalculation(mods, requestBody, client) {
    //shoot the request body in the parser
    let parser = new client.ojs.parser().feed(requestBody);
    //get the map
    let map = parser.map;
    //calculate the raw star rating
    let rawStars = new client.ojs.diff().calc({map: map, mods: mods});
    //fix the pp to only two decimal numbers
    let stars = rawStars.total.toFixed(2);
    //return the star rating
    return stars;
}
//calculate if fc pp (this doesn't remove the misses from the star rating so not really accurate should fix that some day)
function ifFCPPCalculation(mods, client, body, bodyIndex, mapBody, requestBody, accn) {
    //shoot the request body in the ojsama parser
    let parser = new client.ojs.parser().feed(requestBody);
    //get the map
    let map = parser.map;
    //calculate the raw stars
    let rawStars = new client.ojs.diff().calc({map: map, mods: mods});

    let ifFCPP = "";
    //if the combo combo of the play isn't the same as fc combo
    if(body[bodyIndex].maxcombo != mapBody[0].max_combo) {
        //max combo of the map
        let comboFC = parseInt(mapBody[0].max_combo);
        //no misses
        let nmissFC = parseInt(0);
        //get the accuracy
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
    //return the if fc pp
    return ifFCPP;
}

//bitwise enum of the mods
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
