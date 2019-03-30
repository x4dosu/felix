
/*

before you can run the bot on a new machine 
1. open the modules installer
2. put your own tokens in these files:

  Step 1: discord token in config.json (line 4)
  Step 2: osu tokens in config.json (line 6 until line 11 after k=your-token)
  Step 3: beatconnect token in config.json (line 16)

  you can get the tokens from:
    discord token:
      https://discordapp.com/developers/applications/app-id/bots
    osu token:
      https://old.ppy.sh/p/api
    beatconnect token:
      private, ask the creator for token

3. open run.bat

Please just use for reference

*/

const Discord = require("discord.js");
const fs = require("fs");

const Enmap = require("enmap");
const snekfetch = require("snekfetch");
const request = require("request");
const _ = require('lodash');
const ojs = require("ojsama");
const http = require("https");

//the bot / client
const client = new Discord.Client();
//import for the config.json file
const config = require("./config.json");

//make sure the imports are everywhere accesible
client.config = config;
client.snekfetch = snekfetch;
client.request = request;
client._ = _;
client.ojs = ojs;
client.http = http;

//databases
client.database = new Enmap({name: "database"});
client.commands = new Enmap({name: "commands"});
client.osuNames = new Enmap({name: "osu"});

client.specialNSFW = new Enmap({name: "nsfwPlus"});
client.edaters = new Enmap({name: "edaters"});
client.edateRequest = new Enmap({name: "edateRequest"});
client.sex = new Enmap({name: "sex"});
client.sexRequest = new Enmap({name: "sexRequest"});
client.kids = new Enmap({name: "kids"});
client.birthRequest = new Enmap({name: "birthRequest"});

/*
* this is just to make a new line after clearing the command prompt and running the bot with
* DOSKEY bot=cd your-bot-dir $T cls $T node index.js
*/

console.log("->");

/* so that is looks like this

your-bot-dir>->
The configurations for 8 servers have been loaded
33 commands have been loaded
The osu names of 78 users have been loaded
Felix 🦋 started using version 3.0.3


instead of

your-bot-dir>The configurations for 8 servers have been loaded
33 commands have been loaded
The osu names of 78 users have been loaded
Felix 🦋 started using version 3.0.3
*/

//load databases & log it
client.database.defer.then( () => {console.log(`The configurations for ${client.database.size} servers have been loaded`);});
client.commands.defer.then( () => {console.log(`${client.commands.size} commands have been loaded`);});
client.osuNames.defer.then( () => {console.log(`The osu names of ${client.osuNames.size} users have been loaded`);});

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
  welcomeMessage: "{{user}} joined the server <:yeojin:513456071155646556>",

  farewell: "false",
  farewellChannel: "general",
  farewellMessage: "{{user}} left the server <:owocry:482982931158138880>",

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

//connect bot with discord servers :flushed:
client.login(config.token);