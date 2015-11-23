define(['jquery', 'underscore', 'backbone', 'SingleMoveAdd'], function (jQuery, _, Backbone, SingleMoveAdd) {

    $(function () {

        window.app = window.app || {};
        app.MainAppView = Backbone.View.extend({

            el: '#movesApp',
            $body: jQuery('body'),

            events: {
                'click .moveAdd': 'startAddNewMove'
            },

            startAddNewMove: function () {
                new app.SingleMoveAdd();
            }
        });
    });
});