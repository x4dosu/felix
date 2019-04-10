exports.run = (client, message, args, p) => {
    //if there is something behind help
    if(args[0]) {
        //put the args to lower case
        let help = args[0].toLowerCase();
        //if the args are equal to osu
        if(help === "osu") {
            message.channel.send(`\`\`\`asciidoc
osu :: ${client.config.osuCmd}

profile <name> :: ${client.config.profileCmd}

top <name> :: ${client.config.topCmd}

last <name> :: ${client.config.lastCmd}

compare <name> :: ${client.config.compareCmd}

beatconnect <map name> :: ${client.config.beatconnectCmd}

akatsuki :: ${client.config.akatsukiCmd}

ripple :: ${client.config.rippleCmd}

gatari :: ${client.config.gatariCmd}

kurikku :: ${client.config.kurikkuCmd}

enshi :: ${client.config.enshiCmd}

enjuu :: ${client.config.enjuuCmd}

kawata :: ${client.config.kawataCmd}\`\`\``);
            return;
        } else
        //if the args are equal to nsfw
        if(help === "nsfw") {
            message.channel.send(`\`\`\`asciidoc
gelbooru <tag> :: ${client.config.gelbooruCmd}

yandere <tag> :: ${client.config.yandereCmd}

danbooru <tag> :: ${client.config.danbooruCmd}\`\`\``);
            return;
        } else
        //if the args are equal to fun then lets have fun :3
        if(help === "fun") {
            message.channel.send(`\`\`\`asciidoc
edate <name | breakup> :: ${client.config.edateCmd}

esex <name> :: ${client.config.esexCmd}

epregnancy :: ${client.config.epregnancyCmd}

ebirth :: ${client.config.ebirthCmd}

eabort :: ${client.config.eabortCmd}

family <name> :: ${client.config.familyCmd}

kid <name> :: ${client.config.kidCmd}

youtube <query> :: ${client.config.youtubeCmd}

stan <name> :: ${client.config.stanCmd}\`\`\``);
            return;
        }
        //if the args are equal to util
        if(help === "util") {
            message.channel.send(`\`\`\`asciidoc
help :: ${client.config.helpCmd}

ping :: ${client.config.pingCmd}

credits :: ${client.config.creditsCmd}

config set <property> <value> :: ${client.config.configCmd}\`\`\``);
            return;
        } else
        //if the args are equal to owner
        if(help === "owner") {
            if(!client.isSuperior) return message.channel.send({"embed": {
                "description": "These commands are only accesible for the creator of the bot",
                "color": 16399236
            }});
            message.channel.send(`\`\`\`asciidoc
uptime :: ${client.config.uptimeCmd}

status <type> <activity> :: ${client.config.statusCmd}

inviteme <guild name> :: ${client.config.inviteMeCmd}

leaveme <guild name> :: ${client.config.leaveMeCmd}

leave :: ${client.config.leaveCmd}

nsfw+ :: ${client.config.nsfwPlusCmd}

setavatar <link to a picture> :: ${client.config.setAvatarCmd}

setname <name> :: ${client.config.setNameCmd}

stop :: ${client.config.stopCmd}

eval <code> :: ${client.config.evalCmd}\`\`\``);
            return;
        }
    }
    if(args.join(" ") === "me with my dick") {
        message.channel.send("okay oni-chan UwU");
        return;
    }
    //else if there are no first args send normal help command (i dont want to document this cause it should be self explanatory)
    message.channel.send({"embed": {
        "color": `10970023`,
        "footer": {
            "icon_url": "https://i.imgur.com/7hq5hJQ.png",
            "text": client.user.username + " | Version " + client.config.version
        },
        "fields": [
            {
                "name": "PREFIX:",
                "value": p
            },
            {
                "name": "OSU:",
                "value": "osu, profile, top, last, compare"
            },
            {
                "name": "NSFW:",
                "value": "gelbooru, yandere, danbooru"
            },
            {
                "name": "FUN",
                "value": "edate, esex, epregnancy, ebirth, eabort, family, kid, youtube, stan"
            },
            {
                "name": "UTIL:",
                "value": "help, ping, credits, config"
            },
            {
        "name": "USEFUL LINKS:",
        "value": `[Bot Invite](${client.config.botInvite}), [My Server](${client.config.serverInvite})`
    }]}});
}