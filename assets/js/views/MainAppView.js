define([
    'jquery',
    'underscore',
    'backbone',
    'SingleMoveAddView',
    'fastclick'
], function (jQuery, _, Backbone, SingleMoveAddView, fastclick) {

    return Backbone.View.extend({

        el: '#movesApp',
        $body: jQuery('body'),

        events: {
            'click .moveAdd': 'createNewMovePopup'
        },
        initialize: function () {

            // remove click lag on mobile devices
            fastclick.attach(document.body);
        },
        createNewMovePopup: function () {
            new SingleMoveAddView();
        }
    });
});