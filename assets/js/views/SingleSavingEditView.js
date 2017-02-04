define([
    'jquery',
    'datepicker',
    'underscore',
    'backbone',
    'text!../templates/savingEditTemplate.html'
], function (jQuery,
             datepicker,
             _,
             Backbone,
             savingEditTemplate) {

    return Backbone.View.extend({

        tagName  : 'div',
        className: 'editSavingView',
        $body    : jQuery('body'),

        template: _.template(savingEditTemplate),

        events: {
            'click .acceptChanges': 'onUpdateChanges',
            'click .rejectChanges': 'close'
        },

        customEventsMap: {
            closePopup: 'close'
        },

        initialize: function () {

            window.app.trigger('addNewView', this, true);
            this.listenTo(this.model, 'change', this.render);
            this.subscribeForCustomEvents();
            this.render();
        },

        subscribeForCustomEvents: function () {

            for (var event in this.customEventsMap) {
                if (!(event in this.customEventsMap)) {
                    continue;
                }
                this.listenTo(this, event, this[this.customEventsMap[event]]);
            }
        },

        onUpdateChanges: function () {

            // change date from existing format (dd.mm.yyyy) to yyyy/mm/dd
            var dateSource = this.$el.find('.dateEdit').val().split('.');
            dateSource[0]  = dateSource.splice(2, 1, dateSource[0])[0];

            this.model.set({
                date    : new Date(dateSource.join('/')).getTime(),
                type    : this.$el.find('.typeEdit').val(),
                currency: this.$el.find('.currencyEdit').val(),
                sum     : parseInt(this.$el.find('.sumEdit').val(), 10),
                comment : this.$el.find('.editSavingComment').val()
            });

            this.model.save();

            this.trigger('closePopup');
        },

        close: function () {

            this.$body.removeClass('overlay-enabled');
            this.unbind();
            this.remove();
        },


        render: function () {
	
	        var model = this.model.toJSON(),
		        date = new Date(model.date),
		        dateConfig = {
			        day: date.getDate() > 9 ? date.getDate() : '0' + date.getDate(),
			        month: (date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1)),
			        year: date.getFullYear()
		        };

            this.$el.html(
                this.template(jQuery.extend({}, model, dateConfig))
            );
            this.$body.append(this.$el);
            this.$body.addClass('overlay-enabled');
            this.$el.find('.dateEdit').pickadate();

            return this;
        }
    });
});