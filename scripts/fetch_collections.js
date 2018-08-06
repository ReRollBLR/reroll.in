var bgg = require('bgg');
const YAML = require('yaml').default
var Promise = require('bluebird');
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

var users = [];

function main() {
    bgg('guild', {id: '2791', members:1, sort: 'username'})
        .then(function(guildData) {
            page = 2;
            users.push(...guildData.guild.members.member);
            promises = []
            for (let page = 2; page <= (guildData.guild.members.count/25 + 1); page++) {
                promises.push(bgg('guild', {id: '2791', members:1, sort: 'username', page: page})
                    .then(function(guildData) {
                        users.push(...guildData.guild.members.member);
                    })
                );
            }
            Promise.all(promises).then(function() {
                collectionPromises = [];
                collections = {};
                users.forEach(function(user){
                    collectionPromises.push(bgg('collection', {username: user.name})
                        .then(function(results) {
                            console.log(results);
                            collections[user.name] = results.items.item
                        })
                    );
                })
                Promise.all(collectionPromises)
                    .then(function() {
                        let key;
                        for (key of Object.keys(collections)) {
                            fs.writeFileSync('_collections/'+key+'.md','---\n'+YAML.stringify({ games: collections[key], username: key, layout: 'collection'})+'\n---')
                        }
                        
                    });
            })
        })

    
}

main();

