exports.run = (client, message, args, p) => {
    compare(client, message, args, 0, client.config.banchoProfileApi, client.config.banchoUserScoresApi, client.config.banchoMapApi, client.config.banchoAviUrl);
}

function compare(client, message, args, nameIndex, pAPI, cAPI, mAPI, aviUrl) {
    let username;
    if(args[nameIndex]) {
        username = args.slice(nameIndex).join(" ");
    } else
    if(!args[nameIndex]) {
        username = client.osuNames.get(message.author.id, "bancho");
    }
    if(username === '-') return message.channel.send("Please enter a user");
    if(username.includes("@everyone")) return message.channel.send("Please don't try to abuse the recent command by pinging everyone");
    if(username.includes("@here")) return message.channel.send("Please don't try to abuse the recent command by pinging everyone");
    if(!client.lastMap.get(message.guild.id, "lastMap") || client.lastMap.get(message.guild.id, "lastMap") === "-") return message.channel.send("There is no map to compare to");

    let compare = cAPI + client.lastMap.get(message.guild.id, "lastMap") + "&u=" + username;
    let profile = pAPI + username.split(' ').join('%20');
    let map = mAPI + client.lastMap.get(message.guild.id, "lastMap");
    client.snekfetch.get(profile).then((r) => {
        let bodyp = r.body;
        if(!bodyp[0]) return message.channel.send("I couldn't find that user");

        client.snekfetch.get(compare).then((r) => {
            let bodyc = r.body;
            if(!bodyc[0]) return message.channel.send("No scores on that map");
            client.snekfetch.get(map).then((r) => {
                let bodym = r.body;

                let mapImg = `https://b.ppy.sh/thumb/${bodym[0].beatmapset_id}.jpg`;
                let avi = aviUrl + bodyp[0].user_id;
                let lastMapID = client.lastMap.get(message.guild.id, "lastMap");

                client.request('http://osu.ppy.sh/osu/' + lastMapID, (error, response, cBody) => {

                    let rank1;
                    rank1 = rankToEmoji(bodyc, 0, client);

                    let accn1 = accCalculation(bodyc, 0);
                    let acc1 = accCalculation(bodyc, 0).toString().substring(0, 5);
                    let mods1 = modCalculation(client, bodyc, 0);
                    let rawMods1 = bodyc[0].enabled_mods;
                    let ifFCPP1 = ifFCPPCalculation(rawMods1, client, bodyc, 0, bodym, cBody, accn1);
                    let pp1 = parseFloat(bodyc[0].pp);

                    let field1 = {
                        "name": `1. \`${bodyc[0].date}\``,
                        "value": `PP: ${pp1.toFixed(2)}pp ${ifFCPP1}\nAccuracy: ${acc1}% ${getHits(bodyc, 0)}\nCombo: ${bodyc[0].maxcombo}x / ${bodym[0].max_combo}x\n${mods1}Grade:  ${rank1}`
                    };
                    fields = [
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
                        let rank2;
                        rank2 = rankToEmoji(bodyc, 1, client);
        
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
                        let rank3;
                        rank3 = rankToEmoji(bodyc, 2, client);
        
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

function getHits(body, index) {
    let hits = `(${body[index].count300}/${body[index].count100}/${body[index].count50}/${body[index].countmiss})`;
    return hits;
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
