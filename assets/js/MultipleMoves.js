define(['jquery', 'underscore', 'backbone', 'SingleMove'], function ($, _, Backbone) {

    $(function () {

        window.app = window.app || {};

        app.MultipleMovesCollection = Backbone.Collection.extend({
            model: app.SingleMoveModel
        });

        // TODO: add localStorage adapter
        app.multipleMovesCollection = new app.MultipleMovesCollection(
            JSON.parse(localStorage.getItem('appData'))
        );

        app.MultipleMovesCollectionView = Backbone.View.extend({

            el: $('#movingsWrapper'),

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