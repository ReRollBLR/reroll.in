var bgg = require('bgg');
var Promise = require('bluebird');
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

bgg('collection', {username: 'cataclasma'})
        .then(function(results) {
            console.log(results.items.item[0])
        });