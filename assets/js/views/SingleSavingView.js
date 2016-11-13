define([
    'jquery',
    'underscore',
    'backbone',
    'SingleSavingEditView',
    'text!../templates/singleSavingTemplate.html'
], function ($,
             _,
             Backbone,
             SingleSavingEditView,
             singleSavingTemplate) {

    return Backbone.View.extend({

        tagName: 'div',
        className: 'savingRow',
        template: _.template(singleSavingTemplate),

        events: {
            'click .removeColumn': 'onMoveRemoveClick',
            'click .commentColumn': 'onCommentClick'
        },

        onMoveRemoveClick: function () {

            if (!confirm('Точно удалить?')) {
                return;
            }
            this.remove();
            this.unbind();
            this.model.destroy();
        },

        onCommentClick: function () {

            new SingleSavingEditView({
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

