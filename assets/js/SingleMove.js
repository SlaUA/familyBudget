define(['jquery', 'underscore', 'backbone', 'backbone.touch'], function ($, _, Backbone) {

    $(function () {

        window.app = window.app || {};

        app.SingleMoveModel = Backbone.Model.extend({
            defaults: {
                date: Date.now(),
                type: 'income',
                sum: 0,
                comment: ''
            }
        });

        app.SingleMoveView = Backbone.View.extend({
            tagName: 'div',
            template: _.template($('#moving-template').html()),

            events: {
                'tap .removeColumn': 'onMoveRemoveClick',
                'doubletap .commentColumn': 'onCommentClick'
            },

            onMoveRemoveClick: function () {

                this.remove();
                this.unbind();
                this.model.collection.remove(this.model);
            },

            onCommentClick: function () {
                alert();
            },

            initialize: function () {
                this.listenTo(this.model, 'change', this.render);
                this.render();
            },

            render: function () {

                this.$el.html(
                    this.template(this.model.toJSON())
                );

                if (this.model.get('type') === 'income') {
                    this.$el.addClass('moveRow incomeRow');
                } else {
                    this.$el.addClass('moveRow expenseRow');
                }

                return this;
            }
        });
    });
});

