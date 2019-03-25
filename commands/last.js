exports.run = (client, message, args, p) => {
    let cfg = client.config;
    let pApi = cfg.banchoProfileApi;
    let rApi = cfg.banchoRecentApi;
    let aviUrl = cfg.banchoAviUrl;
    let nameIndex = 0;
    let server = "bancho";

    last(client, message, args, nameIndex, rApi, pApi, server, aviUrl);
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
