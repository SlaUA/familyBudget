define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/moveEditTemplate.html'
], function (jQuery,
             _,
             Backbone,
             moveEditTemplate) {

    return Backbone.View.extend({

        tagName: 'div',
        className: 'editMoveView',
        $body: jQuery('body'),

        template: _.template(moveEditTemplate),

        events: {
            'click .acceptMoveChanges': 'onUpdateChanges',
            'click .rejectMoveChanges': 'closeMoveEdit'
        },

        customEventsMap: {
            closePopup: 'closeMoveEdit'
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
            dateSource[0] = dateSource.splice(2, 1, dateSource[0])[0];

            this.model.set({
                date: new Date(dateSource.join('/')).getTime(),
                type: this.$el.find('.typeEdit').val(),
                sum: parseInt(this.$el.find('.sumEdit').val(), 10),
                comment: this.$el.find('.editMoveComment').val()
            });

            this.model.save();

            this.trigger('closePopup');
        },

        closeMoveEdit: function () {

            this.unbind();
            this.remove();
            this.$body.removeClass('overlay-enabled');
        },

        initialize: function () {

            this.listenTo(this.model, 'change', this.render);
            this.subscribeForCustomEvents();
            this.render();
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