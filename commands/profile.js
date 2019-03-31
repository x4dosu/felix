exports.run = (client, message, args, p) => {
    let cfg = client.config;
    let pApi = cfg.banchoProfileApi;
    let pUrl = cfg.banchoPUrl;
    let aviUrl = cfg.banchoAviUrl;
    let nameIndex = 0;
    let server = "bancho";

    const osu = require("./functions/osuFunctions.js");

    osu.get.profile(pApi, aviUrl, pUrl, args, message, client, nameIndex, server);
}