exports.run = (client, message, args, p) => {
    let cfg = client.config;
    let pApi = cfg.banchoProfileApi;
    let tApi = cfg.banchoTopApi;
    let pUrl = cfg.banchoPUrl;
    let nameIndex = 0;
    let server = "bancho";

    const osu = require("./functions/osuFunctions.js");

    osu.get.top(pApi, tApi, pUrl, client, message, args, nameIndex, server);

}