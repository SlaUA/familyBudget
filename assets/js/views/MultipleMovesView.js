define([
    'jquery',
    'underscore',
    'backbone',
    'SingleMoveView',
    'text!../templates/dateFilterTemplate.html'
], function ($,
             _,
             Backbone,
             SingleMoveView,
             dateFilterTemplate) {

    return Backbone.View.extend({

        el: '.movesWholeWrapper',
        collection: null,
        dateFilterTemplate: _.template(dateFilterTemplate),

        $movesBody  : null,
        $totalSumUAH: null,
        $totalSumUSD: null,
        $totalSum   : null,
        $monthFilter: null,
        $yearFilter : null,

        events: {
            'change': 'render'
        },

        initialize: function () {

            this.$movesBody   = this.$el.find('.moves');
            this.$totalSumUAH = this.$el.find('.incomeSum');
            this.$totalSumUSD = this.$el.find('.expenseSum');
            this.$totalSum    = this.$el.find('.totalSum');

            this.collection.bind('add', this.render, this);
            this.collection.bind('change', this.render, this);
            this.collection.bind('remove', this.render, this);
            this.collection.bind('reset', this.render, this);

            this.renderDateFilter();
            this.render();

            window.app.trigger('addNewView', this, true);
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
            this.$yearFilter  = this.$el.find('#yearFilter');
        },

        render: function () {

            var totalExpenseSum    = 0,
                totalIncomeSum     = 0,
                monthSelected      = parseInt(this.$monthFilter.val()),
                yearSelected       = parseInt(this.$yearFilter.val()),
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

            this.$totalSumUAH.text(totalIncomeSum);
            this.$totalSumUSD.text(totalExpenseSum);
            this.$totalSum.text(totalIncomeSum - totalExpenseSum);
        }
    });
});