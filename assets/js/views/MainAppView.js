define([
    'jquery',
    'underscore',
    'backbone',
    'SingleMoveAddView',
    'MultipleMovesCollection',
    'MultipleMovesView',
    'TotalMonthView',
    'fastclick'
], function (jQuery,
             _,
             Backbone,
             SingleMoveAddView,
             MultipleMovesCollection,
             MultipleMovesView,
             TotalMonthView,
             fastclick) {

    return Backbone.View.extend({

        el: '#movesApp',
        $body: jQuery('body'),

        events: {
            'click .moveAdd': 'createNewMovePopup'
        },
        initialize: function () {

            // remove click lag on mobile devices
            fastclick.attach(document.body);

            app.multipleMovesCollection = new MultipleMovesCollection();
            app.multipleMovesCollection.fetch()
                .done(function () {

                    new MultipleMovesView({
                        collection: app.multipleMovesCollection
                    });
                    new TotalMonthView({
                        collection: app.multipleMovesCollection
                    });
                })
                .fail(function () {

                });
        },
        createNewMovePopup: function () {
            new SingleMoveAddView();
        }
    });
});