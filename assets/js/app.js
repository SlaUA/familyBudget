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
        viewManager: 'middleware/viewManager'
    }
});

define([
    'jquery',
    'underscore',
    'backbone',
    'MainAppRouter'
], function (jQuery,
             _,
             Backbone,
             MainAppRouter) {



    jQuery(function () {

        window.app = window.app || {};

        new MainAppRouter();
        Backbone.history.start();
    });
});