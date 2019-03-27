exports.run = (client, message, args, p) => {
    //nothing to document here
    message.channel.send({"embed": {
        "title": "♥",
        "description": "this is just a list of very helpful and nice people 💝\n\n**Special thanks to:**",
        "url": "",
        "color": 2177891,
        "footer": {
            "icon_url": "https://i.imgur.com/ZvuzvUR.png",
            "text": "Felix <3"
        },
        "fields": [
            {
                "name": "**My brother**",
                "value": "Thanks for helping me with\nthe osu api, the bloodcat api\nand in general being there\nwhen I had questions",
            },
            {
                "name": "**BadGraphics_**",
                "value": "Thank you for giving me some\nideas and kinda helping\nme sometimes hehe",
            },
            {
                "name": "**rip fc**",
                "value": "Thanks for advertising my bot,\ngiving me advice for the osu commands\nand keeping me motivated",
            },
            {
                "name": "**Sarah**",
                "value": "thanks for helping me with\nthe undocumented gatari api",
            },
            {
                "name": "**coletaku**",
                "value": "thanks for cum on my face",
            },
            {
                "name": "**and everyone else**",
                "value": "thank you for using my dead bot :star2:",
            }
    ]}});
}