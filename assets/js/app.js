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
        MainAppView: 'views/MainAppView'
    }
});

define([
    'jquery',
    'MainAppView'
], function (jQuery,
             MainAppView) {

    window.app = {};

    jQuery(function () {

        new MainAppView();
    });
});