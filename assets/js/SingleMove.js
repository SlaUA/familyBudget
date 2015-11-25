define(['jquery', 'underscore', 'backbone', 'SingleMoveEdit'], function ($, _, Backbone) {

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
        className: 'moveRow',
        template: _.template($('#moving-template').html()),

        events: {
            'click .removeColumn': 'onMoveRemoveClick',
            'click .commentColumn': 'onCommentClick'
        },

        onMoveRemoveClick: function () {

            this.remove();
            this.unbind();
            this.model.destroy();
        },

        onCommentClick: function () {

            new app.SingleMoveEditView({
                model: this.model
            });
        },

        initialize: function () {
            this.listenTo(this.model, 'change', this.render);
            this.render();
        },

        render: function () {

            this.$el
                .removeClass('incomeRow expenseRow')
                .html(
                    this.template(this.model.toJSON())
                );

            this.$el.addClass(
                this.model.get('type') === 'income' ?
                    'incomeRow'
                    :
                    'expenseRow'
            );
            return this;
        }
    });
});

