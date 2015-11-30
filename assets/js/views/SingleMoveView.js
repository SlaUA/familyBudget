define(['jquery', 'underscore', 'backbone', 'SingleMoveEditView'], function ($, _, Backbone) {

    return Backbone.View.extend({

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

            new SingleMoveEditView({
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

