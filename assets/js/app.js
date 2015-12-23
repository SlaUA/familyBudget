require.config({
    enforceDefine: true,
    baseUrl: 'assets/js',
    paths: {
        jquery: 'static/jQuery',
        underscore: 'static/underscore',
        backbone: 'static/backbone',
        text: 'static/text',
        backboneLocalStorage: 'static/backboneLocalStorage',
        fastclick: 'static/fastclick',
        SingleMoveModel: 'models/SingleMoveModel',
        SingleMoveView: 'views/SingleMoveView',
        MultipleMovesCollection: 'collections/MultipleMovesCollection',
        MultipleMovesView: 'views/MultipleMovesView',
        SingleMoveEditView: 'views/SingleMoveEditView',
        SingleMoveAddView: 'views/SingleMoveAddView',
        MainMovesView: 'views/MainMovesView',
        MainAppRouter: 'routers/MainAppRouter',
        ViewManager: 'middleware/ViewManager'
    }
});

window.app = {};

define([
    'jquery',
    'underscore',
    'backbone',
    'ViewManager',
    'MainAppRouter'
], function (jQuery,
             _,
             Backbone,
             ViewManager,
             MainAppRouter) {

    jQuery(function () {

        new ViewManager();
        new MainAppRouter();
        Backbone.history.start();
    });
});