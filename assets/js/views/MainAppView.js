define([
    'jquery',
    'underscore',
    'backbone',
    'SingleMoveAddView',
    'MultipleMovesView',
    'fastclick'
], function (jQuery, _, Backbone, SingleMoveAddView, MultipleMovesView, fastclick) {

    return Backbone.View.extend({

        el: '#movesApp',
        $body: jQuery('body'),

        events: {
            'click .moveAdd': 'createNewMovePopup'
        },
        initialize: function () {

            // remove click lag on mobile devices
            fastclick.attach(document.body);
            new MultipleMovesView();
        },
        createNewMovePopup: function () {
            new SingleMoveAddView();
        }
    });
});