define([
    'jquery',
    'underscore',
    'backbone',
    'text!../templates/savingEditTemplate.html'
], function (jQuery,
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
            window.app.inLockedState = true;
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

            window.app.inLockedState = false;
            this.unbind();
            this.remove();
            this.$body.removeClass('overlay-enabled');
        },


        render: function () {

            this.$el.html(
                this.template(this.model.toJSON())
            );
            this.$body.append(this.$el);
            this.$body.addClass('overlay-enabled');

            return this;
        }
    });
});