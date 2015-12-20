define([
    'underscore',
    'backbone'
], function (_,
             Backbone) {

    window.app = window.app || {};

    function ViewManager() {

        var _viewsInitiated = [];

        function init() {

            _.extend(this, Backbone.Events);
            this.on('addNewView', addNewView);
            this.on('disposeAllViews', disposeAllViews);
            this.on('disposeOneView', disposeOneView);
        }

        function addNewView(view) {

            _viewsInitiated.push(view);
        }

        // destroy all views on current route
        function disposeAllViews() {

            var length = _viewsInitiated.length;
            while (length) {

                // same as this.$el.remove();
                _viewsInitiated[length - 1].$el.empty &&
                _viewsInitiated[length - 1].$el.empty();

                // unbind events that are
                // set on this view
                _viewsInitiated[length - 1].off &&
                _viewsInitiated[length - 1].off();

                // remove all models bindings
                // made by this view
                _viewsInitiated[length - 1].model &&
                _viewsInitiated[length - 1].model.off &&
                _viewsInitiated[length - 1].model.off(null, null, _viewsInitiated[length - 1]);

                _viewsInitiated.splice(length - 1, 1);

                length--;
            }
        }

        function disposeOneView(view) {

            var indexOfView = _viewsInitiated.indexOf(view);
            _viewsInitiated.splice(indexOfView, 1);
        }

        if (!window.app.viewManager) {
            window.app.viewManager = this;
            init.call(this);
        }

        return window.app.viewManager;
    }

    return window.app.viewManager || new ViewManager();
});