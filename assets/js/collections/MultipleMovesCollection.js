define(['jquery', 'underscore', 'backbone', 'backboneLocalStorage', 'SingleMoveModel'], function (jQuery, _, Backbone, backboneLocalStorage, SingleMoveModel) {

    return Backbone.Collection.extend({
        model: SingleMoveModel,
        localStorage: new Backbone.LocalStorage('movesCollection')
    });
});