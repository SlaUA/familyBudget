define(['jquery', 'underscore', 'backbone', 'SingleMoveView'], function ($, _, Backbone, SingleMoveView) {

    window.app = window.app || {};

    return Backbone.View.extend({

        el: '.movesTable',
        collection: null,
        dateFilterTemplate: _.template($('#dateFilter-template').html()),

        $movesBody: null,
        $incomeSum: null,
        $expenseSum: null,
        $totalSum: null,
        $monthFilter: null,
        $yearFilter: null,

        events: {
            'change': 'render'
        },

        initialize: function () {

            this.$movesBody = this.$el.find('.moves');

            this.$incomeSum = this.$el.find('.incomeSum');
            this.$expenseSum = this.$el.find('.expenseSum');
            this.$totalSum = this.$el.find('.totalSum');

            this.collection.bind('add', this.render, this);
            this.collection.bind('change', this.render, this);
            this.collection.bind('remove', this.render, this);
            this.collection.bind('reset', this.render, this);

            this.renderDateFilter();
            this.render();
        },

        renderDateFilter: function () {

            var date = new Date();

            this.$el.find('.dateFilter').html(
                this.dateFilterTemplate({
                    currentMonth: date.getMonth(),
                    currentYear: date.getFullYear()
                })
            );

            this.$monthFilter = this.$el.find('#monthFilter');
            this.$yearFilter = this.$el.find('#yearFilter');
        },

        render: function () {

            var totalExpenseSum = 0,
                totalIncomeSum = 0,
                monthSelected = parseInt(this.$monthFilter.val()),
                yearSelected = parseInt(this.$yearFilter.val()),
                filteredCollection = this.collection.filterByDate(monthSelected, yearSelected);

            this.$movesBody.empty();

            _.each(filteredCollection, function (moveModel) {

                if (moveModel.attributes.type === 'expense') {
                    totalExpenseSum += moveModel.attributes.sum;
                } else {
                    totalIncomeSum += moveModel.attributes.sum;
                }

                this.$movesBody.append(
                    new SingleMoveView({
                        model: moveModel
                    }).el);
            }, this);

            this.$incomeSum.text(totalIncomeSum);
            this.$expenseSum.text(totalExpenseSum);
            this.$totalSum.text(totalIncomeSum - totalExpenseSum);
        }
    });
});