define([
    'jquery',
    'underscore',
    'backbone',
    'SingleMoveAddView',
    'MultipleMovesCollection',
    'MultipleMovesView',
    'fastclick',
    'text!../templates/mainMovesTemplate.html'
], function (jQuery,
             _,
             Backbone,
             SingleMoveAddView,
             MultipleMovesCollection,
             MultipleMovesView,
             fastclick,
             mainMovesTemplate) {

    return Backbone.View.extend({

        el   : '#mainWrapper',
        $body: jQuery('body'),

        events: {
            'click .addNew': 'createNewMovePopup'
        },

        initialize: function () {

            this.$el.append(mainMovesTemplate);

            // remove click lag on mobile devices
            fastclick.attach(document.body);

            window.app.multipleMovesCollection = new MultipleMovesCollection();
            window.app.multipleMovesCollection.fetch()

                  .done(function () {

                      window.app.trigger('pageChangeEnd');
                      window.app.trigger('addNewView', this);

                      new MultipleMovesView({
                          collection: app.multipleMovesCollection
                      });
                  }.bind(this))

                  .fail(function () {

                      alert('Данные не загрузились, попробуйте позже');
                  })
        },

        createNewMovePopup: function () {
            new SingleMoveAddView();
        }
    });
});