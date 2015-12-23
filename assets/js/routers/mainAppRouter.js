define([
    'underscore',
    'backbone',
    'MainMovesView'
], function (_,
             Backbone,
             MainMovesView) {

    return Backbone.Router.extend({

        routes: {
            'home': 'home',
            'savings': 'savings',
            '*notFound': 'notFound'
        },

        savings: function () {

            window.app.trigger('disposeAllViews');
        },

        home: function () {

            window.app.trigger('disposeAllViews');
            new MainMovesView();
        },

        notFound: function () {

            window.app.trigger('disposeAllViews');
            this.navigate('home', {trigger: true});
        }
    });
});