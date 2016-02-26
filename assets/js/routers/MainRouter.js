define([
    'underscore',
    'backbone',
    'MainMovesView',
    'MainSavingsView',
    'WaitSpinnerView',
    'MainMoveChartView'
], function (_,
             Backbone,
             MainMovesView,
             MainSavingsView,
             WaitSpinnerView,
             MainMoveChartView) {

    return Backbone.Router.extend({

        routes: {
            'moves'         : 'moves',
            'savings'       : 'savings',
            'monthMovesInfo': 'monthMovesInfo',
            '*notFound'     : 'notFound'
        },

        initialize: function () {

            new WaitSpinnerView();
            Backbone.history.start();
        },

        beforePageChange: function () {

            window.app.trigger('disposeAllViews');
            window.app.trigger('pageChangeStart');
        },

        savings: function () {

            new MainSavingsView();
        },

        moves: function () {

            new MainMovesView();
        },

        monthMovesInfo: function () {

            new MainMoveChartView();
        },

        notFound: function () {

            this.navigate('moves', {trigger: true});
        }
    });
});