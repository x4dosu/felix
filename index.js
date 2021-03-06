
/*

before you can run the bot on a new machine 
1. open the modules installer
2. put your own tokens in these files:

  Step 1: discord token in config.js (line 4)
  Step 2: osu tokens in config.js (line 6 until line 12 after k=your-token)
  Step 3: beatconnect token in config.js (line 14)
  Step 4: google token in config.js (line 17)

  you can get the tokens from:
    discord token:
      https://discordapp.com/developers/applications/app-id/bots
    osu token:
      https://old.ppy.sh/p/api
    beatconnect token:
      private, ask the creator for token
    google token:
      https://console.developers.google.com/apis/credentials?project=_

3. open run.bat

Please just use for reference

*/

const Discord = require("discord.js");
const fs = require("fs");
const Enmap = require("enmap");

//create the bot / client object
const client = new Discord.Client();

//make sure the imports are everywhere accesible
client.snekfetch = require("snekfetch");
client.request = require("request");
client._ = require('lodash');
client.ojs = require("ojsama");
client.xmlParser = require('xml2json');
//client.fetch = require('node-fetch');
client.config = require("./config.js");
client.functions = require("./commands/functions/otherFunctions.js");

//databases
client.database = new Enmap({ name: "database" });
client.commands = new Enmap({ name: "commands" });
client.osuNames = new Enmap({ name: "osu" });
client.lastMap = new Enmap({ name: "lastMap" });
client.specialNSFW = new Enmap({ name: "nsfwPlus" });
client.edaters = new Enmap({ name: "edaters" });
client.edateRequest = new Enmap({ name: "edateRequest" });
client.sex = new Enmap({ name: "sex" });
client.sexRequest = new Enmap({ name: "sexRequest" });
client.kids = new Enmap({ name: "kids" });
client.kidID = new Enmap({ name: "kidsNameID" });
client.birthRequest = new Enmap({ name: "birthRequest" });

//ERROR AND WARN HAVE TO BE THERE OTHERWISE BOT CAN CRASH WITHOUT ANY ERROR MESSAGE OR ANYTHING!
client.on("error", console.error);
client.on("warn", console.warn);
//THIS SHOWS YOUR TOKEN ON STARTUP BE CAREFUL
//client.on("debug", console.debug);

fs.readdir("./events/", (err, files) => {
  //if error report to console
  if (err) return console.error(err);
  files.forEach(file => {
    //import the event file
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    //if you want to see which events have been loaded uncomment this (this is annoying if you have a lot of events)
    //console.log(`Event: ${eventName}`);
    
    //normal event promise
    client.on(eventName, event.bind(null, client));
  });
});

fs.readdir("./commands/", (err, files) => {
  //if error report to console
  if (err) return console.error(err);
  files.forEach(file => {
    //if it's not a js file return
    if (!file.endsWith(".js")) return;
    //import the command file
    let props = require(`./commands/${file}`);
    let commandName = file.split(".")[0];
    //if you want to see which commands have been loaded uncomment this (this is annoying if you have a lot of commands)
    //console.log(`Command: ${commandName}`);
    //store the commands (the message event then requests them if they are needed )
    client.commands.set(commandName, props);
  });
});

//default settings for databases
client.defaultSettings = {
  welcome: "false",
  welcomeChannel: "general",	
  welcomeMessage: "{{user}} joined the server",

  farewell: "false",
  farewellChannel: "general",
  farewellMessage: "{{user}} left the server",

  roleOnJoin: "false",
  joinRole: "Member",

  prefix: client.config.prefix
};
client.osuConfig = {
  bancho: "-",
  akatsuki: "-",
  ripple: "-",
  gatari: "-",
  kurikku: "-",
  enshi: "-",
  enjuu: "-",
  yozora: "-",
  kawata: "-"
};

//array of all users with extra bot perms
client.privileged = [
  client.config.ownerID,
  client.config.aaronID,
  client.config.badgraphicsID,
  client.config.x4dID
];

//connect bot with discord servers :flushed:
client.login(client.config.token);

//stan talent stan loona