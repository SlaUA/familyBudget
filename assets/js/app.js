require.config({
    enforceDefine: true,
    paths: {
        jquery: 'static/jQuery',
        underscore: 'static/underscore',
        backbone: 'static/backbone',
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
    'MainAppView',
    'MultipleMovesView'
], function (jQuery,
             MainAppView,
             MultipleMovesView) {

    jQuery(function () {

        window.app = window.app || {};

        new MainAppView();
        new MultipleMovesView();
    });
});