define([
    'jquery',
    'underscore',
    'backbone',
    'SingleSavingView'
], function ($,
             _,
             Backbone,
             SingleSavingView) {

    return Backbone.View.extend({

        el        : '.savingsWholeWrapper',
        collection: null,

        $savingsBody: null,
        $totalSumUAH: null,
        $totalSumUSD: null,
        $totalSumEUR: null,

        initialize: function () {

            this.$savingsBody = this.$el.find('.savings');
            this.$totalSumUAH = this.$el.find('.totalUAH');
            this.$totalSumUSD = this.$el.find('.totalUSD');
            this.$totalSumEUR = this.$el.find('.totalEUR');

            this.collection.bind('add', this.render, this);
            this.collection.bind('change', this.render, this);
            this.collection.bind('remove', this.render, this);
            this.collection.bind('reset', this.render, this);

            this.render();

            window.app.trigger('addNewView', this, true);
        },

        render: function () {

            var total = {
                UAH: 0,
                USD: 0,
                EUR: 0
            };

            this.$savingsBody.empty();

            this.collection.each(function (savingModel) {

                if (savingModel.attributes.type === 'expense') {
                    total[savingModel.attributes.currency] -= savingModel.attributes.sum;
                } else {
                    total[savingModel.attributes.currency] += savingModel.attributes.sum;
                }

                this.$savingsBody.append(
                    new SingleSavingView({
                        model: savingModel
                    }).el);
            }, this);

            this.$totalSumUAH.text(total.UAH);
            this.$totalSumUSD.text(total.USD);
            this.$totalSumEUR.text(total.EUR);
        }
    });
});