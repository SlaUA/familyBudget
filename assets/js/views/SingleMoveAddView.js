define([
    'jquery',
    'underscore',
    'backbone',
    'SingleMoveModel',
    'text!../templates/addNewMoveTemplate.html'
], function (jQuery,
             _,
             Backbone,
             SingleMoveModel,
             addNewMoveTemplate) {

    return Backbone.View.extend({

        tagName  : 'div',
        className: 'editMoveView',
        $body    : jQuery('body'),

        template: _.template(addNewMoveTemplate),

        events: {
            'click .acceptChanges': 'addNewMove',
            'click .rejectChanges': 'close'
        },

        initialize: function () {

            window.app.trigger('addNewView', this, true);

            window.app.inLockedState = true;
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

        addNewMove: function () {

            // change date from existing format (dd.mm.yyyy) to yyyy/mm/dd
            var dateSource = this.$el.find('.dateEdit').val().split('.');
            dateSource[0]  = dateSource.splice(2, 1, dateSource[0])[0];

            var newMove = new SingleMoveModel({
                date   : new Date(dateSource.join('/')).getTime(),
                type   : this.$el.find('.typeEdit').val(),
                sum    : parseInt(this.$el.find('.sumEdit').val(), 10) || 0,
                comment: this.$el.find('.editMoveComment').val()
            });

            window.app.multipleMovesCollection.add(newMove);

            newMove.save();
            this.trigger('closePopup');
        },

        close: function () {

            window.app.inLockedState = false;
            this.unbind();
            this.remove();
            this.$body.removeClass('overlay-enabled');
        },

        render: function () {

            this.$el.html(this.template());
            this.$body.append(this.$el);
            this.$body.addClass('overlay-enabled');
            return this;
        }
    });
});