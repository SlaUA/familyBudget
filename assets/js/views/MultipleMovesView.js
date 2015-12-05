define(['jquery', 'underscore', 'backbone', 'SingleMoveView', 'MultipleMovesCollection'], function ($, _, Backbone, SingleMoveView, MultipleMovesCollection) {

    window.app = window.app || {};

    return Backbone.View.extend({

        el: '.moves',

        collection: null,

        initialize: function () {

            this.collection.bind('add', this.onSingleMoveAdd, this);
            this.collection.bind('reset', this.render, this);
            this.render();
        },

        onSingleMoveAdd: function (newMovingModel) {

            var newMove = new SingleMoveView({
                model: newMovingModel
            });
            this.$el.append(newMove.el);
        },

        render: function () {

            this.$el.empty();
            this.collection.each(function (moveModel) {
                var singleMove = new SingleMoveView({
                    model: moveModel
                });
                this.$el.append(singleMove.el);
            }, this);
        }
    });
});