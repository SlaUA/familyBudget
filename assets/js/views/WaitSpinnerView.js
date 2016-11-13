define([
    'jquery',
    'underscore',
    'backbone',
    'text!../templates/waitSpinnerTemplate.html'
], function (jQuery,
             _,
             Backbone,
             template) {

    return Backbone.View.extend({

        el      : 'body',
        $spinner: null,

        initialize: function () {

            this.$el.append(template);
            this.$spinner = this.$el.find('.spinnerWrapper');

            window.app.on('pageChangeStart', this.onPageChangeStart.bind(this));
            window.app.on('pageChangeEnd', this.onPageChangeEnd.bind(this));

            window.app.on('spinnerShow', this.onPageChangeStart.bind(this));
            window.app.on('spinnerHide', this.onPageChangeEnd.bind(this));
        },

        onPageChangeStart: function () {

            this.$el.addClass('spinner-overlay');
            this.$spinner.show();
        },

        onPageChangeEnd: function () {

            this.$el.removeClass('spinner-overlay');
            this.$spinner.hide();
        }
    });
});