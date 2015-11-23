require.config({
    enforceDefine: true,
    paths: {
        jquery: 'static/jQuery',
        underscore: 'static/underscore',
        backbone: 'static/backbone',
        fastclick: 'static/fastclick',
        SingleMove: 'SingleMove',
        MultipleMoves: 'MultipleMoves',
        SingleMoveEdit: 'SingleMoveEdit',
        SingleMoveAdd: 'SingleMoveAdd',
        MainAppView: 'MainAppView'
    }
});

define(['jquery',
    'underscore',
    'backbone',
    'SingleMove',
    'MultipleMoves',
    'SingleMoveEdit',
    'SingleMoveAdd',
    'MainAppView',
    'fastclick'
], function (jQuery,
             _,
             Backbone,
             SingleMove,
             MultipleMoves,
             SingleMoveEdit,
             SingleMoveAdd,
             MainAppView,
             fastclick) {

    jQuery(function () {
        fastclick.attach(document.body);
        new window.app.MultipleMovesCollectionView();
        new window.app.MainAppView();
    });
});