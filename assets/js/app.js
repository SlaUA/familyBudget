require.config({
    enforceDefine: true,
    paths: {
        jquery: 'static/jQuery',
        underscore: 'static/underscore',
        backbone: 'static/backbone',
        SingleMove: 'SingleMove',
        MultipleMoves: 'MultipleMoves',
        SingleMoveEdit: 'SingleMoveEdit'
    }
});

define(['jquery', 'underscore', 'backbone', 'SingleMove', 'MultipleMoves', 'SingleMoveEdit'],
    function (jQuery, _, Backbone, SingleMove, MultipleMoves, SingleMoveEdit) {

        jQuery(function () {
            new window.app.MultipleMovesCollectionView();
        });
    });


