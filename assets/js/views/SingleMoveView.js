define([
    'jquery',
    'underscore',
    'backbone',
    'SingleMoveEditView',
    'text!../templates/singleMoveTemplate.html'
], function ($,
             _,
             Backbone,
             SingleMoveEditView,
             singleMoveTemplate) {

    return Backbone.View.extend({

        tagName: 'div',
        className: 'moveRow',
        template: _.template(singleMoveTemplate),

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

            window.app.trigger('addNewView', this, true);

            this.listenTo(this.model, 'change', this.render);
            this.render();
        },

        render: function () {

            this.$el
                .removeClass('incomeRow expenseRow')
                .html(this.template(this.model.toJSON()));

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

