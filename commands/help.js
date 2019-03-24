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
akatsuki :: ${client.config.akatsukiCmd}
ripple :: ${client.config.rippleCmd}
gatari :: ${client.config.gatariCmd}
kurikku :: ${client.config.kurikkuCmd}
enshi :: ${client.config.enshiCmd}
enjuu :: ${client.config.enjuuCmd}
yozora :: ${client.config.yozoraCmd}
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
            if(message.author.id != client.config.ownerID) return message.channel.send({"embed": {
                "description": "These commands are only accesible for the creator of the bot",
                "color": 16399236
            }});
            message.channel.send(`\`\`\`asciidoc
uptime :: ${client.config.uptimeCmd}
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
                "value": "osu, profile, top, last, akatsuki, ripple, gatari, kurikku, enshi, enjuu, yozora"
            },
            {
                "name": "NSFW:",
                "value": "gelbooru, yandere, danbooru"
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