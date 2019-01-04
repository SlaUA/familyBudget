define([
    'jquery',
    'underscore',
    'backbone',
    'highcharts',
    'text!../templates/mainSavingsChartTemplate.html'
], function (jQuery,
             _,
             Backbone,
             Highcharts,
             template) {

    return Backbone.View.extend({

        el         : '#mainWrapper',
        template   : _.template(template),
        $yearSelect: null,
        currentYear: null,

        collection: null,

        events: {
            'change #yearFilter': 'render'
        },

        initialize: function () {

            if (!(window.app && window.app.multipleSavingsCollection)) {
                return location.hash = '#savings';
            }

            this.$el.append(
                this.template({
                    currentYear: new Date().getFullYear()
                })
            );
            this.collection  = window.app.multipleSavingsCollection;
            this.$yearSelect = this.$el.find('#yearFilter');
            this.render.call(this);
            window.app.trigger('addNewView', this);
        },

        /**
         * @returns {Array}, array of savings for the selected year
         */
        getSeries: function () {
            var yearSavings = {
                expense: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                income: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            };

            this.currentYear = parseInt(this.$yearSelect.val());

            this.collection.each((saving) => {
                const dateOfSaving = new Date(saving.attributes.date);

                if (dateOfSaving.getFullYear() !== this.currentYear || saving.attributes.currency !== 'USD') {
                    return false;
                }

                if (saving.attributes.type === 'expense') {
                    yearSavings[saving.attributes.type][dateOfSaving.getMonth()] -= saving.attributes.sum;
                } else {
                    yearSavings[saving.attributes.type][dateOfSaving.getMonth()] += saving.attributes.sum;
                }
            });

            return [{
                name: 'Доход',
                data: yearSavings.income
            }, {
                name: 'Затраты',
                data: yearSavings.expense
            }];
        },

        render: function () {
            this.$el.find('#savingsChart')
                .highcharts({
                    chart : {
                        type: 'spline'
                    },
                    plotOptions: {
                        spline: {
                            marker: {
                                enabled: true
                            },
                            dataLabels: {
                                enabled: true
                            },
                            enableMouseTracking: false
                        }
                    },
                    title : {
                        text: 'Сбережения'
                    },
                    xAxis : {
                        categories: [
                            'Январь',
                            'Февраль',
                            'Март',
                            'Апрель',
                            'Май',
                            'Июнь',
                            'Июль',
                            'Август',
                            'Сентябрь',
                            'Октябрь',
                            'Ноябрь',
                            'Декабрь'
                        ]
                    },
                    yAxis : {
                        title: {
                            text: 'сумма'
                        }
                    },
                    series: this.getSeries.call(this)
                });

            window.app.trigger('pageChangeEnd');
        }
    });
});
