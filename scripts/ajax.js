var Backbone = require('exoskeleton');

var originalAjax = Backbone.ajax;

Backbone.ajax = function(opts) {
    var fields = opts.xhrFields || {};
    fields.withCredentials = true;
    opts.xhrFields = fields;

    return originalAjax.call(this, opts);
};
