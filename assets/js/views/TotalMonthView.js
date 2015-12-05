define(['jquery', 'underscore', 'backbone'], function ($, _, Backbone, SingleMoveEditView) {

    return Backbone.View.extend({

        el: '.total',
        $incomeSum: null,
        $expenseSum: null,
        $totalSum: null,

        collection: null,

        initialize: function () {

            this.$incomeSum = this.$el.find('.incomeSum');
            this.$expenseSum = this.$el.find('.expenseSum');
            this.$totalSum = this.$el.find('.totalSum');

            this.collection.bind('add', this.render, this);
            this.collection.bind('remove', this.render, this);
            this.collection.bind('reset', this.render, this);
            this.render();
        },

        render: function () {

            var totalExpenseSum = 0,
                totalIncomeSum = 0;

            this.collection.each(function (model) {
                if (model.attributes.type === 'expense') {
                    totalExpenseSum += model.attributes.sum;
                } else {
                    totalIncomeSum += model.attributes.sum;
                }
            });

            this.$incomeSum.text(totalIncomeSum);
            this.$expenseSum.text(totalExpenseSum);
            this.$totalSum.text(totalIncomeSum - totalExpenseSum);

            return this;
        }
    });
});