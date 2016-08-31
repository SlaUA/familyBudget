define([
    'underscore',
    'backbone',
    'MainMovesView',
    'MainSavingsView',
    'WaitSpinnerView',
    'MainMoveChartView',
    'MainSavingsChartView'
], function (_,
             Backbone,
             MainMovesView,
             MainSavingsView,
             WaitSpinnerView,
             MainMoveChartView,
             MainSavingsChartView) {

    return Backbone.Router.extend({

        routes: {
            'moves'           : 'moves',
            'savings'         : 'savings',
            'monthMovesInfo'  : 'monthMovesInfo',
            'monthSavingsInfo': 'monthSavingsInfo',
            '*notFound'       : 'notFound'
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

        monthSavingsInfo: function () {

            new MainSavingsChartView();
        },

        notFound: function () {

            this.navigate('moves', {trigger: true});
        }
    });
});