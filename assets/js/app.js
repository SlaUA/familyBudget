require.config({
    enforceDefine: true,
    paths: {
        jquery: 'static/jQuery',
        underscore: 'static/underscore',
        backbone: 'static/backbone',
        backboneLocalStorage: 'static/backboneLocalStorage',
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
    'backboneLocalStorage',
    'SingleMove',
    'MultipleMoves',
    'SingleMoveEdit',
    'SingleMoveAdd',
    'MainAppView',
    'fastclick'
], function (jQuery,
             _,
             Backbone,
             backboneLocalStorage,
             SingleMove,
             MultipleMoves,
             SingleMoveEdit,
             SingleMoveAdd,
             MainAppView,
             fastclick) {

    jQuery(function () {

        // remove click lag on mobile devices
        fastclick.attach(document.body);

        new window.app.MainAppView();
        new window.app.MultipleMovesCollectionView();
    });
});