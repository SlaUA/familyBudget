define([
    'underscore',
    'backbone'
], function (_,
             Backbone) {

    return function ViewManager() {

        return {
            viewsInitiated: [],

            init: function () {

                window.app = window.app = {} || {};
                window.app = _.extend(Backbone.Events, window.app);

                window.app.on('addNewView', this.addNewView.bind(this));
                window.app.on('disposeAllViews', this.disposeAllViews.bind(this));
                window.app.on('disposeOneView', this.disposeOneView.bind(this));
            },

            addNewView: function (view) {

                this.viewsInitiated.push(view);
            },

            // destroy all views on current route
            disposeAllViews: function () {

                var length = this.viewsInitiated.length;

                while (length) {

                    // same as this.$el.remove();
                    this.viewsInitiated[length - 1].$el &&
                    this.viewsInitiated[length - 1].$el.empty &&
                    this.viewsInitiated[length - 1].$el.empty() &&
                    this.viewsInitiated[length - 1].$el.off &&
                    this.viewsInitiated[length - 1].$el.off();

                    // unbind events that are
                    // set on this view
                    this.viewsInitiated[length - 1].off &&
                    this.viewsInitiated[length - 1].off();

                    // remove all models bindings
                    // made by this view
                    this.viewsInitiated[length - 1].model &&
                    this.viewsInitiated[length - 1].model.off &&
                    this.viewsInitiated[length - 1].model.off(null, null, this.viewsInitiated[length - 1]);

                    this.viewsInitiated.pop();

                    length--;
                }
            },

            disposeOneView: function (view) {

                var indexOfView = this.viewsInitiated.indexOf(view);
                this.viewsInitiated.splice(indexOfView, 1);
            }
        }.init();
    };
});