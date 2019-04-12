exports.run = (client, message, args, p) => {
    //nothing to document here
    if(!args[0]) return message.channel.send("WHO YOU TRYNNA STAN?? STAN LOONA!!");
    let arg = args[0].toLowerCase();
    if(arg.includes("@everyone") || arg.includes("@here")) {
        message.channel.send("STOP TRYING TO PING EVERYONE AND STAN LOONA INSTEAD :gift_heart:");
    } else
    if(arg === "loona") {
        //array of all loona girls
        let loona = ["heejin", "hyunjin+loona", "jinsoul", "haseul", "chuu", "yeojin", "olivia+hye", "choerry", "go+won", "vivi+loona", "kim+lip", "yves+loona"];
        //get a random girl from the array
        loona = loona[client.functions.getRandomInt(loona.length)];
        //put the url together and replace the key with the key and the query with the random girl
        let url = client.config.tenorSearchApi.replace("{query}", loona).replace("{key}", client.config.tenorToken);
        //request the url
        client.snekfetch.get(url).then((r) => {
            let body = r.body;
            //if no result return just in case tho that should never happen
            if(!body.results[0]) return;
            //send the message
            message.channel.send({
                "embed": {
                    "description": `**STAN LOONA :pray: :heart_eyes: (${loona.split(/loona|[+]/).join(" ").toUpperCase()})**`,
                    "color": 16399236,
                    "image": {
                        "url": body.results[client.functions.getRandomInt(body.results.length)].media[0].gif.url
                    }
                }
            });
        });
    } else 
    if(arg === "josh") {
        message.channel.send("okay fair point josh is more epic than loona (stan loona)");
    } else
    if(arg === "oppa") {
        message.channel.send("I LOVE YOU OPPA :heart: :heart: :heart: :heart:");
    } else
    if(arg === "aaron") {
        message.channel.send("stan loona stan aaron :pray:");
    } else
    if(arg === "dane" || arg === "x4d") {
        message.channel.send("How can oyu not stan someone that maps loona maps and impregnantes me (i love you dane (penge pera (kamu sama seperti bapamu)))");
    } else
    if(arg === "graphics") {
        message.channel.send("good graphics stan loona");
    } else
    if(arg === "cookiezi") {
        message.channel.send("COOKIEZI OUTDATED BEASTTROLL OVERRATED LOONA ACTIVATED !!!!!! STAN LOONA");
    } else
    if(arg === "bts") {
        message.channel.send("BTS IS COOL BUT HAVE YOU SEEN LOONA THEY ARE ASTONISHING :pray:");
    } else 
    if(arg === "coletaku") {
        message.channel.send("best mapper alive. with the voice of an angel and the face of a goddess! stan loona (osu needs more loona)");
    } else
    if(arg === "kids") {
        message.channel.send("yee");
    } else
    if(arg === "miaya") {
        message.channel.send("stop spamming loli yuri in nsfw chat wtf");
    } else
    if(arg === "gaming") {
        message.channel.send("im a gamer too and so is loona so stan loona");
    } else
    if(arg === "sotarks") {
        message.channel.send("who tf is sotarks stan loona");
    } else
    if(arg === "nigger" || arg === "niggers") {
        message.channel.send("thats kinda racist i would stan loona instead (but thats just my opinion)");
    } else
    if(arg === "sakuu") {
        message.channel.send("omoi jof please map loona maps");
    } else
    if(arg === "osu") {
        message.channel.send("osu is cool but there arent enough loona maps yet");
    } else
    if(arg === "natsu") {
        message.channel.send("NATSU PLEASE COMEBACK AND MAP ALL LOONA SONGS :pray:");
    } else
    if(arg === "exo") {
        message.channel.send("I MEAN EXO IS ALRIGHT BUT HAVE YOU LISTENED TO LOONA?? EXO IS NOTHING COMPARED TO THEM! STAN LOONA");
    } else
    if(arg === "om") {
        message.channel.send("om symbol osu");
    } else
    if(arg === "bigbang") {
        message.channel.send("big bang is cool BUT LOONA IS EPIC STAN LOONA");
    } else
    if(arg === "felix") {
        message.channel.send("yea no fuck felix stan loona :pray:");
    } else
    if(arg === "nina") {
        message.channel.send("i couldn't agree more! stan nina!!!!");
    } else
    if(args.join(" ") === "emma forster") {
        message.channel.send("yee");
    } else
    if(arg === "gay") {
        message.channel.send("im gay");
    } else
    if(arg === "twice") {
        message.channel.send("ME NO LIKEY LIKEY TWICE! STAN ACTUAL TALENT STAN LOONA");
    } else
    if(arg === "dreamcatcher") {
        message.channel.send("dreamcatcher kinda cool yea BUT STAN LOONA");
    } else
    if(arg === "gowon" || arg === "yeojin" || arg === "chuu" || arg === "heejin" || arg === "hyunjin" || arg === "vivi" || arg === "jinsoul" || arg+args[1] === "oliviahye" || arg+args[1] === "kimlip" || arg === "haseul" || arg === "choerry" || arg === "yves") {
        message.channel.send(":heart_eyes: :heart_eyes: :heart_eyes:");
    } else
    if(arg === "matt" || arg === "matthew") {
        message.channel.send("ye he has a good msuic taste stan loona");
    } else
    if(arg === "ben") {
        message.channel.send("hes cool but STAN LOONA");
    } else
    if(arg === "jannick") {
        message.channel.send("YES (right after loona)");
    } else
    if(arg === "marcel") {
        message.channel.send("I can just agree with that! but don't forget to stan loona");
    } else
    if(arg === "lars") {
        message.channel.send("Ich liebe dich (stan loona!)");
    } else
    if(arg === "snot") {
        message.channel.send("ok stan loona scottster");
    } else {
        message.channel.send(`${args.join(" ").toUpperCase()} IS OKAY BUT WE ONLY STAN TALENT STAN LOONA !!! :nail_care:`);
    }
}