define(['jquery', 'underscore', 'backbone'], function (jQuery, _, Backbone) {

    $(function () {

        window.app = window.app || {};
        app.SingleMoveAdd = Backbone.View.extend({

            tagName: 'div',
            className: 'editMoveView',
            $body: jQuery('body'),

            template: _.template($('#addNewMove').html()),

            events: {
                'click .acceptMoveChanges': 'addNewMove',
                'click .rejectMoveChanges': 'closeMoveAdd'
            },

            customEventsMap: {
                closePopup: 'closeMoveAdd'
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
                dateSource[0] = dateSource.splice(2, 1, dateSource[0])[0];

                var newMove = new app.SingleMoveModel({
                    date: new Date(dateSource.join('/')).getTime(),
                    type: this.$el.find('.typeEdit').val(),
                    sum: parseInt(this.$el.find('.sumEdit').val(), 10) || 0,
                    comment: this.$el.find('.editMoveComment').val()
                });

                app.multipleMovesCollection.add(newMove);

                newMove.save();
                this.trigger('closePopup');
            },

            closeMoveAdd: function () {

                this.unbind();
                this.remove();
                this.$body.removeClass('overlay-enabled');
            },

            initialize: function () {

                this.subscribeForCustomEvents();
                this.render();
            },

            render: function () {

                this.$el.html(
                    this.template()
                );
                this.$body.append(this.$el);
                this.$body.addClass('overlay-enabled');
                return this;
            }
        });
    });
});