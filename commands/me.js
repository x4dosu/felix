exports.run = (client, message, args, p) => {
    if(message.mentions.users.first()) {
        let user = message.mentions.users.first().id;
        let partner = client.edaters.get(user, "partner");
        let userObject = client.users.get(user);
        let avatar = userObject.avatarURL;
        let kids = "-";
        let partnerEmbed = "-";
        if(client.kids.get(user, "kids[0]")) {
            kids = client.kids.get(user, "kids").join(", ");
        }
        if(partner !== "-") {
            let timestamp = client.edaters.get(user, "edateDate");
            let partnerObject = client.users.get(partner);
            partnerEmbed = `${partnerObject.tag} (${timestamp})`;
        }
        message.channel.send({
            "embed": {
            "color": 14280797,
            "thumbnail": {
                "url": avatar
            },
            "author": {
                "name": userObject.tag,
                "icon_url": avatar
            },
            "fields": [
                {
                    "name": "Partner :heart:",
                    "value": partnerEmbed
                },
                {
                    "name": "Kids :couple:",
                    "value": kids
                }
        ]}});
    } else {
        let user = message.author.id
        let partner = client.edaters.get(user, "partner");
        let avatar = message.author.avatarURL;
        let kids = "-";
        let partnerEmbed = "-";
        if(client.kids.get(user, "kids[0]")) {
            kids = client.kids.get(user, "kids").join(", ");
        }
        if(partner !== "-") {
            let timestamp = client.edaters.get(user, "edateDate");
            let partnerObject = client.users.get(partner);
            partnerEmbed = `${partnerObject.tag} (${timestamp})`;
        }
        message.channel.send({
            "embed": {
            "color": 14280797,
            "thumbnail": {
                "url": avatar
            },
            "author": {
                "name": message.author.tag,
                "icon_url": avatar
            },
            "fields": [
                {
                    "name": "Partner :heart:",
                    "value": partnerEmbed
                },
                {
                    "name": "Kids :couple:",
                    "value": kids
                }
        ]}});
    }
}