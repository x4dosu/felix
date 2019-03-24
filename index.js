//imports make sure to npm install them first
const Discord = require("discord.js");
const fs = require("fs");

const Enmap = require("enmap");
const snekfetch = require("snekfetch");
const request = require("request");
const _ = require('lodash');
const ojs = require("ojsama");

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

//databases
client.specialNSFW = new Enmap({name: "nsfwPlus"});
client.commands = new Enmap({name: "commands"});
client.database = new Enmap({
  name: "database",
  fetchAll: false,
  autoFetch: true,
  cloneLevel: 'deep'
});
client.osuNames = new Enmap({
  name: "osu",
  fetchAll: false,
  autoFetch: true,
  cloneLevel: 'deep'
});

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