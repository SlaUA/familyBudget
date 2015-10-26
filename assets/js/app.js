require.config({
    enforceDefine: true,
    paths: {
        jquery: 'static/jQuery',
        underscore: 'static/underscore',
        backbone: 'static/backbone',
        SingleMove: 'SingleMove',
        MultipleMoves: 'MultipleMoves'
    }
});

define(['jquery', 'underscore', 'backbone', 'SingleMove', 'MultipleMoves'], function () {

    jQuery(function () {

        //TODO: adapter

        localStorage.setItem('appData',
            JSON.stringify(
                [{
                    date: Date.now(),
                    type: 'income',
                    sum: 40000,
                    comment: 'Зарплата'
                }, {
                    date: new Date(2015, 9, 15).getTime(),
                    type: 'expense',
                    sum: 10000,
                    comment: 'Приватбанк, credit card'
                }, {
                    date: new Date(2015, 9, 15).getTime(),
                    type: 'expense',
                    sum: 10000,
                    comment: 'Приватбанк, credit card'
                }]
            ));
        new window.app.MultipleMovesCollectionView();
    });

});


