define([
		'jquery',
		'underscore',
		'backbone',
		'Dropbox',
		'text!../templates/mainSyncTemplate.html'
], function (jQuery,
             _,
             Backbone,
             Dropbox,
             mainSyncTemplate) {

		return Backbone.View.extend({

				el             : '#mainWrapper',
				oAuthToken     : localStorage.getItem('oauth'),
				CLIENT_ID      : 'kwtn9lz5ronhbk1',
				APP_CONFIG_PATH: '/savingsAppSettings.json',
				ROOT_PATH      : '',
				dbxClient      : null,

				$syncDate: null,

				events: {
						'click .saveInfo': 'saveDataToServer'
				},

				initialize: function () {

						var target           = "_self",
						    options          = "location=yes,hidden=no",
						    oAuthUrl,
						    inAppBrowser,
						    APP_REDIRECT_URL = 'localhost://savingsApp';

						this.$el.append(mainSyncTemplate);
						this.$syncDate = this.$el.find('.syncDate');

						if (this.oAuthToken) {
								this.dbxClient = new Dropbox({accessToken: this.oAuthToken});
								this.render();
						} else {
								this.dbxClient = new Dropbox({clientId: this.CLIENT_ID});
								oAuthUrl       = this.dbxClient.getAuthenticationUrl(APP_REDIRECT_URL);
								
								document.addEventListener('deviceready', function () {

										inAppBrowser = cordova.InAppBrowser.open(oAuthUrl, target, options);
										inAppBrowser.addEventListener('loadstart', function (data) {

												if (!~data.url.indexOf('#access_token')) {
														return;
												}
												this.oAuthToken = (/access_token=(.*?)\&/g.exec(data.url) || [, ''])[1];
												localStorage.setItem('oauth', this.oAuthToken);
												location.reload();
										}.bind(this));
								}, false);
						}
				},

				render: function () {

						this.dbxClient.filesGetMetadata({path: this.APP_CONFIG_PATH})
						    .then(function (response) {

								    this.updateLastChange(response.server_modified);
								    window.app.trigger('pageChangeEnd');
						    }.bind(this))
						    .catch(function () {
								    window.app.trigger('pageChangeEnd');
						    });

						window.app.trigger('addNewView', this);
				},

				saveDataToServer: function () {

						var appSettings = [],
						    setting;

						Object.keys(localStorage).forEach(function (key) {

								if (!(~key.indexOf('Collection'))) {
										return;
								}
								setting      = {};
								setting[key] = localStorage.getItem(key);
								appSettings.push(setting);
						});

						this.dbxClient.filesUpload({
								    path    : this.APP_CONFIG_PATH,
								    contents: JSON.stringify(appSettings),
								    mode    : 'overwrite'
						    })
						    .then(function (response) {

								    this.updateLastChange(response.server_modified);
								    alert('Сохранено!');
						    }.bind(this))
						    .catch(function (error) {

								    alert(error.message);
						    });
				},

				updateLastChange: function (lastTimeModify) {

						var date = new Date(lastTimeModify);
						this.$syncDate.text(
							date.getDate() +
							'.' +
							(date.getMonth() + 1) +
							'.' +
							date.getFullYear() +
							', в ' +
							date.getHours() +
							':' +
							date.getMinutes() +
							':' +
							date.getSeconds()
						);
				}
		});
});