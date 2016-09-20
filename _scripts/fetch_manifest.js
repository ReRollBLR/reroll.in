var Tabletop = require('tabletop');
var async = require('async');
var YAML = require('yamljs');
var fs = require('fs');

// all options are optional
var options = {
  timeout: 10000, // timeout of 10s (5s is the default)

  // see https://github.com/cujojs/rest/blob/master/docs/interceptors.md#module-rest/interceptor/retry
  retry: {
    initial: 100,
    multiplier: 2,
    max: 15e3
  }
}

var bgg = require('bgg')(options);

var sheets = [
{
  name: "Board Games",
  url: 'https://docs.google.com/spreadsheets/d/1Mk8dK_QESBX3GQ8e2F7wPtdF74V9gw0ohhU5UHGJK5Y/pubhtml',
  sheetName: "Inventory",
}
];

async.forEach(sheets, function (item, callback){

  function writeData(dataSet, tabletop) {
    var keys = tabletop.sheets(item.sheetName)['column_names'];
    var gamesList = tabletop.sheets(item.sheetName).toArray(); //list of rows

    async.forEach(gamesList, function (game, cb) {
      var bgg_id = game[keys.indexOf('bgg_id')];
      bgg('thing', {type: 'boardgame', id: bgg_id})
      .then(function(results){

        bgg_response = results['items']['item'];
        var name = "";
        for (var i = 0; i < bgg_response.name.length; i++) {
          var n = bgg_response.name[i];
          if(n.type == 'primary')
            name = n.value;
        }

        var gameData = {
          name: name,
          description: bgg_response.description,
          bgg_id: bgg_response.id,
          thumbnail: bgg_response.thumbnail,
          image: bgg_response.image,
          minPlayers: bgg_response.minplayers.value,
          maxPlayers: bgg_response.maxplayers.value,
          yearPublished: bgg_response.yearpublished.value,
          playTime: bgg_response.playingtime.value,
          short_id: game[keys.indexOf('short_id')],
          comment: game[keys.indexOf('comment')],
          buy_url: game[keys.indexOf('buy_url')],
          buy_type: game[keys.indexOf('buy_type')],
        };
        var yamlFrontMatter = 
          "---\n"+
          YAML.stringify( {
          layout: 'game',
          title: gameData.name,
          game: gameData,
        }, 2)
          +"\n---";
        
        var file = '_games/'+game[keys.indexOf('short_id')]+'.md';
        fs.writeFileSync(file, yamlFrontMatter);
      
        console.log(yamlFrontMatter);
        
        cb();
      });

    }, function(err){
        callback();
    });
  }

  Tabletop.init( { key: item.url,
    callback: writeData,
    wanted: [item.sheetName],
    simpleSheet: false } )

  }, function(err) {
    console.log('Done');
  });  