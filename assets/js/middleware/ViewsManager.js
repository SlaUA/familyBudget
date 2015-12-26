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

                Backbone.View.prototype.close = this.closeView;

                window.app = _.extend(Backbone.Events, window.app);

                window.app.on('addNewView', this.addNewView.bind(this));
                window.app.on('disposeAllViews', this.disposeAllViews.bind(this));
                window.app.on('disposeOneView', this.disposeOneView.bind(this));
            },

            addNewView: function (view, removeWrapper) {

                view.removeWrapper = Boolean(removeWrapper);
                this.viewsInitiated.push(view);
            },

            // destroy all views on current route
            disposeAllViews: function () {

                var length = this.viewsInitiated.length;

                while (length) {

                    this.viewsInitiated[length - 1].close();
                    this.viewsInitiated.pop();
                    length--;
                }
            },

            disposeOneView: function (view) {

                var indexOfView = this.viewsInitiated.indexOf(view);
                this.viewsInitiated.splice(indexOfView, 1);
            },

            closeView: function () {

                //this - > have to be closed view

                // unbind events that are
                // set on this view
                this.off &&
                this.off();

                // remove all models bindings
                // made by this view
                this.model &&
                this.model.off &&
                this.model.off(null, null, this);

                this.$el &&
                this.$el.empty &&
                this.$el.empty() &&
                this.$el.off &&
                this.$el.off();

                if (this.removeWrapper) {
                    this.remove();
                }
            }
        }.init();
    };
});