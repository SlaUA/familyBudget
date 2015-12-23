define([
    'jquery',
    'underscore',
    'backbone',
    'SingleMoveAddView',
    'MultipleMovesCollection',
    'MultipleMovesView',
    'fastclick',
    'text!templates/mainMovesTemplate.html'
], function (jQuery,
             _,
             Backbone,
             SingleMoveAddView,
             MultipleMovesCollection,
             MultipleMovesView,
             fastclick,
             mainMovesTemplate) {

    return Backbone.View.extend({

        el: '#movesApp',
        $body: jQuery('body'),

        events: {
            'click .moveAdd': 'createNewMovePopup'
        },

        initialize: function () {

            this.$el.append(mainMovesTemplate);
            window.app.trigger('addNewView', this);

            // remove click lag on mobile devices
            fastclick.attach(document.body);

            window.app.multipleMovesCollection = new MultipleMovesCollection();
            window.app.multipleMovesCollection.fetch()
                .done(function () {

                    new MultipleMovesView({
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