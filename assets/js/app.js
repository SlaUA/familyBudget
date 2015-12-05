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
        TotalMonthView: 'views/TotalMonthView',
        MainAppView: 'views/MainAppView'
    }
});

define([
    'jquery',
    'MainAppView'
], function (jQuery,
             MainAppView) {

    jQuery(function () {

        window.app = window.app || {};
        new MainAppView();
    });
});