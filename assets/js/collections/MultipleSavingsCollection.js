define([
    'jquery',
    'underscore',
    'backbone',
    'backboneLocalStorage',
    'SingleSavingModel'
], function (jQuery,
             _,
             Backbone,
             backboneLocalStorage,
             SingleSavingModel) {

    return Backbone.Collection.extend({

        model: SingleSavingModel,
        localStorage: new Backbone.LocalStorage('savingsCollection'),

        // sort by date
        comparator: function (saving) {
            return saving.get('date');
        }
    });

});