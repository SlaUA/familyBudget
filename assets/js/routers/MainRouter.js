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

        initialize: function () {
            try {
                window.app = window.app || {};
            } catch (e) {
                alert(e.message)
            }
        },

        savings: function () {

            try {
                window.app.trigger('disposeAllViews');
            } catch (e) {
                alert(e.message);
            }
        },

        home: function () {

            try {
                window.app.trigger('disposeAllViews');
                new MainMovesView();
            } catch (e) {
                alert(e.message);
            }
        },

        notFound: function () {

            try {
                window.app.trigger('disposeAllViews');
                this.navigate('home', {trigger: true});
            } catch (e) {
                alert(e.message);
            }
        }
    });
});