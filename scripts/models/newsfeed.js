var Collection = require('exoskeleton').Collection;
var Task = require('./task');

var Newsfeed = module.exports = Collection.extend({
    model: Task,
    url: process.env.GOTR_HOST + '/api/newsfeed'
});
