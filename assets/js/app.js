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
        MainRouter: 'routers/MainRouter',
        ViewsManager: 'middleware/ViewsManager'
    }
});

define([
    'jquery',
    'underscore',
    'backbone',
    'ViewsManager',
    'MainRouter'
], function (jQuery,
             _,
             Backbone,
             ViewsManager,
             MainRouter) {

    jQuery(function () {

            window.app = {};

            new ViewsManager();
            new MainRouter();
    });
});