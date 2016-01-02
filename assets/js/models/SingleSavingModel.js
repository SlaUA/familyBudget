define([
    'jquery',
    'underscore',
    'backbone'
], function ($,
             _,
             Backbone) {

    return Backbone.Model.extend({
        defaults: {
            date: Date.now(),
            type: 'income',
            currency: 'USD',
            sum: 0,
            comment: ''
        }
    });
});