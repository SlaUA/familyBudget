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

        initialize: function () {

            this.currentYear = new Date().getFullYear();

            if (!(window.app && window.app.multipleMovesCollection)) {
                return location.hash = '#moves';
            }

            this.$el.append(
                this.template({
                    currentYear: this.currentYear
                })
            );
            this.collection  = window.app.multipleMovesCollection;
            this.$yearSelect = this.$el.find('#yearFilter');
            this.render.call(this);
            window.app.trigger('addNewView', this);
        },

        /**
         * @returns array {Array}, array of moves for the selected year
         */
        getMovesDataForTheYear: function () {

            var movesForTheYear = [
                {
                    _alias: 'income',
                    name  : 'Доходы',
                    data  : []
                },
                {
                    _alias: 'expense',
                    name  : 'Расходы',
                    data  : []
                }
            ];


            this.collection.each(function (move) {
                if (new Date(move.date).getFullYear() !== this.currentYear) {
                    return false;
                }
                //move.attributes.type
            });
        },

        render: function () {

            var moves = this.getMovesDataForTheYear.call(this);

            this.$el.find('#movesChart').highcharts({
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