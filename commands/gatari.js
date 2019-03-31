exports.run = (client, message, args, p) => {
    let cfg = client.config;
    if(args[0]) {
        let secondargs = args[0].toLowerCase();
        //if secondsargs are profile
        if(secondargs === 'profile' || secondargs === 'p') {
            let pusername;
            //if the user entered a name
            if(args[1]) {
                pusername = args.slice(1).join(" ");
            } else
            //if the user didnt enter a name
            if(!args[1]) {
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
            if(args[1]) {
                tusername = args.slice(1).join(" ");
            } else
            //if no name entered get default name from api
            if(!args[1]) {
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

                    client.lastMap.set(message.guild.id, bodyr.scores[0].beatmap.beatmap_id, "lastMap");

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
                if(args[1]) {
                    tusername = args.slice(1).join(" ");
                } else
                //if no username
                if(!args[1]) {
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
}

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