define(['jquery', 'underscore', 'backbone', 'SingleMoveAddView'], function (jQuery, _, Backbone, SingleMoveAddView) {

    window.app = window.app || {};

    app.MainAppView = Backbone.View.extend({

        el: '#movesApp',
        $body: jQuery('body'),

        events: {
            'click .moveAdd': 'createNewMovePopup'
        },

        createNewMovePopup: function () {
            new SingleMoveAddView();
        }
    });
});