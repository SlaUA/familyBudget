define(['jquery', 'underscore', 'backbone', 'SingleMove'], function ($, _, Backbone) {

    $(function () {

        window.app = window.app || {};

        app.MultipleMovesCollection = Backbone.Collection.extend({
            model: app.SingleMoveModel
        });

        // TODO: add localStorage adapter

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

        app.multipleMovesCollection = new app.MultipleMovesCollection(
            JSON.parse(localStorage.getItem('appData'))
        );

        // -- END OF TODO -- //

        app.MultipleMovesCollectionView = Backbone.View.extend({

            el: $('#moves'),

            collection: app.multipleMovesCollection,

            initialize: function () {

                this.collection.bind('add', this.onMovingAdd, this);
                this.render();
            },

            onMovingAdd: function (newMovingModel) {

                var newMove = new app.SingleMoveView({
                    model: newMovingModel
                });
                this.$el.append(newMove.el);
            },

            render: function () {

                this.$el.empty();
                this.collection.each(function (moveModel) {
                    var singleMove = new app.SingleMoveView({
                        model: moveModel
                    });
                    this.$el.append(singleMove.el);
                }, this);
            }
        });
    });
});