define(['jquery', 'underscore', 'backbone'], function (jQuery, _, Backbone) {

    var MultipleMovesCollection = Backbone.Collection.extend({
        model: app.SingleMoveModel,
        localStorage: new Backbone.LocalStorage('movesCollection')
    });
    return MultipleMovesCollection;
});