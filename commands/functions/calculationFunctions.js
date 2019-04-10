const functions = require("./otherFunctions.js");
module.exports = {
    getHits : (body, index) => {
        let hits = `(${body[index].count300}/${body[index].count100}/${body[index].count50}/${body[index].countmiss})`;
        return hits;
    },
    rankToEmoji : (body, bodyIndex, client) => {
        let rank;
        if(body[bodyIndex].rank === 'X') {
            rank = client.config.osuX;
        } else
        if(body[bodyIndex].rank === 'XH') {
            rank = client.config.osuXH;
        }
        if(body[bodyIndex].rank === 'S') {
            rank = client.config.osuS;
        } else
        if(body[bodyIndex].rank === 'SH') {
            rank = client.config.osuSH;
        } else
        if(body[bodyIndex].rank === 'A') {
            rank = client.config.osuA;
        } else
        if(body[bodyIndex].rank === 'B') {
            rank = client.config.osuB;
        } else
        if(body[bodyIndex].rank === 'C') {
            rank = client.config.osuC;
        } else
        if(body[bodyIndex].rank === 'D') {
            rank = client.config.osuF;
        } else
        if(body[bodyIndex].rank === 'F') {
            rank = client.config.osuF;
        }
        return rank;
    },
    accCalculation : (body, bodyIndex) => {
        let acc300s = parseFloat(body[bodyIndex].count300);
        let acc100s = parseFloat(body[bodyIndex].count100);
        let acc50s = parseFloat(body[bodyIndex].count50);
        let accmiss = parseFloat(body[bodyIndex].countmiss);
        let acc = ((acc300s * 300 + acc100s * 100 + acc50s * 50 + accmiss * 0)/((acc300s + acc100s + acc50s + accmiss) * 300) * 100);
        return acc;
    }, 
    modCalculation : (client, body, bodyIndex) => {
        let rawMods = body[bodyIndex].enabled_mods;
        let mods = client.config.noMod;
        if(rawMods > 0) {
          mods = functions.nearestPow2(rawMods);
        }
        return mods;
    }, 
    ppCalculation : (mods, accn, requestBody, body, bodyIndex, client) => {
        //get the acc, combo and misses
        let acc_percent = parseFloat(accn);
        let combo = parseInt(body[bodyIndex].maxcombo);
        let nmiss = parseInt(body[bodyIndex].countmiss);
        //shoot the body of request in the ojsama parser
        let parser = new client.ojs.parser().feed(requestBody);
        //get the map
        let map = parser.map;
        //calculate the raw stars
        let rawStars = new client.ojs.diff().calc({map: map, mods: mods});
        //calculate the raw pp
        let rawPP = client.ojs.ppv2({
          stars: rawStars,
          combo: combo,
          nmiss: nmiss,
          acc_percent: acc_percent,
        });
        //fix the pp to only two decimal numbers
        let pp = rawPP.total.toFixed(2);
        //return the pp
        return pp;
    },
    srCalculation : (mods, requestBody, client) => {
        //shoot the request body in the parser
        let parser = new client.ojs.parser().feed(requestBody);
        //get the map
        let map = parser.map;
        //calculate the raw star rating
        let rawStars = new client.ojs.diff().calc({map: map, mods: mods});
        //fix the pp to only two decimal numbers
        let stars = rawStars.total.toFixed(2);
        //return the star rating
        return stars;
    },
    ifFCAcc : (body, bodyIndex) => {
        let acc300s = parseFloat(body[bodyIndex].count300);
        let acc100s = parseFloat(body[bodyIndex].count100);
        let acc50s = parseFloat(body[bodyIndex].count50) + parseFloat(body[bodyIndex].countmiss);
        let accmiss = 0;
        let acc = ((acc300s * 300 + acc100s * 100 + acc50s * 50 + accmiss * 0)/((acc300s + acc100s + acc50s + accmiss) * 300) * 100);
        return acc;
    },
    ifFCPPCalculation : (mods, client, body, bodyIndex, mapBody, requestBody, accn, calc) => {
        //shoot the request body in the ojsama parser
        let parser = new client.ojs.parser().feed(requestBody);
        //get the map
        let map = parser.map;
        //calculate the raw stars
        let rawStars = new client.ojs.diff().calc({map: map, mods: mods});
        accn = calc.ifFCAcc(body, bodyIndex);
        let ifFCPP = "";
        //if the combo combo of the play isn't the same as fc combo
        if(body[bodyIndex].maxcombo != mapBody[0].max_combo) {
            //max combo of the map
            let comboFC = parseInt(mapBody[0].max_combo);
            //no misses
            let nmissFC = parseInt(0);
            //get the accuracy
            let acc_percent = parseFloat(accn);
            //calculate if fc pp
            fcPP = client.ojs.ppv2({
                stars: rawStars,
                combo: comboFC,
                nmiss: nmissFC,
                acc_percent: acc_percent,
            });
            //change the variable
            ifFCPP = `=> ${fcPP.total.toFixed(2)}pp (with ${accn.toFixed(2)}%)`;
        }
        //return the if fc pp
        return ifFCPP;
    },
    mapCompletion : (body, requestBody, client) => {
        let parser = new client.ojs.parser().feed(requestBody);
        let map = parser.map;
        let totalObjects = map.nspinners + map.nsliders + map.ncircles;
        let hittedObjects = parseInt(body[0].count300) + parseInt(body[0].count100) + parseInt(body[0].count50) + parseInt(body[0].countmiss);
        let mapCompletion = hittedObjects * 100 / totalObjects;
        if(mapCompletion != 100) {
            mapCompletion = `\nMap Completion: ${mapCompletion.toFixed(2)}%`;
        } else {
            mapCompletion = "";
        }
        return mapCompletion;
    }
}