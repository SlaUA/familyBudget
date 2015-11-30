define(['jquery', 'underscore', 'backbone', 'SingleMoveEdit'], function ($, _, Backbone) {

    return Backbone.Model.extend({
        defaults: {
            date: Date.now(),
            type: 'income',
            sum: 0,
            comment: ''
        }
    });
});