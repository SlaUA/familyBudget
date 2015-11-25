define([], function () {

});

var MultipleMovesCollection = Backbone.Collection.extend({
    model: app.SingleMoveModel,
    localStorage: new Backbone.LocalStorage('movesCollection')
});