define([
    'jquery',
    'underscore',
    'backbone',
    'backboneLocalStorage',
    'SingleMoveModel'
], function (jQuery,
             _,
             Backbone,
             backboneLocalStorage,
             SingleMoveModel) {

    return Backbone.Collection.extend({

        model: SingleMoveModel,
        localStorage: new Backbone.LocalStorage('movesCollection'),

        filterByDate: function (month, year) {

            return this.filter(function (move) {

                var dateOfMove = new Date(move.get('date'));
                return month === dateOfMove.getMonth() && year === dateOfMove.getFullYear();
            });
        },

        // sort by date
        comparator: function (move) {
            return move.get('date');
        }
    });

});