require.config({
    enforceDefine: true,
    baseUrl      : 'assets/js',
    paths        : {
        jquery                   : 'static/jQuery',
        underscore               : 'static/underscore',
        backbone                 : 'static/backbone',
        text                     : 'static/text',
        backboneLocalStorage     : 'static/backboneLocalStorage',
        fastclick                : 'static/fastclick',
        MainRouter               : 'routers/MainRouter',
        ViewsManager             : 'middleware/ViewsManager',
        MultipleMovesCollection  : 'collections/MultipleMovesCollection',
        SingleMoveModel          : 'models/SingleMoveModel',
        SingleMoveView           : 'views/SingleMoveView',
        MultipleMovesView        : 'views/MultipleMovesView',
        SingleMoveEditView       : 'views/SingleMoveEditView',
        SingleMoveAddView        : 'views/SingleMoveAddView',
        MainMovesView            : 'views/MainMovesView',
        MultipleSavingsCollection: 'collections/MultipleSavingsCollection',
        SingleSavingModel        : 'models/SingleSavingModel',
        MainSavingsView          : 'views/MainSavingsView',
        SingleSavingEditView     : 'views/SingleSavingEditView',
        SingleSavingAddView      : 'views/SingleSavingAddView',
        SingleSavingView         : 'views/SingleSavingView',
        MultipleSavingsView      : 'views/MultipleSavingsView'
    }
});

define([
    'jquery',
    'underscore',
    'backbone',
    'ViewsManager',
    'fastclick',
    'MainRouter'
], function (jQuery,
             _,
             Backbone,
             ViewsManager,
             fastclick,
             MainRouter) {

    jQuery(function () {

        window.app = {};
        // remove click lag on mobile devices
        fastclick.attach(document.body);

        new ViewsManager();
        new MainRouter();
    });
});