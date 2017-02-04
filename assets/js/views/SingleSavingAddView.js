define([
    'jquery',
    'datepicker',
    'underscore',
    'backbone',
    'SingleSavingModel',
    'text!../templates/addNewSavingTemplate.html'
], function (jQuery,
             datepicker,
             _,
             Backbone,
             SingleSavingModel,
             addNewSavingTemplate) {

    return Backbone.View.extend({

        tagName  : 'div',
        className: 'editSavingView',
        $body    : jQuery('body'),

        template: _.template(addNewSavingTemplate),

        events: {
            'click .acceptChanges': 'addNewSaving',
            'click .rejectChanges': 'close'
        },

        initialize: function () {

            window.app.trigger('addNewView', this, true);
            this.subscribeForCustomEvents();
            this.render();
        },

        customEventsMap: {
            closePopup: 'close'
        },

        subscribeForCustomEvents: function () {

            for (var event in this.customEventsMap) {
                if (!(event in this.customEventsMap)) {
                    continue;
                }
                this.listenTo(this, event, this[this.customEventsMap[event]]);
            }
        },

        addNewSaving: function () {

            // change date from existing format (dd.mm.yyyy) to yyyy/mm/dd
            var dateSource = this.$el.find('.dateEdit').val().split('.');
            dateSource[0]  = dateSource.splice(2, 1, dateSource[0])[0];

            var newSaving = new SingleSavingModel({
                date    : new Date(dateSource.join('/')).getTime(),
                type    : this.$el.find('.typeEdit').val(),
                currency: this.$el.find('.currencyEdit').val(),
                sum     : parseInt(this.$el.find('.sumEdit').val(), 10) || 0,
                comment : this.$el.find('.editSavingComment').val()
            });

            window.app.multipleSavingsCollection.add(newSaving);

            newSaving.save();
            this.trigger('closePopup');
        },

        close: function () {

            this.$body.removeClass('overlay-enabled');
            this.unbind();
            this.remove();
        },


        render: function () {
	
	        var today = new Date();
            
            this.$el.html(this.template({
	            day: today.getDate() > 9 ? today.getDate() : '0' + today.getDate(),
	            month: (today.getMonth() + 1) > 9 ? (today.getMonth() + 1) : ('0' + (today.getMonth() + 1)),
	            year: today.getFullYear()
            }));
            this.$body.append(this.$el);
            this.$body.addClass('overlay-enabled');
            this.$el.find('.dateEdit').pickadate();
            return this;
        }
    });
});