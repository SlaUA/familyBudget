define([
    'underscore',
    'backbone',
    'MainMovesView',
    'MainSavingsView'
], function (_,
             Backbone,
             MainMovesView,
             MainSavingsView) {

    return Backbone.Router.extend({

        routes: {
            'moves'    : 'moves',
            'savings'  : 'savings',
            '*notFound': 'notFound'
        },

        initialize: function () {

            Backbone.history.start();
        },

        savings: function () {

            window.app.trigger('disposeAllViews');
            new MainSavingsView();
        },

        moves: function () {

            window.app.trigger('disposeAllViews');
            new MainMovesView();
        },

        notFound: function () {

            window.app.trigger('disposeAllViews');
            this.navigate('moves', {trigger: true});
        }
    });
});