define(['ramda', 'jquery', 'underscore', 'backbone', 'highcharts', 'text!../templates/mainSavingsChartTemplate.html'],
    function (ramda, jQuery, _, Backbone, Highcharts, template) {
        return Backbone.View.extend({
            el: '#mainWrapper',
            template: _.template(template),
            $yearSelect: null,
            currentYear: null,
            collection: null,
            events: {
                'change #yearFilter': 'render',
                'change .allYearsEnabled': 'render'
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
                this.collection = window.app.multipleSavingsCollection;
                this.$yearSelect = this.$el.find('#yearFilter');
                this.render.call(this);
                window.app.trigger('addNewView', this);
            },

            /**
             * @returns {Array}, array of savings for the selected year
             */
            getSingleYearSeries: function () {
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

            groupModelsByYear: ramda.groupBy((model) => new Date(model.get('date')).getFullYear()),

            getFullSeries: function () {
                const groupedData = this.groupModelsByYear(this.collection.models);

                return Object.entries(groupedData)
                    .reduce(([incomeData, expenseData], [year, models]) => {
                        let incomes = 0;
                        let expenses = 0;

                        models.forEach((saving) => {
                            const type = saving.get('type');
                            const currency = saving.get('currency');

                            if (currency !== 'USD') {
                                return;
                            }

                            if (type === 'expense') {
                                expenses -= saving.attributes.sum;
                            } else {
                                incomes += saving.attributes.sum;
                            }
                        });

                        return [{
                            ...incomeData,
                            data: [...incomeData.data, incomes]
                        }, {
                            ...expenseData,
                            data: [...expenseData.data, expenses]
                        }];
                    }, [{
                        name: 'Доход',
                        data: []
                    }, {
                        name: 'Затраты',
                        data: []
                    }]);
            },

            getAllYearsCategories: function () {
                return Object.keys(
                    this.groupModelsByYear(this.collection.models)
                );
            },

            render: function () {
                const isAllYearsEnabled = this.$el.find('.allYearsEnabled').prop('checked');
                const yearSelectStuff = this.$yearSelect.closest('.dateFilter').find('.yearSelectWrapper, .yearSelectLabel');

                if (isAllYearsEnabled) {
                    yearSelectStuff.hide();
                } else {
                    yearSelectStuff.show();
                }

                this.$el
                    .find('#savingsChart')
                    .highcharts({
                        chart: {
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
                        title: {
                            text: 'Сбережения'
                        },
                        xAxis: {
                            categories: isAllYearsEnabled ? this.getAllYearsCategories.call(this) : [
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
                        yAxis: {
                            title: {
                                text: 'сумма'
                            }
                        },
                        series: isAllYearsEnabled ? this.getFullSeries.call(this) : this.getSingleYearSeries.call(this),
                    });

                window.app.trigger('pageChangeEnd');
            }
        });
    });
