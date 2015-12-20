define([
    'underscore',
    'backbone',
    'MainMovesView',
    'viewManager'
], function (_,
             Backbone,
             MainMovesView,
             viewManager) {

    return Backbone.Router.extend({

        routes: {
            'home': 'home',
            'savings': 'savings',
            '*notFound': 'notFound'
        },

        savings: function () {

            viewManager.trigger('disposeAllViews');
        },

        home: function () {

            viewManager.trigger('disposeAllViews');
            new MainMovesView();
        },

        notFound: function () {

            viewManager.trigger('disposeAllViews');
            this.navigate('home', {trigger: true});
        }
    });
});