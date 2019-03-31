exports.run = (client, message, args, p) => {
    const osu = require("./functions/osuFunctions.js");
    
    osu.get.compare(client, message, args, 0, client.config.banchoProfileApi, client.config.banchoUserScoresApi, client.config.banchoMapApi, client.config.banchoAviUrl);
}