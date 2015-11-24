define(['jquery', 'underscore', 'backbone', 'SingleMove'], function ($, _, Backbone) {

    $(function () {

        window.app = window.app || {};

        var MultipleMovesCollectionConstructor = Backbone.Collection.extend({
            model: app.SingleMoveModel,
            localStorage: new Backbone.LocalStorage('movesCollection')
        });

        app.multipleMovesCollection = new MultipleMovesCollectionConstructor();

        app.MultipleMovesCollectionView = Backbone.View.extend({

            el: $('.moves'),

            collection: app.multipleMovesCollection,

            initialize: function () {

                this.collection
                    .fetch({async: false})
                    .done(function () {

                    })
                    .fail(function () {

                    });
                this.collection.bind('add', this.onSingleMoveAdd, this);
                this.collection.bind('reset', this.render, this);
                this.render();
            },

            onSingleMoveAdd: function (newMovingModel) {

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