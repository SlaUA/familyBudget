require.config({
		enforceDefine: true,
		baseUrl      : 'assets/js/',
		paths        : {
				jquery                   : 'static/jQuery',
				Dropbox                  : 'static/Dropbox',
				datepicker               : 'static/datepicker',
				configDatePicker         : 'static/configPicker',
				underscore               : 'static/underscore',
				backbone                 : 'static/backbone',
				text                     : 'static/text',
				backboneLocalStorage     : 'static/backboneLocalStorage',
				fastclick                : 'static/fastclick',
				highcharts               : 'static/highcharts',
				MainRouter               : 'routers/MainRouter',
				ViewsManager             : 'middleware/ViewsManager',
				MultipleMovesCollection  : 'collections/MultipleMovesCollection',
				SingleMoveModel          : 'models/SingleMoveModel',
				SingleMoveView           : 'views/SingleMoveView',
				MultipleMovesView        : 'views/MultipleMovesView',
				SingleMoveEditView       : 'views/SingleMoveEditView',
				SingleMoveAddView        : 'views/SingleMoveAddView',
				MainMovesView            : 'views/MainMovesView',
				MultipleSavingsCollection: 'collections/MultipleSavingsCollection',
				SingleSavingModel        : 'models/SingleSavingModel',
				MainSavingsView          : 'views/MainSavingsView',
				SingleSavingEditView     : 'views/SingleSavingEditView',
				SingleSavingAddView      : 'views/SingleSavingAddView',
				SingleSavingView         : 'views/SingleSavingView',
				MultipleSavingsView      : 'views/MultipleSavingsView',
				WaitSpinnerView          : 'views/WaitSpinnerView',
				MainMoveChartView        : 'views/MainMoveChartView',
				MainSavingsChartView     : 'views/MainSavingsChartView',
				MainSyncView             : 'views/MainSyncView'
		},
		shim         : {
				highcharts: {
						exports: 'Highcharts',
						deps   : ['jquery']
				}
		}
});

define([
		'jquery',
		'datepicker',
		'configDatePicker',
		'underscore',
		'backbone',
		'ViewsManager',
		'fastclick',
		'MainRouter'
], function (jQuery,
             datepicker,
             configDatePicker,
             _,
             Backbone,
             ViewsManager,
             fastclick,
             MainRouter) {

		configDatePicker();

		jQuery(function () {

				window.app = {};
				// remove click lag on mobile devices
				fastclick.attach(document.body);

				new ViewsManager();
				new MainRouter();
		});
});