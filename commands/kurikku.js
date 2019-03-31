exports.run = (client, message, args, p) => {
    let cfg = client.config;
    let pApi = cfg.kurikkuProfileApi;
    let tApi = cfg.kurikkuTopApi;
    let rApi = cfg.kurikkuRecentApi;
    let pUrl = cfg.kurikkuPUrl;
    let aviUrl = cfg.kurikkuAviUrl;
    let nameIndex = 1;
    let argIndex = 0;
    let server = "kurikku";

    const osu = require("./functions/osuFunctions.js");

    if(args[argIndex]) {
        let secondArgs = args[argIndex];

        if(secondArgs === "profile" || secondArgs === "p") {
            osu.get.profile(pApi, aviUrl, pUrl, args, message, client, nameIndex, server);
            return;
        } else
        if(secondArgs === "top" || secondArgs === "t") {
            osu.get.top(pApi, tApi, pUrl, client, message, args, nameIndex, server);
            return;
        } else
        if(secondArgs === "last" || secondArgs === "l" || secondArgs === "r" || secondArgs === "recent") {
            osu.get.last(client, message, args, nameIndex, rApi, pApi, server, aviUrl);
            return;
        }
    }
    osu.send.help(message, "Kurikku", p);
    return;
}