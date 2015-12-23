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
        ViewsManager: 'middleware/ViewsManager'
    }
});

window.app = {};

define([
    'jquery',
    'underscore',
    'backbone',
    'ViewsManager',
    'MainAppRouter'
], function (jQuery,
             _,
             Backbone,
             ViewsManager,
             MainAppRouter) {

    jQuery(function () {

        new ViewsManager();
        new MainAppRouter();
        Backbone.history.start();
    });
});