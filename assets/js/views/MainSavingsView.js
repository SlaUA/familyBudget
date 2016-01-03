define([
    'jquery',
    'underscore',
    'backbone',
    'SingleSavingAddView',
    'MultipleSavingsCollection',
    'MultipleSavingsView',
    'text!../templates/mainSavingsTemplate.html'
], function (jQuery,
             _,
             Backbone,
             SingleSavingAddView,
             multipleSavingsCollection,
             MultipleSavingsView,
             mainMovesTemplate) {

    return Backbone.View.extend({

        el   : '#mainWrapper',
        $body: jQuery('body'),

        events: {
            'click .addNew': 'createNewSavingPopup'
        },

        initialize: function () {

            this.$body.removeAttr('class');
            this.$el.append(mainMovesTemplate);

            window.app.multipleSavingsCollection = new multipleSavingsCollection();
            window.app.multipleSavingsCollection.fetch()

                  .done(function () {

                      window.app.trigger('pageChangeEnd');
                      window.app.trigger('addNewView', this);

                      new MultipleSavingsView({
                          collection: app.multipleSavingsCollection
                      });
                  }.bind(this))

                  .fail(function () {

                      alert('Данные не загрузились, попробуйте позже');
                      location.reload();
                  });
        },

        createNewSavingPopup: function () {
            new SingleSavingAddView();
        }
    });
});