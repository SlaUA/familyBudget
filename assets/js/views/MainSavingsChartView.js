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
        getSavingsDataForTheYear: function () {

            var result            = [];
            var savingsForTheYear = {
                USD: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            };

            this.currentYear = parseInt(this.$yearSelect.val());

            this.collection.each(function (saving) {

                var dateOfSaving = new Date(saving.attributes.date);

                if (dateOfSaving.getFullYear() !== this.currentYear || saving.attributes.currency !== 'USD') {
                    return false;
                }

                if (saving.attributes.type === 'expense') {
                    savingsForTheYear[saving.attributes.currency][dateOfSaving.getMonth()] -= saving.attributes.sum;
                } else {
                    savingsForTheYear[saving.attributes.currency][dateOfSaving.getMonth()] += saving.attributes.sum;
                }

            }.bind(this));

            for (var type in savingsForTheYear) {

                if (!savingsForTheYear.hasOwnProperty(type)) {
                    continue;
                }

                result.push({
                    name: type,
                    data: savingsForTheYear[type]
                });
            }

            return result;
        },

        render: function () {

            var savings = this.getSavingsDataForTheYear.call(this);

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
                    series: savings
                });

            window.app.trigger('pageChangeEnd');
        }
    });
});