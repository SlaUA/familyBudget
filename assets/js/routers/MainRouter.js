define([
    'underscore',
    'backbone',
    'MainMovesView',
    'MainSavingsView',
    'WaitSpinnerView'
], function (_,
             Backbone,
             MainMovesView,
             MainSavingsView,
             WaitSpinnerView) {

    return Backbone.Router.extend({

        routes: {
            'moves'    : 'moves',
            'savings'  : 'savings',
            '*notFound': 'notFound'
        },

        initialize: function () {

            new WaitSpinnerView();
            Backbone.history.start();
        },

        beforePageChange: function () {

            if (!window.app.inLockedState) {
                window.app.trigger('disposeAllViews');
                window.app.trigger('pageChangeStart');
            }
        },

        savings: function () {

            new MainSavingsView();
        },

        moves: function () {

            new MainMovesView();
        },

        notFound: function () {

            this.navigate('moves', {trigger: true});
        }
    });
});