require.config({
    enforceDefine: true,
    paths: {
        jquery: 'static/jQuery',
        underscore: 'static/underscore',
        backbone: 'static/backbone',
        fastclick: 'static/fastclick',
        SingleMove: 'SingleMove',
        MultipleMoves: 'MultipleMoves',
        SingleMoveEdit: 'SingleMoveEdit'
    }
});

define(['jquery', 'underscore', 'backbone', 'SingleMove', 'MultipleMoves', 'SingleMoveEdit', 'fastclick'],
    function (jQuery, _, Backbone, SingleMove, MultipleMoves, SingleMoveEdit, fastclick) {

        jQuery(function () {
            fastclick.attach(document.body);
            new window.app.MultipleMovesCollectionView();
        });
    });