define(['jquery', 'glDatePicker', 'underscore', 'backbone'], function ($, glDatePicker, _, Backbone) {

    $(function () {

        window.app = window.app || {};

        app.SingleMoveEditView = Backbone.View.extend({
            el: '#editMoveView',
            template: _.template($('#moving-edit-template').html()),

            events: {
                'click .acceptMoveChanges': 'onUpdateChanges',
                'click .rejectMoveChanges': 'onRejectChanges'
            },

            onUpdateChanges: function () {
                console.log('changes approved!');
            },

            onRejectChanges: function () {

                this.$el.closest('body').removeClass('overlay-enabled');
                this.$el
                    .empty()
                    .hide();
                this.unbind();
            },

            initialize: function () {
                this.listenTo(this.model, 'change', this.render);
                this.render();
            },

            render: function () {

                this.$el.html(
                    this.template(this.model.toJSON())
                );
                this.$el.find('[data-type="date"]').glDatePicker({
                    selectedDate: new Date(this.model.attributes.date)
                });
                this.$el.show();
                this.$el.closest('body').addClass('overlay-enabled');
                return this;
            }
        });
    });
});

