define([
    'jquery',
    'underscore',
    'backbone',
    'highcharts',
    'text!../templates/mainMovesChartTemplate.html'
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

            if (!(window.app && window.app.multipleMovesCollection)) {
                return location.hash = '#moves';
            }

            this.$el.append(
                this.template({
                    currentYear: new Date().getFullYear()
                })
            );
            this.collection  = window.app.multipleMovesCollection;
            this.$yearSelect = this.$el.find('#yearFilter');
            this.render.call(this);
            window.app.trigger('addNewView', this);
        },

        /**
         * @returns {Array}, array of moves for the selected year
         */
        getMovesDataForTheYear: function () {

            var result          = [];
            var movesForTheYear = {
                'income' : [0,0,0,0,0,0,0,0,0,0,0,0],
                'expense': [0,0,0,0,0,0,0,0,0,0,0,0]
            };

            this.currentYear = parseInt(this.$yearSelect.val());

            this.collection.each(function (move) {

                var dateOfMove = new Date(move.attributes.date);

                if (dateOfMove.getFullYear() !== this.currentYear) {
                    return false;
                }

                movesForTheYear[move.attributes.type][dateOfMove.getMonth()] += move.attributes.sum;

            }.bind(this));

            for (var type in movesForTheYear) {

                if (!(movesForTheYear.hasOwnProperty(type))) {
                    continue;
                }

                result.push({
                    name: type === 'income' ? 'Доходы' : 'Расходы',
                    data: movesForTheYear[type]
                });
            }

            return result;
        },

        render: function () {

            var moves = this.getMovesDataForTheYear.call(this);

            this.$el.find('#movesChart')
                .highcharts({
                    chart : {
                        type: 'line'
                    },
                    title : {
                        text: 'Доходы и затраты'
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
                            text: 'гривны'
                        }
                    },
                    series: moves
                });

            window.app.trigger('pageChangeEnd');
        }
    });
});