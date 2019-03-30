exports.run = (client, message, args, p) => {
    
    let cfg = client.config;

    let mapQuery;
    //if someone entered a map
    if(args[0]) {
        mapQuery = args.slice(0).join(" ");
    } else
    //else if there is nothing entered return
    if(!args[0]) return message.channel.send("Please enter a map I should look for");
    //if the pQuery includes ping stuff return
    if(mapQuery.includes("@everyone")) return message.channel.send("Please don't try to abuse the top command by pinging everyone");
    if(mapQuery.includes("@here")) return message.channel.send("Please don't try to abuse the top command by pinging everyone");
    //if the search includes -s we split that and replace it with &s= and put all to lower case
    if(mapQuery.includes("-s")) {
      mapQuery = mapQuery.split(" -s ").join("&s=").toLowerCase();
    }
    //put the maps together
    let maps = `${cfg.beatconnectSearchApi}${cfg.beatconnectToken}&q=${mapQuery}`;
    //if the executor did -s then cut that from the search
    if(mapQuery.includes("&s=")) {
      mapQuery = mapQuery.substring(0, mapQuery.indexOf('&'));
    }
    //request the maps
    client.snekfetch.get(maps).then((r) => {
      let rawBody = r.body;
      //if you want to search by last updated
      /*let body = client._.sortBy(rawBody, function(o) { 
          return o.last_updated; 
      }).reverse();*/
      
      //NOTICE FOR MYSELF: ADD RANDOM AND OTHER OWN ORDER FUNCTIONS TO THIS 
      
      let body = rawBody;

      //if no maps return
      if(!body.beatmaps[0]) return message.channel.send(`I couldn't find any maps under ${mapQuery}`);
      //set all maps to first map cause we know we that
      let map1 = body.beatmaps[0].id;
      let uniqueID1 = body.beatmaps[0].unique_id;
      let map2 = map1;
      let uniqueID2 = uniqueID1;
      let map3 = map1;
      let uniqueID3 = uniqueID1;
      let map4 = map1;
      let uniqueID4 = uniqueID1;
      //check if all the maps exist and if so change the variables
      if(body.beatmaps[1]) {
        map2 = body.beatmaps[1].id;
        uniqueID2 = body.beatmaps[1].unique_id;
        if(body.beatmaps[2]) {
          map3 = body.beatmaps[2].id;
          uniqueID3 = body.beatmaps[2].unique_id;
          if(body.beatmaps[3]) {
            map4 = body.beatmaps[3].id;
            uniqueID4 = body.beatmaps[3].unique_id;
          }
        }
      }

      //now we put the map set ids together with the bancho map set url
      let mapAPI1 = cfg.banchoSetApi + map1;
      let mapAPI2 = cfg.banchoSetApi + map2;
      let mapAPI3 = cfg.banchoSetApi + map3;
      let mapAPI4 = cfg.banchoSetApi + map4;
      //then we request the maps
      client.snekfetch.get(mapAPI1).then((r) => {
          let mapn1 = r.body;
          client.snekfetch.get(mapAPI2).then((r) => {
              let mapn2 = r.body;
              client.snekfetch.get(mapAPI3).then((r) => {
                  let mapn3 = r.body;
                  client.snekfetch.get(mapAPI4).then((r) => {
                      let mapn4 = r.body;
                      //if one of the maps isn't available on bancho return cause we need info from there
                      if(!mapn1[0] || !mapn2[0] || !mapn3[0] || !mapn4[0]) return message.channel.send("One of the maps I was looking for is deleted on bancho!");
                      //we convert the status (numbers) to a readable string
                      let status1 = getStatus(mapn1);
                      let status2 = getStatus(mapn2);
                      let status3 = getStatus(mapn3);
                      let status4 = getStatus(mapn4);
                      //we convert the difficulties to emojis
                      let diffIcons1 = diffInIcon(mapn1);
                      let diffIcons2 = diffInIcon(mapn2);
                      let diffIcons3 = diffInIcon(mapn3);
                      let diffIcons4 = diffInIcon(mapn4);
                      //the favourites
                      let favs1 = favourites(mapn1[0].favourite_count);
                      let favs2 = favourites(mapn2[0].favourite_count);
                      let favs3 = favourites(mapn3[0].favourite_count);
                      let favs4 = favourites(mapn4[0].favourite_count);

                      //get the nominations & hypes then put favs noms and hypes together
                      let noms1 = nominations(body.beatmaps[0].nominations_current);
                      let hypes1 = hypes(body.beatmaps[0].hype_current);
                      let fNH1 = `${favs1}${noms1}${hypes1}`;

                      //first field
                      let field1 = {
                        "name": `${mapn1[0].artist} - ${mapn1[0].title}`,
                        "value": `${diffIcons1}\nStatus: ${status1}\nMapper: ${body.beatmaps[0].creator}\n${fNH1}\n[Map](https://osu.ppy.sh/beatmapsets/${map1}) | [Download](http://beatconnect.io/b/${map1}/${uniqueID1})`,
                        "inline": false
                      };
                      //we leave the other fields blank for now
                      let field2 = {
                        "name": "",
                        "value": ""
                      };
                      let field3 = {
                        "name": "",
                        "value": ""
                      };
                      let field4 = {
                        "name": "",
                        "value": ""
                      };
                      
                      //if the fourth map isn't the same as the first then it exists
                      if(map4 !== map1) {
                        //get noms & hypes and put everything together
                        let noms4 = nominations(body.beatmaps[3].nominations_current);
                        let hypes4 = hypes(body.beatmaps[3].hype_current);
                        let fNH4 = `${favs4}${noms4}${hypes4}`;
                        //make the field
                        field4 = {
                          "name": `${mapn4[0].artist} - ${mapn4[0].title}`,
                          "value": `${diffIcons4}\nStatus: ${status4}\nMapper: ${body.beatmaps[3].creator}\n${fNH4}\n[Map](https://osu.ppy.sh/beatmapsets/${map4}) | [Download](http://beatconnect.io/b/${map4}/${uniqueID4})`,
                          "inline": false
                        };
                      }
                      //same as the fourth map
                      if(map3 !== map1) {
                        let noms3 = nominations(body.beatmaps[2].nominations_current);
                        let hypes3 = hypes(body.beatmaps[2].hype_current);
                        let fNH3 = `${favs3}${noms3}${hypes3}`;
                        field3 = {
                          "name": `${mapn3[0].artist} - ${mapn3[0].title}`,
                          "value": `${diffIcons3}\nStatus: ${status3}\nMapper: ${body.beatmaps[2].creator}\n${fNH3}\n[Map](https://osu.ppy.sh/beatmapsets/${map3}) | [Download](http://beatconnect.io/b/${map3}/${uniqueID3})`,
                          "inline": false
                        };
                      }
                      //same as the fourth map
                      if(map2 !== map1) {
                        let noms2 = nominations(body.beatmaps[1].nominations_current);
                        let hypes2 = hypes(body.beatmaps[1].hype_current);
                        let fNH2 = `${favs2}${noms2}${hypes2}`;
                        field2 = {
                          "name": `${mapn2[0].artist} - ${mapn2[0].title}`,
                          "value": `${diffIcons2}\nStatus: ${status2}\nMapper: ${body.beatmaps[1].creator}\n${fNH2}\n[Map](https://osu.ppy.sh/beatmapsets/${map2}) | [Download](http://beatconnect.io/b/${map2}/${uniqueID2})`,
                          "inline": false
                        };
                      }
                      //fields are for now just the first one
                      let fields = [
                        field1
                      ];
                      //if the fourth map isn't the same as the first then all maps exist
                      if(map4 !== map1) {
                        fields = [
                          field1,
                          field2,
                          field3,
                          field4
                        ];
                      } else
                      //pretty much the same as the fourth one
                      if(map3 !== map1) {
                        fields = [
                          field1,
                          field2,
                          field3
                        ];
                      } else
                      //again
                      if(map2 !== map1) {
                        fields = [
                          field1,
                          field2
                        ];
                      }
                      //now we send the map(s)
                      message.channel.send({
                        "embed": {
                        "title": `Maps with the query: \`${mapQuery}\``,
                        "url": `http://beatconnect.io`,
                        "color": 16399236,
                        "fields": fields}}); 
                  });
              });
          });
      });
  });
  return;
}

//change the status to a string
function getStatus(mapn) {
  let status;
  if(mapn[0].approved === "4") {
      status = 'Loved';
  } else
  if(mapn[0].approved === "3") {
      status = 'Qualified';
  } else
  if(mapn[0].approved === "2") {
      status = 'Approved';
  } else
  if(mapn[0].approved === "1") {
      status = 'Ranked';
  } else
  if(mapn[0].approved === "0") {
      status = 'Pending';
  } else
  if(mapn[0].approved === "-1") {
      status = 'Work In Progress';
  } else
  if(mapn[0].approved === "-2") {
      status = 'Graveyarded';
  }
  return status;
}

//change maps difficulty to icons instead of numbers
function diffInIcon(mapn) {
  let i = 0;
  //new array
  let icons = [];
  //while there are sub diffs
  while(mapn[i]) {
      let diff = mapn[i].difficultyrating;
      //push the diff in array
      icons.push(diff);
      i++;
  }
  //sort the beatmaps by difficulty
  icons.sort();
  //turn the diff numbers to icons
  bigLarryLover(icons);
  return icons.join('');
}

//don't mind that name hehe
function bigLarryLover(a) {
  let num = 0
  //number is less or equal to the items in the array
  while(num <= a.length) {
      if(a[num] >= "0" && a[num] < "2") {
          a[num] = "<:Easy:554700646503284764>";
      } else
      if(a[num] >= "2" && a[num] < "2.7") {
          a[num] = "<:Normal:554700646117539860>";
      } else
      if(a[num] >= "2.7" && a[num] < "4") {
          a[num] = "<:Hard:554700646461210634>";
      } else
      if(a[num] >= "4" && a[num] < "5.3") {
          a[num] = "<:Insane:554700646067077140>";
      } else
      if(a[num] >= "5.3" && a[num] < "6.5") {
          a[num] = "<:Expert:554700646268272650>";
      } else
      if(a[num] >= "6.5") {
          a[num] = "<:ExpertPlus:554700646297632768>";
      }
      num++;
  }
}

function favourites(favs) {
  let fav = "";
  /*
   * i commented this because it look stupid if nothing is there so
   * i prefer if there is a 0 but if i feel like changing that i can
   */
  //if(favs != 0) {
    fav = `${favs} :hearts:`;
  //}
  return fav;
}

function nominations(noms) {
  let nom = "";
  if(noms != 0) {
    nom = ` ${noms} :thumbup: `;
  }
  return nom;
}

function hypes(hypes) {
  let hype = "";
  if(hypes != 0) {
    hype = `${hypes} :mega:`;
  }
  return hype;
}