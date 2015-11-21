require.config({
    enforceDefine: true,
    paths: {
        jquery: 'static/jQuery',
        underscore: 'static/underscore',
        backbone: 'static/backbone',
        glDatePicker: 'static/glDatePicker',
        SingleMove: 'SingleMove',
        MultipleMoves: 'MultipleMoves',
        SingleMoveEdit: 'SingleMoveEdit'
    }
});

define(['jquery', 'glDatePicker', 'underscore', 'backbone', 'SingleMove', 'MultipleMoves', 'SingleMoveEdit'], function (jQuery) {

    jQuery(function () {
        new window.app.MultipleMovesCollectionView();
    });

});


