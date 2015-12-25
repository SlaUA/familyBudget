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

        alert('DOM ready');
        alert('type of ViewsManager: ' + typeof ViewsManager);
        alert('type of MainAppRouter: ' + typeof MainAppRouter);
        try {
            window.app = {};
            alert('try in init, window.app: ' + window.app);
            new ViewsManager();
            new MainRouter();
            Backbone.history.start();
        } catch (e) {
            alert(e.message);
        }
    });
});