define(['jquery', 'underscore', 'backbone'], function (jQuery, _, Backbone) {

    $(function () {

        window.app = window.app || {};

        app.SingleMoveEditView = Backbone.View.extend({
            tagName: 'div',
            id: 'editMoveView',
            $body: jQuery('body'),

            template: _.template($('#moving-edit-template').html()),

            events: {
                'click .acceptMoveChanges': 'onUpdateChanges',
                'click .rejectMoveChanges': 'onRejectChanges'
            },

            onUpdateChanges: function () {
                console.log('changes approved!');
            },

            onRejectChanges: function () {

                this.unbind();
                this.remove();
                this.$body.removeClass('overlay-enabled');
            },

            initialize: function () {
                this.listenTo(this.model, 'change', this.render);
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
});

