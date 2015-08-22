var Collection = require('exoskeleton').Collection;
var Notification = require('./notification');

var Newsfeed = module.exports = Collection.extend({
    model: Notification,
    url: process.env.GOTR_HOST + '/api/newsfeed'
});
