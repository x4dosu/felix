exports.run = (client, message, args, p) => {
    let cfg = client.config;
    let pApi = cfg.banchoProfileApi;
    let tApi = cfg.banchoTopApi;
    let rApi = cfg.banchoRecentApi;
    let pUrl = cfg.banchoPUrl;
    let aviUrl = cfg.banchoAviUrl;
    let nameIndex = 1;
    let argIndex = 0;
    let server = "bancho";

    const osu = require("./functions/osuFunctions.js");
    
    osu.get.last(client, message, args, nameIndex, rApi, pApi, server, aviUrl);

}